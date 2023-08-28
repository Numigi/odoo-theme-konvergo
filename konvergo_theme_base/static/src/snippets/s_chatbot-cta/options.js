odoo.define('konvergo_theme_base.s_chatbot-cta_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.ChatbotOption = options.Class.extend({
        start: function () {
            this._super.apply(this, arguments);
            // Add event listener on input
            this.$el.on('change', 'input', (e) => {
                const value = e.target.value;
                this.$target.find('.s_chatbot-cta__chatbot').html(value);
            });
        },

        onBuilt: function () {
            this.$target.addClass(this.$el.find('we-button[data-set-value]:first').data('set-value'));
        },

        setValue: function (name, value, $li) {
            // Manage classes
            this.$target.removeClass('s_chatbot-cta--default s_chatbot-cta--light');

            // Default
            if (value === 's_chatbot-cta--default') {
                this.$target.find('.container').addClass('o_cc o_cc4');
                this.$target.find('.s_chatbot-cta__chatbot').removeClass('col-lg-6');
            }

            // Style 1
            else if (value === 's_chatbot-cta--light') {
                this.$target.removeClass('pt152 pb152').addClass('pt32 pb32');
                this.$target.find('.container').removeClass('o_cc o_cc4');
                this.$target.find('.s_chatbot-cta__chatbot').addClass('col-lg-6');
            }

            // Style 2
            else if (value === 's_chatbot-cta--lightest') {
                this.$target.removeClass('pt152 pb152').addClass('pt32 pb32');
                this.$target.find('.container').removeClass('o_cc o_cc4');
                this.$target.find('.s_chatbot-cta__chatbot').addClass('col-lg-6');
            }
        },
    });
});
