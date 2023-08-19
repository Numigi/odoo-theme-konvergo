odoo.define('konvergo_theme_base.s_solutions-caroussel_options', function (require) {
    'use strict';

    const options = require('web_editor.snippets.options');

    options.registry.SlideOption = options.Class.extend({
        start: function () {
            var self = this;
            this._super.apply(this, arguments);

            this.updateSlideCount();  // Initial update

            // Buttons events listeners
            this.$el.on('click', '[data-add-slide]', this.addSlide.bind(this));
            this.$el.on('click', '[data-remove-slide]', this.removeSlide.bind(this));

            this.$target.find('.carousel-control-prev, .carousel-control-next').on('click', this._onCarouselControlClick.bind(this));
        },

        updateSlideCount: function () {
            var slideCount = this.$target.find('.carousel-item:not(.carousel-item-hidden)').length;
            this.$el.find('.slide-count').text(slideCount);
        },

        onBuilt: function () {
            this._super.apply(this, arguments);
            this.updateSlideCount();
        },

        onDestroy: function () {
            this._super.apply(this, arguments);
            this.updateSlideCount();
        },

        addSlide: function (previewMode, value, $opt) {
            if (value !== 'true') return;

            const $hiddenSlide = this.$target.find('.carousel-item-hidden');
            const $newSlide = $hiddenSlide.clone().removeClass('carousel-item-hidden');
            this.$target.find('.carousel-inner').append($newSlide);
            this._resequenceSlides();
            this.updateSlideCount();  // Update Counter
        },

        removeSlide: function (previewMode, value, $opt) {
            if (value !== 'true') return;

            const $slides = this.$target.find('.carousel-item:not(.carousel-item-hidden)');
            if ($slides.length > 1) {
                const $lastSlide = $slides.last();
                $lastSlide.remove();
                this._resequenceSlides();
                this.updateSlideCount();
            } else {
                alert("Vous ne pouvez pas supprimer la dernière slide !");
            }
        },

        _resequenceSlides: function () {
            const $indicators = this.$target.find('.carousel-indicators');
            const $slides = this.$target.find('.carousel-item:not(.carousel-item-hidden)');
            const $activeSlide = this.$target.find('.carousel-item.active');

            if ($indicators.length) {
                $indicators.empty();

                $slides.each(function (index) {
                    const $indicator = $('<li></li>').attr('data-slide-to', index);
                    if ($(this).hasClass('active')) {
                        $indicator.addClass('active');
                    }
                    $indicators.append($indicator);
                });
            }
        },

        _onCarouselControlClick: function (ev) {
            ev.preventDefault();

            const $slides = this.$target.find('.carousel-item:not(.carousel-item-hidden)');
            const $activeSlide = this.$target.find('.carousel-item.active:not(.carousel-item-hidden)');
            let $newActiveSlide;

            if ($(ev.currentTarget).hasClass('carousel-control-prev')) {
                $newActiveSlide = $activeSlide.prev('.carousel-item:not(.carousel-item-hidden)');
                if (!$newActiveSlide.length) {
                    $newActiveSlide = $slides.last();
                }
            } else if ($(ev.currentTarget).hasClass('carousel-control-next')) {
                $newActiveSlide = $activeSlide.next('.carousel-item:not(.carousel-item-hidden)');
                if (!$newActiveSlide.length) {
                    $newActiveSlide = $slides.first();
                }
            }

            if ($newActiveSlide && $newActiveSlide.length) {
                $activeSlide.removeClass('active');
                $newActiveSlide.addClass('active');
            }
        },
    });
});
