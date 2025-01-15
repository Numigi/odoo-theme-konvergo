/** @odoo-module **/

import { Component } from "@odoo/owl";

export class AppsBar extends Component {}

Object.assign(AppsBar, {
    template: 'konvergo_erp_theme.AppsBar',
    props: {
    	apps: Array,
    },
});

