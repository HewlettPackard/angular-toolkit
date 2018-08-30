//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import { TestBed, async } from '@angular/core/testing';

import {MenuButton} from './menu-button';

//=============================================================================

describe('MenuButton', () => {
	//--- Before each test
	beforeEach(() => {
//		TestBed.configureTestingModule(MANIFEST);
	});

	beforeEach(async( () => {
		TestBed.compileComponents();
	}));

	it ('is successfully instantiated', () => {
		let fixture = TestBed.createComponent(MenuButton);
		expect(fixture.componentInstance instanceof MenuButton).toBe(true, 'should create MenuButton');
	});
});

//=============================================================================
