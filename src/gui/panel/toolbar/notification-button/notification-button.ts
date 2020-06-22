//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component, OnDestroy} from '@angular/core';
import {Subscription}         from "rxjs";
import {MessageService}       from "primeng";

//=============================================================================

@Component({
	selector   :    'hpe-notification-button',
	templateUrl:  './notification-button.html',
	styleUrls  : ['./notification-button.scss']
})

//=============================================================================

export class NotificationButton implements OnDestroy {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	unreadMessages : boolean;

	messageList = [];

	//-------------------------------------------------------------------------

	private subscription : Subscription;

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(messageService: MessageService) {

		this.unreadMessages = false;
		this.subscription   = messageService.messageObserver.subscribe(
			(messages: any) => this.onMessage(messages)
		);
	}

	//-------------------------------------------------------------------------
	//---
	//--- Lifecycle methods
	//---
	//-------------------------------------------------------------------------

	public ngOnDestroy() {

		if (this.subscription != null) {
			this.subscription.unsubscribe();
		}
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	public onClick(event): void {
		this.unreadMessages = false;
	}

	//-------------------------------------------------------------------------
	//---
	//--- Event methods
	//---
	//-------------------------------------------------------------------------

	private onMessage(messages : any) : void {

		if (messages instanceof Array) {
			messages.forEach(e => this.messageList.unshift(e));
		}
		else {
			this.messageList.unshift(messages);
		}

		this.unreadMessages = true;
	}
}

//=============================================================================
