/** @odoo-module **/

import { Component } from "@odoo/owl";

export class AppsBar extends Component {}

Object.assign(AppsBar, {
    template: 'theme_konvergo.AppsBar',
    props: {
    	apps: Array,
    },
});

