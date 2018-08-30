//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';

import {ContextMenu, DataTable} from "primeng/primeng";

import {AppEvent}           from "@hpe/angular-toolkit/model";
import {CellStyle}          from "@hpe/angular-toolkit/model";
import {DropdownItem}       from "@hpe/angular-toolkit/model";
import {Menu}               from "@hpe/angular-toolkit/model";
import {ListTableColumn}    from "@hpe/angular-toolkit/model";
import {MenuSelector}       from "@hpe/angular-toolkit/model";
import {FilterChangeEvent}  from "@hpe/angular-toolkit/model";
import {RowSelectedEvent}   from "@hpe/angular-toolkit/model";
import {RowUnselectedEvent} from "@hpe/angular-toolkit/model";
import {MenuSelectionMode}  from "@hpe/angular-toolkit/model";
import {Lib}                from "@hpe/angular-toolkit/lib";
import {AbstractSubscriber} from "@hpe/angular-toolkit/service";
import {EventBusService}    from "@hpe/angular-toolkit/service";
import {LabelService}       from "@hpe/angular-toolkit/service";

//=============================================================================

@Component({
    selector    :     'hpe-list-table',
    templateUrl :   './list-table.html',
    styleUrls   : [ './list-table.scss' ]
})

//=============================================================================

export class ListTable extends AbstractSubscriber implements OnChanges {

    //-------------------------------------------------------------------------
    //---
    //--- Variables
    //---
    //-------------------------------------------------------------------------

	@Input() rowId          : any;
    @Input() columns        : ListTableColumn[];
    @Input() data           : any[];
    @Input() visibleColumns : string[];
	@Input() multiSelection : boolean;
	@Input() rowsPerPage    : number;
	@Input() rowSet         : number[];
	@Input() loading        : boolean;
	@Input() labelGroup     : string;
	@Input() contextMenu    : Menu[];
	@Input() menuSelector   : MenuSelector;

	//-------------------------------------------------------------------------

	@Output() onFilterChange : EventEmitter<FilterChangeEvent>  = new EventEmitter<FilterChangeEvent>();
	@Output() onRowSelected  : EventEmitter<RowSelectedEvent>   = new EventEmitter<RowSelectedEvent>();
	@Output() onRowUnselected: EventEmitter<RowUnselectedEvent> = new EventEmitter<RowUnselectedEvent>();

	//-------------------------------------------------------------------------

	@ViewChild('tt') private pTable       : DataTable;
	@ViewChild('cm') private pContextMenu : ContextMenu;

	//-------------------------------------------------------------------------

	selectedRow    : any;
	displayColumns : ListTableColumn[];
	displayData    : any[];
	activeMenu     : Menu[];

	//--- Map containing for one column a list of (key, value) pairs. The key
	//--- is the actual column's value while the value is the transcoded one.
	//--- It is used to display dropdown filters

	columnValues: Map<string, DropdownItem[]>;

	//-------------------------------------------------------------------------

	private colToIndex : Map<string, number>;

	//-------------------------------------------------------------------------

	private alignMap = {
		'left'   : 'alignLeft',
		'center' : 'alignCenter',
		'right'  : 'alignRight'
	};

	//-------------------------------------------------------------------------
    //---
    //--- Constructor
    //---
    //-------------------------------------------------------------------------

    constructor(        eventBusService : EventBusService,
                private labelService    : LabelService) {

    	super(eventBusService);

    	this.rowsPerPage    = 8;
		this.rowSet         = [4, 8, 12, 16, 20, 50];
		this.loading        = false;
		this.multiSelection = false;
	}

    //-------------------------------------------------------------------------
    //---
    //--- API methods
    //---
    //-------------------------------------------------------------------------

	public exportAll() : void {
		this.pTable.exportCSV();
	}

	//-------------------------------------------------------------------------

	public exportSelected() : void {
		this.pTable.exportCSV({selectionOnly:true});
	}

	//-------------------------------------------------------------------------
	//--- Localization methods
	//-------------------------------------------------------------------------

	get allValue() : string {
		return this.labelService.getLabel("list-table", "all");
	}

	//-------------------------------------------------------------------------

	get noRecords() : string {
		return this.labelService.getLabel("list-table", "noRecords");
	}

    //-------------------------------------------------------------------------
    //---
    //--- Lifecycle events
    //---
    //-------------------------------------------------------------------------

	ngOnChanges(changes: SimpleChanges) {

    	let rebuildColumnValues : boolean = false;

		if (changes["columns"]) {
			this.initColumns();
			rebuildColumnValues = true;
		}

		if (changes["data"]) {
			this.initData();
			rebuildColumnValues = true;
		}

		if (changes["visibleColumns"]) {
			this.initVisibleColumns();
		}

		if (rebuildColumnValues) {
			this.initColumnValues();
		}
		//		"labels" ???
	}

