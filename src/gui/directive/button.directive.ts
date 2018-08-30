//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {AfterViewInit, Directive, ElementRef} from '@angular/core';

//=============================================================================

@Directive({ selector: '[hpeButton]' })

//=============================================================================

export class ButtonDirective implements AfterViewInit {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(public el: ElementRef) {}

	//-------------------------------------------------------------------------
	//---
	//--- Lifecycle methods
	//---
	//-------------------------------------------------------------------------

	ngAfterViewInit() {

		let button : any = this.el.nativeElement;

		if (button.tagName && button.tagName == "BUTTON") {
			this.setStyle(button);
		}
		else {
			let collection : HTMLCollection = button.children;

			if (collection && collection.length > 0) {
				button = collection.item(0);
				this.setStyle(button);
			}
		}
	}

	//-------------------------------------------------------------------------
	//---
	//--- Private methods
	//---
	//-------------------------------------------------------------------------

	private setStyle(button : any) {

		button.style.backgroundColor = "#00A982";
		button.style.fontWeight      = "bold";
		button.style.height          = "2.5rem";
		button.style.color           = "white";
		button.style.marginLeft      = "1rem";
		button.style.marginRight     = "1rem";
	}
}

//=============================================================================
