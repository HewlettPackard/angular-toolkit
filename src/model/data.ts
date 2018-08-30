//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Observable} from "rxjs/internal/Observable";

//=============================================================================

export class ServiceResult<T = any> {
	constructor(public results:T[], public overflow:boolean = false){
	}
}

//=============================================================================

export type ListBackendService<T> = (params? : any) => Observable<ServiceResult<T>>;

//=============================================================================

