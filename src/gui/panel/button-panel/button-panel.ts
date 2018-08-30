//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {ChangeDetectorRef, Component} from "@angular/core";

import {AppEvent}           from "@hpe/angular-toolkit/model";
import {AbstractSubscriber} from "@hpe/angular-toolkit/service";
import {EventBusService}    from "@hpe/angular-toolkit/service";

//=============================================================================

@Component({
	selector    :     'hpe-button-panel',
	templateUrl :   './button-panel.html',
	styleUrls   : [ './button-panel.scss' ]
})

//=============================================================================

export class ButtonPanel extends AbstractSubscriber {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

    private submitting : boolean;

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(eventBusService : EventBusService, private changeDetectorRef: ChangeDetectorRef) {

	    super(eventBusService);

		this.submitting = false;
		super.subscribeToApp(AppEvent.SUBMIT_START, () => this.onSubmitStart());
        super.subscribeToApp(AppEvent.SUBMIT_END,   () => this.onSubmitEnd());
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	public getComponentClass() : string[] {

		let styles : string[] = [ 'row' ];

		if (this.submitting) {
			styles.push("disabled");
		}

		return styles;
	}

	//-------------------------------------------------------------------------
    //---
    //--- Event methods
    //---
    //-------------------------------------------------------------------------

    private onSubmitStart() {

        this.submitting = true;
        this.changeDetectorRef.detectChanges();
    }

    //-------------------------------------------------------------------------

    private onSubmitEnd() {

        this.submitting = false;
        this.changeDetectorRef.detectChanges();
    }
}

//=============================================================================
