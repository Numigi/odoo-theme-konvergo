/** @odoo-module **/

import { patch } from '@web/core/utils/patch';

import { NavBar } from '@web/webclient/navbar/navbar';
import { AppsMenu } from "@theme_konvergo/webclient/appsmenu/appsmenu";
import { AppsSearch } from "@theme_konvergo/webclient/appssearch/appssearch";
import { AppsBar } from '@theme_konvergo/webclient/appsbar/appsbar';

patch(NavBar.prototype, 'theme_konvergo.NavBar', {
	getAppsMenuItems(apps) {
	    const currentApp = this.menuService.getCurrentApp();
		return apps.map((menu) => {
			const appsMenuItem = {
				id: menu.id,
				name: menu.name,
				xmlid: menu.xmlid,
				appID: menu.appID,
				actionID: menu.actionID,
				href: this.getMenuItemHref(menu),
				action: () => this.menuService.selectMenu(menu),
				active: currentApp && menu.id === currentApp.id,
			};
		    if (menu.webIconData) {
		        const prefix = (
		        	menu.webIconData.startsWith('P') ? 
	    			'data:image/svg+xml;base64,' : 
					'data:image/png;base64,'
	            );
		        appsMenuItem.webIconData = (
	    			menu.webIconData.startsWith('data:image') ? 
					menu.webIconData : 
					prefix + menu.webIconData.replace(/\s/g, '')
	            );
		    }
			return appsMenuItem;
		});
    },
});

patch(NavBar, 'theme_konvergo.NavBar', {
    components: {
        ...NavBar.components,
        AppsMenu,
        AppsSearch,
        AppsBar,
    },
});
