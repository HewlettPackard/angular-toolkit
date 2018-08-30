//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component}         from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {InputText}         from "../input-text/input-text";

//=============================================================================

@Component({
	selector    :     'hpe-input-checkbox',
	templateUrl :   './input-checkbox.html',
	styleUrls   : [ './input-checkbox.scss' ],
	providers   : [ {
		provide    : NG_VALUE_ACCESSOR,
		useExisting: InputCheckbox,
		multi      : true
	}]
})

//=============================================================================

export class InputCheckbox extends InputText {

    //-------------------------------------------------------------------------
    //---
    //--- Constructor
    //---
    //-------------------------------------------------------------------------

    constructor() {
        super();
    }
}

//=============================================================================
