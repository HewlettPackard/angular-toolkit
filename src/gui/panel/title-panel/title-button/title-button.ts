//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component, EventEmitter, Input, Output} from '@angular/core';

//=============================================================================

@Component({
	selector    :     'hpe-title-button',
	templateUrl :   './title-button.html',
	styleUrls   : [ './title-button.scss' ]
})

//=============================================================================

export class TitleButton {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	@Input() icon     : string;
	@Input() tooltip  : string;
	@Input() disabled : boolean;

	//-------------------------------------------------------------------------

	@Output() onClick : EventEmitter<any> = new EventEmitter();

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor() {}
}

//=============================================================================
