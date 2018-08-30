//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component} from '@angular/core';

import {AppEvent}        from "@hpe/angular-toolkit/model";
import {EventBusService} from "@hpe/angular-toolkit/service";

//=============================================================================

@Component({
    selector    :     'hpe-menu-button',
    templateUrl :   './menu-button.html',
	styleUrls   : [ './menu-button.scss' ]
})

//=============================================================================

export class MenuButton {

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

    constructor(private eventBusService: EventBusService) {
    }

	//-------------------------------------------------------------------------
	//---
	//--- Events
	//---
	//-------------------------------------------------------------------------

	onClick() {
		let event : AppEvent = new AppEvent(AppEvent.MENU_BUTTON_CLICK);
		this.eventBusService.emitToApp(event);
	}
}

//=============================================================================
