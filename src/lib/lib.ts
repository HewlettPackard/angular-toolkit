//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {StringLib} from "./string-lib";
import {MenuLib}   from "./menu-lib";

//=============================================================================

export class Lib {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	public static str = new StringLib();
	public static menu= new MenuLib();
}

//=============================================================================
