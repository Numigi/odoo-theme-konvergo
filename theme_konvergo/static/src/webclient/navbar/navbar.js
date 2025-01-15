/** @odoo-module **/

import { patch } from '@web/core/utils/patch';

import { NavBar } from '@web/webclient/navbar/navbar';
import { AppsMenu } from "@konvergo_erp_theme/webclient/appsmenu/appsmenu";
import { AppsSearch } from "@konvergo_erp_theme/webclient/appssearch/appssearch";
import { AppsBar } from '@konvergo_erp_theme/webclient/appsbar/appsbar';

patch(NavBar.prototype, 'konvergo_erp_theme.NavBar', {
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

patch(NavBar, 'konvergo_erp_theme.NavBar', {
    components: {
        ...NavBar.components,
        AppsMenu,
        AppsSearch,
        AppsBar,
    },
});
