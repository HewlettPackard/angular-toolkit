//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

export class Credentials {
	username: string;
	password: string;
}

//=============================================================================
//--- User session returned by login

export class Session {
	token   : string;
	user    : SessionUser;
	profile : Profile;
}

//=============================================================================

export class SessionUser {
	id        : number;
	username  : string;
	name      : string;
	lastLogin : string;
	language  : string;
}

//=============================================================================

export class Profile {
	code		: string;
	name        : string;
	homePage    : string;
	permissions : string[];
}

//=============================================================================
