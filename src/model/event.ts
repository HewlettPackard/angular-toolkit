//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

//=============================================================================
//===
//=== Events
//===
//=============================================================================

export class AppEvent<T = any>  {

	//-------------------------------------------------------------------------

	constructor(public code : string, public params? : T) {}

	//-------------------------------------------------------------------------
	//--- System events
	//-------------------------------------------------------------------------

	static ANY                : string = "*";
	static SUBMIT_START       : string = "submit.start";
	static SUBMIT_END         : string = "submit.end";

	static LOGIN_SUCCESS      : string = "login.success";
	static LOGIN_FAILED       : string = "login.failed";
	static LOGOUT_SUCCESS     : string = "logout.success";
	static LOGOUT_FAILED      : string = "logout.failed";
	static INVALID_TOKEN      : string = "invalid.token";
	static APPLICATION_READY  : string = "app.ready";

	static MENU_BUTTON_CLICK  : string = "menu.button.click";
	static RIGHT_PANEL_CLOSE  : string = "right.panel.close";
}

//=============================================================================

export interface EventHandler {
	(event : AppEvent) : void;
}

//=============================================================================
//===
//=== Errors
//===
//=============================================================================

export class ErrorEvent {
	code : string;
	error: string;
}

//=============================================================================

export interface ErrorHandler {
	(event : ErrorEvent) : void;
}

//=============================================================================