	//-------------------------------------------------------------------------
	//---
	//--- Events
	//---
	//-------------------------------------------------------------------------

    onRowSelect(event : any) {

		//--- In case of multi-selection, the selectedRow variable is an array of rows
		let row : any  = this.restoreRow(event.data);
		let rows: any[]= this.calcSelectedRows(this.selectedRow);

		this.onRowSelected.emit(new RowSelectedEvent(row, rows));
    }

	//-------------------------------------------------------------------------

	onRowUnselect(event : any) {

		//--- In case of multi-selection, the selectedRow variable is an array of rows
		let row : any  = this.restoreRow(event.data);
		let rows: any[]= this.calcSelectedRows(this.selectedRow);

		this.onRowUnselected.emit(new RowUnselectedEvent(row, rows));
	}

	//-------------------------------------------------------------------------

	onContextMenuSelect(event) {

		//--- In case of multi-selection, the selectedRow variable is an array of rows
		let row  = this.restoreRow(event.data);
		let rows = this.calcSelectedRows(this.selectedRow);
		let rse  = new RowSelectedEvent(row, rows);

    	//--- Emit event
		this.onRowSelected.emit(rse);

		//--- Setup context menu

    	this.activeMenu = this.selectMenuItems(this.contextMenu, rse, null);
    }

	//-------------------------------------------------------------------------

	onFilter(event) {
		this.onFilterChange.emit(new FilterChangeEvent(this.getFilteredSize()));
	}

	//-------------------------------------------------------------------------
	//---
	//--- Local methods
	//---
	//-------------------------------------------------------------------------

	filter(value : any, col : ListTableColumn) {
		this.pTable.filter(value, col.field, col.filterMatchMode);
	}

	//-------------------------------------------------------------------------
	//---
	//--- Private methods
	//---
	//-------------------------------------------------------------------------

	private initColumns() : void {

		console.log("Initializing columns : "+ JSON.stringify(this.columns));

		this.colToIndex = new Map();

		if (this.columns == null) {
			//--- Do nothing for now
		}
		else {
			let index : number = 0;

			this.columns.forEach( (col : ListTableColumn) => {
				this.colToIndex.set(col.field, index++);

				col.displayHeader   = this.calcHeader(col);
				col.filterMatchMode = this.calcFilterMatchMode(col);
			});
		}
	}

	//-------------------------------------------------------------------------
	//--- Compute the column header choosing (in this order)
	//---    The 'header' field
	//---    The label defined inside 'labels' (if bounded)
	//---    The 'field' field

	private calcHeader(col : ListTableColumn) : string {

		return col.header
				|| (this.labelGroup && this.labelService.getLabel(this.labelGroup, col.field))
				|| col.field;
	}

	//-------------------------------------------------------------------------

	private calcFilterMatchMode(col: ListTableColumn): string {

		if (col.filter == null) {
			return "contains";
		}

		if (col.filter == "select") {
			return "equals";
		}

		if (col.filter == "list") {
			return "in";
		}

		return null;
	}

	//-------------------------------------------------------------------------

	private initData() : void {

		console.log("Initializing data : "+ JSON.stringify(this.data));

		if (this.columns == null || this.data == null) {
			this.displayData = null;
		}
		else {
			this.displayData = [];

			this.data.forEach( (row : any) => {
				let displayRow = {};
				this.displayData.push(displayRow);

				for (let key in row) {
					let cell : ListTableCell = new ListTableCell();
					displayRow[key] = cell;

					let value = row[key];
					let colNdx= this.colToIndex.get(key);
					let col   = this.columns[colNdx];

					cell.originalValue = value;
					cell.displayValue  = this.calcDisplayValue(row, col, value);
					cell.style         = this.calcDisplayStyle(row, col, value);
				}
			});
		}
	}

	//-------------------------------------------------------------------------

	private calcDisplayValue(row : any, col : ListTableColumn, value : any): string {

		if (col.transcoder != null) {
			value = col.transcoder.transcode(value);
		}

		return (value != null)
				? value.toString()
				: null;
	}

	//-------------------------------------------------------------------------

	private calcDisplayStyle(row : any, col : ListTableColumn, value : any) : string[] {

		let styles: string[] = ['cell'];

		if (col.alignment != null) {
			styles.push(this.alignMap[col.alignment]);
		}

		if (col.styler != null) {
			let style: CellStyle = col.styler.style(value, row);

			if (style.icon != null) {
				styles.push("fa");
				styles.push(style.icon);
			}

			if (style.extraClass != null) {
				styles.push(style.extraClass);
			}
		}

		return styles;
	}

