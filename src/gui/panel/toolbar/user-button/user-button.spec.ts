//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import { TestBed, async } from '@angular/core/testing';

//import { MANIFEST } from '../../../../app-manifest';

import { UserButton }   from './user-button';

//=============================================================================

describe('UserButton', () => {
	//--- Before each test
	beforeEach(() => {
		TestBed.configureTestingModule(MANIFEST);
	});

	beforeEach(async( () => {
		TestBed.compileComponents();
	}));

	it ('is successfully instantiated', () => {
		let fixture = TestBed.createComponent(UserButton);
		expect(fixture.componentInstance instanceof UserButton).toBe(true, 'should create UserButton');
	});
});

//=============================================================================
