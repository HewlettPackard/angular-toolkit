//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Component, Input}  from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

import {InputText} from "../input-text/input-text";

//=============================================================================

@Component({
    selector:      'hpe-input-area',
    templateUrl: './input-area.html',
    styleUrls:  ['./input-area.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputArea,
        multi: true
    }]
})

//=============================================================================

export class InputArea extends InputText {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

    @Input() height: string;

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
