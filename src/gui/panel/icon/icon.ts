//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import { Component, Input } from "@angular/core";

//=============================================================================

@Component({
	selector    :     'hpe-icon',
	templateUrl :   './icon.html',
	styleUrls   : [ './icon.scss' ]
})

//=============================================================================

export class Icon {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	@Input() name : string;

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor() {}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	get content() : string {

		return (this.isFontAwesomeIcon())
					? null
					: this.name;
	}

	//-------------------------------------------------------------------------

	get iconClass() : string[] {

		let styles : string[] = [ "iconStyle" ];

		if (this.isFontAwesomeIcon()) {
			styles.push("fa");
			styles.push(this.name);
		}
		else {
			styles.push("material-icons");
		}

		return styles;
	}

	//-------------------------------------------------------------------------
	//---
	//--- Private methods
	//---
	//-------------------------------------------------------------------------

	private isFontAwesomeIcon() : boolean {
		return (this.name != null && this.name.startsWith("fa-"));
	}
}

//=============================================================================
