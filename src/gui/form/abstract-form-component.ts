//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Input}                from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

//=============================================================================

export abstract class AbstractFormComponent implements ControlValueAccessor {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	@Input() icon    : string;
	@Input() label   : string;
	@Input() enabled : boolean;

	//-------------------------------------------------------------------------

	private   _required : boolean;
	protected onChange  : any;

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor() {
		this.enabled = true;
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	registerOnChange(fn) {
		this.onChange = fn;
	}

	//-------------------------------------------------------------------------

	registerOnTouched(fn) {}

	//-------------------------------------------------------------------------

	public getComponentClass() : string[] {

		let styles : string[] = [ 'control' ];

		if (this.enabled) {
			if (this.required) {
				if (this.isProvided()) {
					styles.push("provided");
				}
				else {
					styles.push("required");
				}
			}
		}
		else {
			styles.push("disabled");
		}

		return styles;
	}

	//-------------------------------------------------------------------------
	//--- 'required' attribute
	//-------------------------------------------------------------------------

	@Input()
	get required() : boolean {
		return this._required;
	}

	//-------------------------------------------------------------------------

	set required(value:boolean) {

		let str : string = ""+value;

		if (str == "") {
			//--- Ok, '' means value not provided --> true
			value = true;
		}

		this._required = value;
	}

	//-------------------------------------------------------------------------
	//--- Abstract methods
	//-------------------------------------------------------------------------

	public abstract writeValue(value) : void;

	protected abstract isProvided() : boolean;
}

//=============================================================================
