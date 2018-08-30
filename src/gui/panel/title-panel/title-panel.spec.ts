//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import { TestBed, async } from '@angular/core/testing';

//import { MANIFEST } from '../../../app-manifest';

import { TitlePanel }   from './title-panel';

//=============================================================================

describe('TitlePanel', () => {
	//--- Before each test
	beforeEach(() => {
//!		TestBed.configureTestingModule(MANIFEST);
	});

	beforeEach(async( () => {
		TestBed.compileComponents();
	}));

	it ('is successfully instantiated', () => {
		let fixture = TestBed.createComponent(TitlePanel);
		expect(fixture.componentInstance instanceof TitlePanel).toBe(true, 'should create TitlePanel');
	});
});

//=============================================================================
