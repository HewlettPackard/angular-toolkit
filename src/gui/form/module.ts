//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule}  from '@angular/forms';

import {
	MatCheckboxModule, MatButtonModule
}
from "@angular/material";

import {
	DropdownModule, InputTextModule
}
from "primeng/primeng";

import {HpePanelModule}     from "@hpe/angular-toolkit/gui/panel";
import {HpeDirectiveModule} from "@hpe/angular-toolkit/gui/directive";
import {HpeServiceModule}   from "@hpe/angular-toolkit/service";

import {FormColumn}    from "./form-column/form-column";
import {FormLabel}     from "./form-label/form-label";
import {FormPanel}     from "./form-panel/form-panel";
import {FormText}      from "./form-text/form-text";
import {InputArea}     from "./input-area/input-area";
import {InputCheckbox} from "./input-checkbox/input-checkbox";
import {InputCombo}    from "./input-combo/input-combo";
import {InputText}     from "./input-text/input-text";
import {LoginPanel}    from "./login/login";

//=============================================================================

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		//--- Angular Material

		MatCheckboxModule, MatButtonModule,

		//--- PrimeNG

		DropdownModule, InputTextModule,

		//--- Toolkit

		HpePanelModule,
		HpeDirectiveModule,
		HpeServiceModule
	],
	declarations: [
		FormColumn,
		FormLabel,
		FormPanel,
		FormText,
		InputArea,
		InputCheckbox,
		InputCombo,
		InputText,
		LoginPanel
	],
	exports: [
		FormColumn,
		FormLabel,
		FormPanel,
		FormText,
		InputArea,
		InputCheckbox,
		InputCombo,
		InputText,
		LoginPanel
	],
	providers: [
	],
})

//=============================================================================

export class HpeFormModule { }

//=============================================================================
