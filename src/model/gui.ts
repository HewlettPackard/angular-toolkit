//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

//=============================================================================
//===
//=== Menu objects
//===
//=============================================================================

export type EventCallback = (event : any) => void;

//=============================================================================

export class Menu {
	id?      : string;
	icon?    : string;
	label    : string;
	expanded?: boolean;
	disabled?: boolean;
	visible? : boolean;
	command? : EventCallback;
	items?   : Menu[];
}

//=============================================================================
//===
//=== User interface objects
//===
//=============================================================================

export class ListTableColumn {

	field        : string;
	header?      : string;
	filter?      : string;

	transcoder?  : Transcoder;
	alignment?   : string;
	styler?      : Styler;

	//--- Internal

	displayHeader?   : string;
	filterMatchMode? : string;
}

//=============================================================================

export interface Transcoder {
	transcode(value : any, row? : any) : string;
}

//=============================================================================

export interface Styler {
	style(value : any, row? : any) : CellStyle;
}

//=============================================================================

export class CellStyle {
	icon?       : string;
	extraClass? : string;
}

//=============================================================================

export class DropdownItem {
	value : any;
	label : string;
}

//=============================================================================

export class RowSelectedEvent {
	constructor(public row  : any,
	            public rows : any[]) {}
}

//=============================================================================

export class RowUnselectedEvent {
	constructor(public row  : any,
	            public rows : any[]) {}
}

//=============================================================================

export class FilterChangeEvent {
	constructor(public filteredSize : number) {}
}

//=============================================================================

export interface MenuSelector {
	select(menuId : string, event : RowSelectedEvent) : MenuSelectionMode;
}

//=============================================================================

export enum MenuSelectionMode {
	INLCUDE,
	EXCLUDE,
	DISABLE
}

//=============================================================================
