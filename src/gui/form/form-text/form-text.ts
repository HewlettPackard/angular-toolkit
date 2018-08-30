//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component,Input } from '@angular/core';
import {Transcoder}       from "@hpe/angular-toolkit/model";

//=============================================================================

@Component({
	selector    :     'hpe-form-text',
	templateUrl :   './form-text.html',
	styleUrls   : [ './form-text.scss' ]
})

//=============================================================================

export class FormText {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	@Input() icon       : string;
	@Input() label      : string;
	@Input() transcoder : Transcoder;

	//-------------------------------------------------------------------------

	private _value : string;

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor() {}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	@Input()
	get value() : string {
		return this._value;
	}

	//-------------------------------------------------------------------------

	set value(value) {

		if (this.transcoder && value!=null) {
			value =  this.transcoder.transcode(value);
		}

		this._value = value;
	}
}

//=============================================================================
