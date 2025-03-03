/** @odoo-module **/

import { session } from "@web/session";
import { url } from "@web/core/utils/urls";
import { Dropdown } from "@web/core/dropdown/dropdown";

export class AppsMenu extends Dropdown {
    setup() {
        super.setup();

        if (this.env.services.company.currentCompany.has_background_image) {
            this.backgroundImageUrl = url('/web/image', {
                model: 'res.company',
                field: 'background_image',
                id: this.env.services.company.currentCompany.id,
            });
        } else {
            this.backgroundImageUrl = '/theme_konvergo/static/img/background.png';
        }

        this.env.bus.on("ACTION_MANAGER:UI-UPDATED", this, ev => {
            this.close();
            // RESTORE CLASS STATUS
            const menuSections = document.getElementById('menuSections');
            const debugManager = document.querySelector('.o_debug_manager');
            const menuBrand = document.querySelector('.o_menu_brand');
            if (menuSections) {
                menuSections.classList.add('d-md-flex', 'flex-grow-1', 'flex-shrink-1');
                // App Menu Brand
                if (menuBrand) {
                    menuBrand.classList.add('dropdown-item');
                }
                // Debug Mode Manager
                if (debugManager) {
                    debugManager.classList.remove('d-none');
                }
            } else {
                console.error('Element with id "menuSections" not found.');
            }
        });
    }


    onTogglerClick() {
        super.onTogglerClick();
        const togglerButton = document.querySelector('.dropdown-toggle');
        const menuSections = document.getElementById('menuSections');
        const debugManager = document.querySelector('.o_debug_manager');
        const menuBrand = document.querySelector('.o_menu_brand');
        if (togglerButton) {
            const ariaExpanded = togglerButton.getAttribute('aria-expanded');
            if (menuSections) {
                if (ariaExpanded === 'false') {
                    // Menu Section
                    menuSections.classList.remove('d-md-flex', 'flex-grow-1', 'flex-shrink-1');
                    // App Menu Brand
                    if (menuBrand) {
                        menuBrand.classList.remove('dropdown-item');
                    }
                    // Debug Mode Manager
                    if (debugManager) {
                    debugManager.classList.add('d-none');
                    }
                } else {
                    // Menu Section
                    menuSections.classList.add('d-md-flex', 'flex-grow-1', 'flex-shrink-1');
                    // App Menu Brand
                    if (menuBrand) {
                        menuBrand.classList.add('dropdown-item');
                    }
                    // Debug Mode Manager
                    if (debugManager) {
                    debugManager.classList.remove('d-none');
                    }
                }
            } else {
                console.error('Element with id "menuSections" not found.');
            }
        } else {
            console.error('Button with class "dropdown-toggle" not found.');
        }
    }

}

Object.assign(AppsMenu, {
    template: 'theme_konvergo.AppsMenu',
});