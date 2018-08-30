//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {OverlayPanel} from "primeng/primeng";

//=============================================================================

@Component({
	selector    :     'hpe-toolbar-button',
	templateUrl :   './toolbar-button.html',
	styleUrls   : [ './toolbar-button.scss' ]
})

//=============================================================================

export class ToolbarButton {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	@Input() icon        : string;
	@Input() toggle      : boolean;
	@Input() highlighted : boolean;
	@Input() disabled    : boolean;

	//-------------------------------------------------------------------------

	@Output() onClick : EventEmitter<any> = new EventEmitter();

	//-------------------------------------------------------------------------

	selected : boolean;

	//-------------------------------------------------------------------------

	@ViewChild("op") private overlayPanel: OverlayPanel;

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor() {
		this.toggle      = false;
		this.highlighted = false;
		this.selected    = false;
	}

	//-------------------------------------------------------------------------
	//---
	//--- Events
	//---
	//-------------------------------------------------------------------------

	onButtonClick(event) : void {

		if (this.toggle) {
			this.selected = ! this.selected;
			this.overlayPanel.toggle(event);
		}

		this.onClick.emit(event);
	}
}

//=============================================================================
