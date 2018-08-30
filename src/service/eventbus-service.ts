//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {EventEmitter, Injectable} from "@angular/core";

import {Subscription} from "rxjs";

import {AppEvent, ErrorEvent, ErrorHandler, EventHandler} from "@hpe/angular-toolkit/model";

//=============================================================================

@Injectable()
export class EventBusService {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	private eventEmitterMap : Map<string, EventEmitter<AppEvent>> = new Map();
	private errorEvents     : EventEmitter<ErrorEvent> = new EventEmitter();

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor() {
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	public subscribeToApp(eventCode : string, handler : EventHandler) : Subscription {

		let emitter : EventEmitter<AppEvent> = this.eventEmitterMap.get(eventCode);

		if (emitter == null) {
			emitter = new EventEmitter();
			this.eventEmitterMap.set(eventCode, emitter);
		}

		return emitter.subscribe(handler, null, null);
	}

	//-------------------------------------------------------------------------

	public emitToApp(event : AppEvent) : void {

		let emitter = this.eventEmitterMap.get(event.code);

		if (emitter != null) {
			console.log("Emitting event : "+ JSON.stringify(event));
			emitter.emit(event);
		}
		else {
			console.log("WARNING : Emitting an event without any handler : "+ JSON.stringify(event));
		}

		//--- Emitting to global handlers

		emitter = this.eventEmitterMap.get(AppEvent.ANY);

		if (emitter != null) {
			emitter.emit(event);
		}
	}

	//-------------------------------------------------------------------------

	public subscribeToError(handler : ErrorHandler) : Subscription {
		return this.errorEvents.subscribe(handler, null, null);
	}

	//-------------------------------------------------------------------------

	public emitToError(event : ErrorEvent) : void {
		console.log("Emitting error event : "+ JSON.stringify(event));
		this.errorEvents.emit(event);
	}
}

//=============================================================================
