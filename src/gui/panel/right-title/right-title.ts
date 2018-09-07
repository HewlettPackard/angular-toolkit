//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component, EventEmitter, Input, Output} from '@angular/core';

import {LabelService} from "@hpe/angular-toolkit/service";

//=============================================================================

@Component({
	selector    :     'hpe-right-title',
	templateUrl :   './right-title.html',
	styleUrls   : [ './right-title.scss' ]
})

//=============================================================================

export class RightTitle {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	@Input() icon  : string;
	@Input() title : string;

	//-------------------------------------------------------------------------

	@Output() onClose : EventEmitter<Event> = new EventEmitter<Event>();

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(private labelService : LabelService) {
	}

	//-------------------------------------------------------------------------
	//---
	//--- Template methods
	//---
	//-------------------------------------------------------------------------

	get closeTooltip() : string {
		return this.labelService.getLabel("right-title", "close.tooltip");
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	close(event : Event) {
		this.onClose.emit(event);
	}
}

//=============================================================================
