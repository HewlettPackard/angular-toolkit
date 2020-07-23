//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component, Input}      from '@angular/core';
import {NG_VALUE_ACCESSOR}     from '@angular/forms';
import {SelectItem}            from "primeng/api";
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

	@Input() data : SelectItem[];

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

		let list = [];

		if ( ! this.required) {
			list.push({
				"value" : null,
				"label" : null
			});
		}

		for (let key in map) {
			let name  : any = Number(key);
			let value : any = map[key];

			if (isNaN(name)) {
				name = key;
			}

			list.push( {
				"value" : name,
				"label" : value
			});
		}

		this.data = list;
	}

	//-------------------------------------------------------------------------

	public writeValue(value : Object) {
		this._selectedItem = value;
	}

	//-------------------------------------------------------------------------

	get selectedItem() : Object {
		return this._selectedItem;
	}

	//-------------------------------------------------------------------------

	set selectedItem(newItem : Object) {

		this._selectedItem = newItem;
		this.onChange(newItem);
	}

	//-------------------------------------------------------------------------
	//---
	//--- Protected methods
	//---
	//-------------------------------------------------------------------------

	protected isProvided() : boolean {
	 	return (this._selectedItem != null);
	}
}

//=============================================================================
