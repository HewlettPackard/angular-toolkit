//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import { Component, Input } from '@angular/core';

//=============================================================================

@Component({
	selector	:     'hpe-notification-item',
	templateUrl	:   './notification-item.html',
	styleUrls   : [ './notification-item.scss' ]
})

//=============================================================================

export class NotificationItem {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	@Input() message: any;

	//-------------------------------------------------------------------------

	icons = {
		success:'fa-check',
		info: 	'fa-info-circle',
		warn: 	'fa-exclamation-circle',
		error:	'fa-times-circle'
	};

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor() {}
}

//=============================================================================
