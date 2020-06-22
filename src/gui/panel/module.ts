//=============================================================================
//===
//=== (C) Copyright 2018 Hewlett Packard Enterprise Development LP.
//===
//=== Use of this source code is governed by an MIT-style license that can be
//=== found in the LICENSE file
//=============================================================================

import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';

//-----------------------------------------------------------------------------

import {MatCardModule}    from "@angular/material/card";
import {MatButtonModule}  from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";

//-----------------------------------------------------------------------------

import {
	MessageModule, MessagesModule, OverlayPanelModule, PanelMenuModule
}
from "primeng";

//-----------------------------------------------------------------------------

import {ContextMenuModule}    from "primeng/contextmenu";
import {DropdownModule}       from "primeng/dropdown";
import {MultiSelectModule}    from "primeng/multiselect";
import {TableModule}          from "primeng/table";
import {ToastModule}          from "primeng/toast";

import {HpeDirectiveModule}   from "@hpe/angular-toolkit/gui/directive";
import {HpeServiceModule}     from "@hpe/angular-toolkit/service";

//-----------------------------------------------------------------------------

import {ButtonPanel}          from "./button-panel/button-panel";
import {CardPanel}            from "./card-panel/card-panel";
import {GlobalCss}            from "./global-css/global-css";
import {Icon}                 from "./icon/icon";
import {ListPanel}            from "./list-panel/list-panel";
import {ListTable}            from "./list-table/list-table";
import {LoadingSpinner}       from "./toolbar/loading-spinner/loading-spinner";
import {Logo}                 from "./toolbar/logo/logo";
import {MenuButton}           from "./toolbar/menu-button/menu-button";
import {MenuPanel}            from "./menu-panel/menu-panel";
import {MessageToast}         from "./message-toast/message-toast";
import {NotificationButton}   from "./toolbar/notification-button/notification-button";
import {NotificationItem}     from "./toolbar/notification-item/notification-item";
import {RightTitle}           from "./right-title/right-title";
import {RoundedText}          from "./rounded-text/rounded-text";
import {TitleButton}          from "./title-panel/title-button/title-button";
import {TitleIcon}            from "./title-panel/title-icon/title-icon";
import {TitlePanel}           from "./title-panel/title-panel";
import {Toolbar}              from "./toolbar/toolbar";
import {ToolbarButton}        from "./toolbar/toolbar-button/toolbar-button";
import {ToolbarIcon}          from "./toolbar/toolbar-icon/toolbar-icon";
import {ToolbarTitle}         from "./toolbar/toolbar-title/toolbar-title";
import {UserButton}           from "./toolbar/user-button/user-button";

//=============================================================================

@NgModule({
	imports: [
		CommonModule,

		MatCardModule, MatToolbarModule, MatButtonModule,

		MessageModule, MessagesModule, OverlayPanelModule, PanelMenuModule,
		ContextMenuModule, DropdownModule, MultiSelectModule, TableModule, ToastModule,

		HpeDirectiveModule, HpeServiceModule
	],
	declarations: [
		ButtonPanel,
		CardPanel,
		GlobalCss,
		Icon,
		ListPanel,
		ListTable,
		LoadingSpinner,
		Logo,
		MenuButton,
		MenuPanel,
		MessageToast,
		NotificationButton,
		NotificationItem,
		RightTitle,
		RoundedText,
		TitleButton,
		TitleIcon,
		TitlePanel,
		Toolbar,
		ToolbarButton,
		ToolbarIcon,
		ToolbarTitle,
		UserButton
	],
	exports: [
		ButtonPanel,
		CardPanel,
		GlobalCss,
		Icon,
		ListPanel,
		ListTable,
		LoadingSpinner,
		Logo,
		MenuButton,
		MenuPanel,
		MessageToast,
		NotificationButton,
		NotificationItem,
		RightTitle,
		RoundedText,
		TitleButton,
		TitleIcon,
		TitlePanel,
		Toolbar,
		ToolbarButton,
		ToolbarIcon,
		ToolbarTitle,
		UserButton
	],
	providers: [
	],
})

//=============================================================================

export class HpePanelModule { }

//=============================================================================
