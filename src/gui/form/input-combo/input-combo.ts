//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component, Input}      from '@angular/core';
import {NG_VALUE_ACCESSOR}     from '@angular/forms';
import {AbstractFormComponent} from "../abstract-form-component";

//=============================================================================

@Component({
	selector    :   'hpe-input-combo',
	templateUrl :   './input-combo.html',
	styleUrls   : [ './input-combo.scss' ],
	providers   : [ {
		provide    : NG_VALUE_ACCESSOR,
		useExisting: InputCombo,
		multi      : true
	}]
})

//=============================================================================

export class InputCombo extends AbstractFormComponent {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	@Input() key   : string;
	@Input() value : string;

	data  : any[];

	//-------------------------------------------------------------------------

	private _selectedItem : Object;
	private _dataMap      : Object;

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor() {
		super();
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	@Input()
	get dataMap() : Object {
		return this._dataMap;
	}

	//-------------------------------------------------------------------------

	set dataMap(map : Object) {

		this._dataMap = map;
		this.key      = "id";
		this.value    = "value";

		let list = [];

		if ( ! this.required) {
			list.push( {
				"id"    : null,
				"value" : null
			});
		}

		for (let key in map) {
			let name  : any = Number(key);
			let value : any = map[key];

			if (isNaN(name)) {
				name = key;
			}

			list.push( {
				"id"    : name,
				"value" : value
			});
		}

		this.data = list;
		console.log("set data: "+ JSON.stringify(list));
	}

	//-------------------------------------------------------------------------

	public writeValue(keyValue) {

		console.log("writeValue: "+ JSON.stringify(keyValue));

		let item = this.data.find( (item) => {
			return (item[this.key] == keyValue)
		});

		//--- Select first entry in case there is no match

		if (item == null) {
			if (this.data != null && this.data.length > 0) {
				item = this.data[0];
			}
		}

		this._selectedItem = item;
	}

	//-------------------------------------------------------------------------

	get selectedItem() : Object {
		console.log("get selectedItem: "+ JSON.stringify(this._selectedItem));
		return this._selectedItem;
	}

	//-------------------------------------------------------------------------

	set selectedItem(newItem : Object) {

		console.log("set selectedItem: "+ JSON.stringify(newItem));

		this._selectedItem = newItem;
		this.onChange(newItem[this.key]);
	}

	//-------------------------------------------------------------------------
	//---
	//--- Protected methods
	//---
	//-------------------------------------------------------------------------

	protected isProvided() : boolean {
	 	return (this.selectedItem != null && this.selectedItem[this.key] != null);
	}
}

//=============================================================================
