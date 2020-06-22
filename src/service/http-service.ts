//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Injectable}   from "@angular/core";
import {HttpClient}   from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {SafeUrl}      from "@angular/platform-browser";

import {Observable, throwError}    from "rxjs";
import {catchError, map, finalize} from "rxjs/operators";
import {AppEvent, ErrorEvent }     from "@hpe/angular-toolkit/model";

import {EventBusService}           from "./eventbus-service"

//=============================================================================

@Injectable()
export class HttpService {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	private openRequests : number = 0;

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(private httpClient      : HttpClient,
				private eventBusService : EventBusService,
				private domSanitizer    : DomSanitizer ) {}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	public get loading() : boolean {
		return (this.openRequests > 0);
	}

	//-------------------------------------------------------------------------

	public getObject(url : string, options? : any): Observable<any> {

		this.showLoader();

		//--- "Pragma": "no-cache" for IE 11

		let header = {
			"Pragma"        : "no-cache",
			"Cache-Control" : "no-cache",
			"Expires"       : "0"
		};

		return this.httpClient.get(url, { params: options, headers : header }).pipe(
			catchError((error) => this.handleError(error)),
			finalize  (()      => this.hideLoader())
		);
	}

	//-------------------------------------------------------------------------

	public getBlob(url : string, options? : any): Observable<any> {

		this.showLoader();

		//--- Add timestamp to change static url to dynamic for IE 11

		if (options != null) {
			options.ts = Date.now();
		}

        return this.httpClient.get(url, { params: options, responseType : 'blob'}).pipe(
			map(e => this.getSanitizedUrl(URL.createObjectURL(e))),
			catchError((error) => this.handleError(error)),
			finalize(() => this.hideLoader())
		);
	}

	//-------------------------------------------------------------------------

	public postObject(url: string, object: any, options?: any): Observable<any> {

        this.showLoader();

        return this.httpClient.post (url, object, options).pipe(
			catchError((error) => this.handleError(error)),
			finalize  (()      => this.hideLoader())
		);
	}

	//-------------------------------------------------------------------------

	public getSanitizedUrl(url : string): SafeUrl {
		return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
	}

	//-------------------------------------------------------------------------
	//---
	//--- Private methods
	//---
	//-------------------------------------------------------------------------

	private handleError(response : any) : Observable<any> {

		console.log("Got the following HTTP error : " + JSON.stringify(response));

		let error : ErrorEvent;

		if (response.status == 422) {
			//--- Unprocessable entity
			error = response.error;
		}
		else {
			error = {
				code : response.status.toString(),
				error: response.error.toString()
			};
		}

		this.eventBusService.emitToError(error);

		return throwError(error);
	}

	//-------------------------------------------------------------------------

	private showLoader(): void {

		if (++this.openRequests == 1) {
			this.eventBusService.emitToApp(new AppEvent(AppEvent.SUBMIT_START));
		}
	}

	//-------------------------------------------------------------------------

	private hideLoader(): void {

		if (--this.openRequests == 0) {
			this.eventBusService.emitToApp(new AppEvent(AppEvent.SUBMIT_END));
		}
	}
}

//=============================================================================
