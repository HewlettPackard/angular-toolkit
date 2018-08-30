//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';

import {ButtonDirective} from "./button.directive";

//=============================================================================

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ButtonDirective
	],
	exports: [
		ButtonDirective
	],
	providers: [
	],
})

//=============================================================================

export class HpeDirectiveModule { }

//=============================================================================
