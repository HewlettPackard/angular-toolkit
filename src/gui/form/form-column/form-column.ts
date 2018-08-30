//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component, Input} from '@angular/core';

//=============================================================================

@Component({
	selector    :     'hpe-form-column',
	templateUrl :   './form-column.html',
	styleUrls   : [ './form-column.scss' ],
})

//=============================================================================

export class FormColumn    {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	@Input() width : string;
}

//=============================================================================
