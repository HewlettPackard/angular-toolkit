//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {LabelService} from "@hpe/angular-toolkit/service";

//=============================================================================

@Component({
	selector    :     'hpe-card-panel',
	templateUrl :   './card-panel.html',
	styleUrls   : [ './card-panel.scss' ],
	animations: [
		trigger('focusPanel', [
			state('open',   style({ height: '*' })),
			state('closed', style({ height: 0   })),
			transition('open => closed', animate('500ms ease-in')),
			transition('closed => open', animate('500ms ease-out'))
		])
	]
})

//=============================================================================

export class CardPanel {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	@Input() icon         : string;
	@Input() title        : string;
	@Input() toggleButton : boolean;

	//-------------------------------------------------------------------------

	state         : string;
	overflowUnset : boolean;

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(private labelService : LabelService) {
		this.toggleButton  = true;
		this.overflowUnset = true;
		this.state         = "open";
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	get cardOpen() : boolean {
		return this.state == "open";
	}

	//-------------------------------------------------------------------------

	get tooltip() : string {
		return this.labelService.getLabel("card-panel", "toggle.tooltip");
	}

	//-------------------------------------------------------------------------
	//---
	//--- Events
	//---
	//-------------------------------------------------------------------------

	onToggleClick() {

		this.state = (this.state == 'open')
			? 'closed'
			: 'open';
	}

	//-------------------------------------------------------------------------

	animationStart(e) {
		this.overflowUnset  = false;
	}

	//-------------------------------------------------------------------------

	animationEnd(e) {
		this.overflowUnset  = this.cardOpen;
	}
}

//=============================================================================
