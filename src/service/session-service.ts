//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//===
//=============================================================================

import {Injectable} from '@angular/core';

import {AppEvent}           from "@hpe/angular-toolkit/model";
import {Credentials}        from "@hpe/angular-toolkit/model";
import {Profile}            from "@hpe/angular-toolkit/model";
import {Session}            from "@hpe/angular-toolkit/model";
import {SessionUser}        from "@hpe/angular-toolkit/model";

import {AbstractSubscriber} from "./abstract-subscriber";
import {EventBusService}    from "./eventbus-service";
import {HttpService}        from "./http-service";


//=============================================================================

@Injectable()
export class SessionService extends AbstractSubscriber {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	public session     : Session;
	public token       : string;
	public user        : SessionUser;
	public profile     : Profile;
	public permissions : Map<string, boolean>;

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(eventBusService: EventBusService, private httpService : HttpService) {

		super(eventBusService);
		this.clearSession();

		super.subscribeToApp(AppEvent.INVALID_TOKEN, event => this.onInvalidToken(event));
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	public login(cred : Credentials) : void {

		console.log("SessionService.login : Logging in user='" + cred.username + "'");

		//--- Loads user profile from server

		this.httpService.postObject("/api/session/login", cred)
			.subscribe(	result => this.loginSuccess(result),
						error => this.loginError(error));
	}

	//-------------------------------------------------------------------------

	public logout() : void {

		console.log("SessionService.logout : Logging out user='" + (this.user || "???") + "'");

		this.httpService.postObject("/api/session/logout", { token: this.token })
			.subscribe(	result => this.logoutSuccess(),
						error => this.logoutError(error));
	}

	//-------------------------------------------------------------------------

	public clearSession() : void {

		console.log("SessionService.clearSession: Resetting session...");

		this.session     = null;
		this.token       = null;
		this.user        = null;
		this.profile     = null;
		this.permissions = new Map();
	}

	//-------------------------------------------------------------------------

	public get homePage() : string {

		return (this.profile)
					? this.profile.homePage
					: null;
	}

	//-------------------------------------------------------------------------

	public hasPermission(name : string) : boolean {
		return (this.permissions.get(name));
	}

	//-------------------------------------------------------------------------
	//---
	//--- Private methods
	//---
	//-------------------------------------------------------------------------

	private loginSuccess(session: Session): void {

		this.session     = session;
		this.token       = session.token;
		this.user        = session.user;
		this.profile     = session.profile;
		this.permissions = this.setupPermissionMap(this.profile.permissions);

		super.emitToApp(new AppEvent(AppEvent.LOGIN_SUCCESS, session));

		console.log("Login successful for user="+ this.user.username);
	}

	//-------------------------------------------------------------------------

	private loginError(response: any) {
		super.emitToApp(new AppEvent(AppEvent.LOGIN_FAILED, response));
	}

	//-------------------------------------------------------------------------

	private logoutSuccess(): void {

		let username = this.user.username;

		this.clearSession();
		super.emitToApp(new AppEvent(AppEvent.LOGOUT_SUCCESS, username));

		console.log("Logout successful for user="+ username);
	}

	//-------------------------------------------------------------------------

	private logoutError(response: any): void {

		this.clearSession();
		super.emitToApp(new AppEvent(AppEvent.LOGOUT_FAILED));
	}

	//-------------------------------------------------------------------------

	private setupPermissionMap(permissions : string[]) : Map<string, boolean> {

		let map = new Map<string, boolean>();

		permissions.forEach((p : string) => map.set(p, true));

		return map;
	}

	//-------------------------------------------------------------------------
	//---
	//--- Events
	//---
	//-------------------------------------------------------------------------

	private onInvalidToken(event : AppEvent) {
		this.clearSession();
	}
}

//=============================================================================
