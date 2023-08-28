odoo.define('konvergo_theme_base.s_product-range-hero_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.ProductRangeHeroOption = options.Class.extend({
        start: function () {
            this._super.apply(this, arguments);
        },

        onBuilt: function () {
            this.$target.addClass(this.$el.find('we-button[data-set-value]:first').data('set-value'));
        },

        setValue: function (name, value, $li) {
            // Manage classes
            this.$target.removeClass('s_product-range-hero--default');
        },
    });
});
