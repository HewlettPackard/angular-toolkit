//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Injectable}         from '@angular/core';
import {AppEvent}           from "@hpe/angular-toolkit/model";

import {AbstractSubscriber} from "./abstract-subscriber";
import {EventBusService}    from "./eventbus-service";

//=============================================================================

enum Status {
	LOGIN,
	LOADING,
	READY
}

//=============================================================================

@Injectable()
export class ApplicationService extends AbstractSubscriber {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	private status : Status = Status.LOGIN;

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(eventBusService: EventBusService) {

		super(eventBusService);

		super.subscribeToApp(AppEvent.LOGIN_SUCCESS,     (event : AppEvent) => this.onLoginSuccess    (event));
		super.subscribeToApp(AppEvent.LOGIN_FAILED,      (event : AppEvent) => this.onLoginFailed     (event));
		super.subscribeToApp(AppEvent.LOGOUT_SUCCESS,    (event : AppEvent) => this.onLogoutSuccess   (event));
		super.subscribeToApp(AppEvent.LOGOUT_FAILED,     (event : AppEvent) => this.onLogoutFailed    (event));
		super.subscribeToApp(AppEvent.INVALID_TOKEN,     (event : AppEvent) => this.onInvalidToken    (event));
		super.subscribeToApp(AppEvent.APPLICATION_READY, (event : AppEvent) => this.onApplicationReady(event));
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	public isStatusLogin() : boolean {
		return this.status == Status.LOGIN;
	}

	//-------------------------------------------------------------------------

	public isStatusLoading() : boolean {
		return this.status == Status.LOADING;
	}

	//-------------------------------------------------------------------------

	public isStatusReady() : boolean {
		return this.status == Status.READY;
	}

	//-------------------------------------------------------------------------
	//---
	//--- Events
	//---
	//-------------------------------------------------------------------------

	private onLoginSuccess(event : AppEvent) {
		this.status = Status.LOADING;
	}

	//-------------------------------------------------------------------------

	private onLoginFailed(event : AppEvent) {
		this.status = Status.LOGIN;
	}

	//-------------------------------------------------------------------------

	private onLogoutSuccess(event : AppEvent) {
		this.status = Status.LOGIN;
	}

	//-------------------------------------------------------------------------

	private onLogoutFailed(event : AppEvent) {
		this.status = Status.LOGIN;
	}

	//-------------------------------------------------------------------------

	private onInvalidToken(event : AppEvent) {
		this.status = Status.LOGIN;
	}

	//-------------------------------------------------------------------------

	private onApplicationReady(event : AppEvent) {
		this.status = Status.READY;
	}
}

//=============================================================================
