//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {MenuItem} from "primeng/api";

import {ListTableColumn}    from "@hpe/angular-toolkit/model";
import {ListBackendService} from "@hpe/angular-toolkit/model";
import {FilterChangeEvent}  from "@hpe/angular-toolkit/model";
import {MenuSelector}       from "@hpe/angular-toolkit/model";
import {RowSelectedEvent}   from "@hpe/angular-toolkit/model";
import {RowUnselectedEvent} from "@hpe/angular-toolkit/model";
import {LabelService}       from "@hpe/angular-toolkit/service";

//=============================================================================

@Component({
	selector    :     'hpe-list-panel',
	templateUrl :   './list-panel.html',
	styleUrls   : [ './list-panel.scss' ]
})

//=============================================================================

export class ListPanel<T> implements OnInit {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	@Input() icon           : string;
	@Input() title          : string;
	@Input() rowId          : any;
	@Input() columns        : ListTableColumn[];
	@Input() visibleColumns : string[];
	@Input() multiSelection : boolean;
	@Input() contextMenu    : MenuItem[];
	@Input() menuSelector   : MenuSelector;
	@Input() service        : ListBackendService<T>;
	@Input() labelGroup     : string;

	//-------------------------------------------------------------------------

	@Output() onRowSelected   : EventEmitter<RowSelectedEvent>   = new EventEmitter<RowSelectedEvent>();
	@Output() onRowUnselected : EventEmitter<RowUnselectedEvent> = new EventEmitter<RowUnselectedEvent>();

	//-------------------------------------------------------------------------

	loading      : boolean;
	failed       : boolean;
	overflow     : boolean;
	filteredSize : number;
	data         : any[];

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(private labelService : LabelService) {
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	public refresh() : void {

		this.loading      = false;
		this.failed       = false;
		this.overflow     = false;
		this.filteredSize = null;

		//--- Remove subscription to service (if any)

		if (this.service != null) {
			this.loading = true;

			this.service().subscribe(
				result => {
					this.loading      = false;
					this.data         = (result.results);
					this.filteredSize = (result.results.length);
					this.overflow     = (result.overflow);
				},
				error => {
					console.log("Service raised an error : "+ JSON.stringify(error));
					this.data    = [];
					this.loading = false;
					this.failed  = true;
				});
		}
	}

	//-------------------------------------------------------------------------

	get color() : string {
		return (this.overflow)
					? 'orange'
					: 'slate';
	}

	//-------------------------------------------------------------------------
	//--- Localization stuff
	//-------------------------------------------------------------------------

	get exportSelTooltip() : string {
		return this.loc("exportSel.tooltip");
	}

	//-------------------------------------------------------------------------

	get exportAllTooltip() : string {
		return this.loc("exportAll.tooltip");
	}

	//-------------------------------------------------------------------------

	get refreshTooltip() : string {
		return this.loc("refresh.tooltip");
	}

	//-------------------------------------------------------------------------
	//---
	//--- Lifecycle events
	//---
	//-------------------------------------------------------------------------

	ngOnInit() {
		this.refresh();
	}

	//-------------------------------------------------------------------------
	//---
	//--- ListTable events
	//---
	//-------------------------------------------------------------------------

	onFilterChange(event : FilterChangeEvent) {
		this.filteredSize = event.filteredSize;
	}

	//-------------------------------------------------------------------------

	onRowSelect(event : RowSelectedEvent) {
		this.onRowSelected.emit(event.row);
	}

	//-------------------------------------------------------------------------

	onRowUnselect(event : RowUnselectedEvent) {
		this.onRowUnselected.emit(event.row);
	}

	//-------------------------------------------------------------------------
	//---
	//--- Private methods
	//---
	//-------------------------------------------------------------------------

	private loc(code : string) : string {
		return this.labelService.getLabel("list-panel", code);
	}
}

//=============================================================================
