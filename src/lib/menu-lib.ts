//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Menu} from "@hpe/angular-toolkit/model";

//=============================================================================

export class MenuLib {

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	public clone(menu : Menu) : Menu {

		let m = new Menu();

		m.id       = menu.id;
		m.icon     = menu.icon;
		m.label    = menu.label;
		m.expanded = menu.expanded;
		m.command  = menu.command;
		m.expanded = menu.expanded;
		m.visible  = menu.visible;

		return m;
	}
}

//=============================================================================