	//-------------------------------------------------------------------------

	private initVisibleColumns() : void {

		console.log("Initializing visible columns : "+ JSON.stringify(this.visibleColumns));

		if (this.columns == null || this.visibleColumns == null) {
			this.displayColumns = null;
		}
		else {
			this.displayColumns = [];

			this.visibleColumns.forEach( (name : string) => {
				let index : number = this.colToIndex.get(name);

				if (index != null) {
					this.displayColumns.push(this.columns[index]);
				}
			});
		}
	}

	//-------------------------------------------------------------------------

	private initColumnValues() : void {

		this.columnValues = new Map();

		//--- exit if we still do not have columns or values

		if (this.columns == null || this.data == null) {
			return null;
		}

		console.log("Calculating column values for : ");

		this.columns.forEach((col: ListTableColumn) => {
			console.log("   --> " + col.field);
			this.columnValues.set(col.field, this.getColumnValues(col));
		});
	}

	//-------------------------------------------------------------------------
	//--- Given a column, builds the set of values and caches it
	//--- Used for displaying column filters

	private getColumnValues(col : ListTableColumn) : DropdownItem[] {

    	let field  : string = col.field;
		let values : Set<any> = new Set();

		//--- first, collect distinct values

		this.data.forEach(row => {
			let value : any = row[field];

			//--- null values causes issues with filters

			if (value != null) {
				values.add(value);
			}
		});

		//--- second, build final list as an array of (value, label) entries

		let list : DropdownItem[] = [];

		//--- only the dropdown filter needs the "All" option

		if (col.filter == "select") {
			list.push({
				label: this.allValue,
				value: null
			});
		}

		values.forEach( (value:any) => {
			if (col.transcoder != null) {
				value = col.transcoder.transcode(value);
			}

			let label: string = (value != null)
									? value.toString()
									: null;

			list.push({
				label: label ,
				value: label
			});
		});

		return list;
	}

	//-------------------------------------------------------------------------
	//-- If a filter is selected, this method returns the length of the filtered list,
	//-- otherwise it returns the length of the data list.

	private getFilteredSize() : number {

		if (this.pTable) {
			if (this.pTable.filteredValue) {
				return this.pTable.filteredValue.length;
			}
		}

		if (this.data) {
			return this.data.length;
		}

		return null;
	}

	//-------------------------------------------------------------------------

	private restoreRow(data : any) : any {

    	let row : any = {};

    	for (let key in data) {
    		row[key] = data[key].originalValue;
	    }

    	return row;
	}

	//-------------------------------------------------------------------------

	private calcSelectedRows(rows : any[]) : any[] {

    	let result : any[] = [];

    	if (rows != null) {
    		rows.forEach((row : any) => {
    			result.push(this.restoreRow(row));
		    });
	    }

		return result;
	}

	//-------------------------------------------------------------------------

	private selectMenuItems(menu : Menu[], rse : RowSelectedEvent, parentId : string) : Menu[] {

		//--- Filter menu items depending on selector

		let result : Menu[] = [];

		menu.forEach((menu : Menu) => {
			let m = Lib.menu.clone(menu);

			//--- Concatenate parentId

			if (parentId != null) {
				m.id = parentId +"."+ m.id;
			}

			m.command = (event) => {
				this.fireEvent(m.id, rse);
			};

			if (this.menuSelector == null) {
				result.push(m);
			}
			else {
				let mode = this.menuSelector.select(m.id, rse);

				m.disabled = (mode == MenuSelectionMode.DISABLE);

				if (mode == MenuSelectionMode.EXCLUDE) {
					//--- Exclude menu from list
				}
				else {
					//--- Mode is INCLUDE or DISABLE
					result.push(m);
				}
			}

			//--- Recurse on children

			if (menu.items != null) {
				m.items = this.selectMenuItems(menu.items, rse, m.id);

				if (menu.items != null && m.items == null) {
					m.disabled = true;
				}
			}
		});

		return (result.length != 0)
					? result
					: null;
	}

	//-------------------------------------------------------------------------

	private fireEvent(code: string, event : RowSelectedEvent) {

    	//--- Hide context-menu (it seems that with our config it does not disappear automatically)

    	this.pContextMenu.hide();

		let tableEvent: AppEvent = {
			code  : code,
			params: event
		};

		super.emitToApp(tableEvent);
	}
}

//=============================================================================

class ListTableCell {

	originalValue : any;
	displayValue  : string;
	style         : string[];

	//-------------------------------------------------------------------------

	public toString() : string {
		return this.displayValue;
	}
}

//=============================================================================
