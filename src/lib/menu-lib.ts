//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {MenuItem} from "primeng";

//=============================================================================

export class MenuLib {

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	public clone(menu : MenuItem) : MenuItem {

		let copy : MenuItem = {};

		for (let key in menu) {
			if (menu.hasOwnProperty(key)) {
				copy[key] = menu[key];
			}
		}

		return copy;
	}
}

//=============================================================================
