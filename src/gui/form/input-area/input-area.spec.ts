//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import { TestBed, async } from '@angular/core/testing';

//import { MANIFEST } from '../../../../app-manifest';

import {InputArea} from "./input-area";

//=============================================================================

describe('InputArea', () => {
    //--- Before each test
    beforeEach(() => {
//        TestBed.configureTestingModule(MANIFEST);
    });

    beforeEach(async( () => {
        TestBed.compileComponents();
    }));

    it ('is successfully instantiated', () => {
        let fixture = TestBed.createComponent(InputArea);
        expect(fixture.componentInstance instanceof InputArea).toBe(true, 'should create InputArea');
    });
});

//=============================================================================
