//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {OnDestroy}    from "@angular/core";
import {Subscription} from "rxjs";

import {EventHandler, ErrorHandler, AppEvent, ErrorEvent} from "@hpe/angular-toolkit/model";

import {EventBusService} from "./eventbus-service";

//=============================================================================

export class AbstractSubscriber implements OnDestroy {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	private subscriptions: Subscription[] = [];

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(private eventBusService : EventBusService) {}

	//-------------------------------------------------------------------------
	//---
	//--- Lifecycle methods
	//---
	//-------------------------------------------------------------------------

	public ngOnDestroy() {
		this.subscriptions.forEach( (s : Subscription) => s.unsubscribe());
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	protected subscribeToApp(eventCode : string, handler : EventHandler) : Subscription {

		let s : Subscription = this.eventBusService.subscribeToApp(eventCode, handler);
		this.subscriptions.push(s);

		return s;
	}

	//-------------------------------------------------------------------------

	protected emitToApp(event : AppEvent) : void {
		this.eventBusService.emitToApp(event);
	}

	//-------------------------------------------------------------------------

	protected subscribeToError(handler : ErrorHandler) : Subscription {

		let s : Subscription = this.eventBusService.subscribeToError(handler);
		this.subscriptions.push(s);

		return s;
	}

	//-------------------------------------------------------------------------

	protected emitToError(event : ErrorEvent) : void {
		this.eventBusService.emitToError(event);
	}
}

//=============================================================================
