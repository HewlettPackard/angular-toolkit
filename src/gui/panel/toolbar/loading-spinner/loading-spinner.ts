//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {ChangeDetectorRef, Component } from '@angular/core';

import {AppEvent}           from "@hpe/angular-toolkit/model";
import {AbstractSubscriber} from "@hpe/angular-toolkit/service";
import {EventBusService}    from "@hpe/angular-toolkit/service";
import {HttpService}        from "@hpe/angular-toolkit/service";

//=============================================================================

@Component({
	selector      :     'hpe-loading-spinner',
	templateUrl   :   './loading-spinner.html',
	styleUrls     : [ './loading-spinner.scss' ]
})

//=============================================================================

export class LoadingSpinner extends AbstractSubscriber {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	state : string = "loaded";

	//-------------------------------------------------------------------------

	classes : any = {
		loading : "fa-pulse",
		loaded  : "loaded",
	};

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(eventBusService : EventBusService, private changeDetectorRef : ChangeDetectorRef) {

		super(eventBusService);

		//--- Local Fat Arrow is mandatory in order to preserve 'this'
		super.subscribeToApp(AppEvent.SUBMIT_START, event => this.onSubmitStart(event));
		super.subscribeToApp(AppEvent.SUBMIT_END,   event => this.onSubmitEnd(event));
	}

	//-------------------------------------------------------------------------
	//---
	//--- Event methods
	//---
	//-------------------------------------------------------------------------

	private onSubmitStart(event: AppEvent) {
		this.state = "loading";
		this.changeDetectorRef.detectChanges();
	}

	//-------------------------------------------------------------------------

	private onSubmitEnd(event: AppEvent) {
		this.state = "loaded";
		this.changeDetectorRef.detectChanges();
	}
}

//=============================================================================
