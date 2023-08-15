# -*- coding: utf-8 -*-
{
    "name": "Thème Konvergo",
    "category": "Theme",
    "version": "1.0",
    'license': 'LGPL-3',
    'summary': 'Thème pour le site web de Konvergo',
    'author': 'Kapreon',
    'support': 'contact@numigi.com',
    "website": "https://www.konvergo.com",
    "depends": [
        'base',
        'web',
        'website',
        'konvergo_theme_base',
    ],
    'images': [
        'static/description/hero.png',
    ],
    "data": [
        'views/assets.xml',
        'views/templates/footer.xml',
        'views/templates/404.xml',
        'views/templates/product-konvergo-bot.xml',
        'security/ir.model.access.csv',
    ],
    'installable': True,
    'auto_install': False,
    'application': False,
}
