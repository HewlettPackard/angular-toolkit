//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {NgModule}         from '@angular/core';
import {CommonModule}     from '@angular/common';
import {MessageService}   from "primeng/api";

import {ApplicationService}  from "./application-service";
import {EventBusService}     from "./eventbus-service";
import {HttpService}         from "./http-service";
import {LabelService}        from "./label-service";
import {NotificationService} from "./notification-service";
import {SessionService}      from "./session-service";

//=============================================================================

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
	],
	exports: [
	],
	providers: [
		ApplicationService,
		EventBusService,
		HttpService,
		LabelService,
		NotificationService,
		SessionService,

		//--- I don't know why but this line is mandatory in order to inject this service
		MessageService
	],
})

//=============================================================================

export class HpeServiceModule { }

//=============================================================================
