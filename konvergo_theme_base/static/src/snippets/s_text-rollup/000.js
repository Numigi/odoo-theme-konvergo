odoo.define('konvergo_theme_base.s_text-rollup', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');

    publicWidget.registry.SnippetScript = publicWidget.Widget.extend({
        selector: '.s_text-rollup',

        start: function () {
            this._super.apply(this, arguments);

            let currentIndex = 0;
            const textItems = $('.s_text-rollup__text');
            const intervalTime = 3000;

            // Cycle through text items and images at regular intervals.
            setInterval(() => {
                textItems.removeClass('s_text-rollup__text--active');
                $('.s_text-rollup__images img').hide();

                currentIndex++;
                if (currentIndex >= textItems.length) currentIndex = 0;

                const activeText = textItems.eq(currentIndex);
                activeText.addClass('s_text-rollup__text--active');
                $('#' + activeText.data('s_text-rollup__img')).show();
            }, intervalTime);

            // Handle click events on text items.
            this.$('.s_text-rollup__text').on('click', (ev) => {
                const $targetText = $(ev.currentTarget);
                textItems.removeClass('s_text-rollup__text--active');
                $('.s_text-rollup__images img').hide();

                $targetText.addClass('s_text-rollup__text--active');
                $('#' + $targetText.data('s_text-rollup__img')).show();
            });
        },
    });

    return publicWidget.registry.SnippetScript;
});
