//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component }        from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {Lib}               from "@hpe/angular-toolkit/lib";

import {AbstractFormComponent} from "../abstract-form-component";

//=============================================================================

@Component({
	selector    :     'hpe-input-text',
	templateUrl :   './input-text.html',
	styleUrls   : [ './input-text.scss' ],
	providers   : [ {
		provide    : NG_VALUE_ACCESSOR,
		useExisting: InputText,
		multi      : true
	}]
})

//=============================================================================

export class InputText extends AbstractFormComponent {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	private _value : string;

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

	public writeValue(value) {
		this._value = value;
	}

	//-------------------------------------------------------------------------

	get value() : string {
		return this._value;
	}

	//-------------------------------------------------------------------------

	set value(newValue) {

		if(newValue==""){
            newValue=null;
        }

		this._value = newValue;
		this.onChange(newValue);
	}

	//-------------------------------------------------------------------------
	//---
	//--- Protected methods
	//---
	//-------------------------------------------------------------------------

	protected isProvided() : boolean {
		return Lib.str.isProvided(this.value);
	}
}

//=============================================================================
