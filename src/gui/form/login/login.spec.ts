//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import { TestBed, async } from '@angular/core/testing';

//import { MANIFEST } from '../../../app-manifest';

import { LoginPanel }   from './login';

//=============================================================================

describe('LoginPanel', () => {
	//--- Before each test
	beforeEach(() => {
//		TestBed.configureTestingModule(MANIFEST);
	});

	beforeEach(async( () => {
		TestBed.compileComponents();
	}));

	it ('is successfully instantiated', () => {
		let fixture = TestBed.createComponent(LoginPanel);
		expect(fixture.componentInstance instanceof LoginPanel).toBe(true, 'should create LoginPanel');
	});
});

//=============================================================================
