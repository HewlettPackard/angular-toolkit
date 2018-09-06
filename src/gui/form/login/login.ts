//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component} from '@angular/core';

import {AppEvent}            from "@hpe/angular-toolkit/model";
import {Credentials}         from "@hpe/angular-toolkit/model";
import {Lib}                 from "@hpe/angular-toolkit/lib";
import {AbstractSubscriber}  from "@hpe/angular-toolkit/service";
import {EventBusService}     from "@hpe/angular-toolkit/service";
import {HttpService}         from "@hpe/angular-toolkit/service";
import {LabelService}        from "@hpe/angular-toolkit/service";
import {NotificationService} from "@hpe/angular-toolkit/service";
import {SessionService}      from "@hpe/angular-toolkit/service";

//=============================================================================

@Component({
    selector    :     'hpe-login',
    templateUrl :   './login.html',
	styleUrls   : [ './login.scss' ]
})

//=============================================================================

export class LoginPanel extends AbstractSubscriber {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	cred : Credentials = new Credentials();

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(        eventBusService    : EventBusService,
				private sessionService     : SessionService,
				private notificationService: NotificationService,
				private labelService       : LabelService,
				public  httpService        : HttpService) {

		super(eventBusService);
		super.subscribeToApp(AppEvent.LOGIN_FAILED, event => this.onLoginFailed(event));
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	public login() : void {

		if ( ! this.areCredentialsValid()) {
			let msg = this.labelService.getLabel("login-panel", "missing.info");

			this.notificationService.showWarn(msg["title"], msg["descr"]);
		}
		else {
			this.sessionService.login(this.cred);
		}
	}

	//-------------------------------------------------------------------------
	//--- Localized strings
	//-------------------------------------------------------------------------

	get title() : string {
		return this.loc("title");
	}

	//-------------------------------------------------------------------------

	get username() : string {
		return this.loc("username");
	}

	//-------------------------------------------------------------------------

	get password() : string {
		return this.loc("password");
	}

	//-------------------------------------------------------------------------

	get button() : string {
		return this.loc("button");
	}

	//-------------------------------------------------------------------------
	//---
	//--- Events
	//---
	//-------------------------------------------------------------------------

	private onLoginFailed(event : AppEvent) {

		let msg = this.labelService.getLabel("login-panel", "login.error");

		this.notificationService.showError(msg["title"], msg["descr"]);
	}

	//-------------------------------------------------------------------------
	//---
	//--- Private methods
	//---
	//-------------------------------------------------------------------------

	private areCredentialsValid() {
		return Lib.str.isProvided(this.cred.username) && Lib.str.isProvided(this.cred.password);
	}

	//-------------------------------------------------------------------------

	private loc(code : string) : string {
		return this.labelService.getLabel("login-panel", code);
	}
}

//=============================================================================
