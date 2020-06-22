//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {Injectable}  from '@angular/core';

import {HttpService} from "./http-service";

//=============================================================================

@Injectable()
export class LabelService {

	//-------------------------------------------------------------------------
	//---
	//--- Variables
	//---
	//-------------------------------------------------------------------------

	private static TOOLKIT_FILE     : string = "toolkit";
	private static APPLICATION_FILE : string = "application";

	//-------------------------------------------------------------------------

	private labelSet : Map<String, Map<string, any>>;
	private language : string;

	//-------------------------------------------------------------------------

	private languages : string[] = [ "en", "it" ];

	//-------------------------------------------------------------------------
	//---
	//--- Constructor
	//---
	//-------------------------------------------------------------------------

	constructor(private httpService : HttpService) {

		this.labelSet = new Map();
		this.language = "en";

		//--- Load language files

		this.languages.forEach( (language : string) => {
			this.initLanguage(language);
		});
	}

	//-------------------------------------------------------------------------
	//---
	//--- API methods
	//---
	//-------------------------------------------------------------------------

	public setLanguage(language : string) : void {
		this.language = language;
	}

	//-------------------------------------------------------------------------

	public getLabel(entity : string, code : string) : any {

		if (code == null) {
			return null;
		}

		let entitySet = this.getMapping(entity);

		if (entitySet == null) {
			return "?"+entity+"?";
		}

		let label = entitySet[code];

		if (label == null) {
			return entity+".?"+ code +"?";
		}

		return label;
	}

	//-------------------------------------------------------------------------

	public getMapping(entity : string) : Object {

		let labels = this.labelSet.get(this.language);

		if (labels != null) {
			return labels.get(entity);
		}

		//--- Probably, we are still loading data
		return null;
	}

	//-------------------------------------------------------------------------
	//---
	//--- Private methods
	//---
	//-------------------------------------------------------------------------

	private initLanguage(language : string) : void {

		this.loadLanguageFile(language, LabelService.TOOLKIT_FILE);
		this.loadLanguageFile(language, LabelService.APPLICATION_FILE);
	}

	//-------------------------------------------------------------------------

	private loadLanguageFile(language : string, name : string) {

		let file : string = name +"-"+ language +".json";

		this.httpService.getObject("assets/lang/"+ file)
						.subscribe(	result => this.processFile(language, file, result),
									error => console.log("Cannot load labels file : "+ file));
	}

	//-------------------------------------------------------------------------

	private processFile(language : string, file:string, data : Object) : void {

		console.log("Loaded labels file : "+ file);

		let labels = this.labelSet.get(language);

		if (labels == null) {
			labels = new Map();
			this.labelSet.set(language, labels);
		}

		for (let key in data) {
			labels.set(key, data[key]);
		}
	}
}

//=============================================================================
