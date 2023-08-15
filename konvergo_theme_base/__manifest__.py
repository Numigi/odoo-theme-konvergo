# -*- coding: utf-8 -*-
{
    "name": "Thème Konvergo Base",
    "category": "Base",
    "version": "1.0",
    'license': 'LGPL-3',
    'summary': 'Module de base pour le thème Konvergo',
    'author': 'Kapreon',
    'support': 'contact@numigi.com',
    "website": "https://www.konvergo.com",
    "depends": [
        'base',
        'web',
        'website',
    ],

    'data': [
        'views/assets.xml',
        'views/snippets/snippets.xml',
        'views/snippets/s_apps-caroussel.xml',
        'views/snippets/s_hero-three-ctas.xml',
        'views/snippets/s_key-functionalities.xml',
        'views/snippets/s_product-compare.xml',
        'views/snippets/s_product-faq.xml',
        'views/snippets/s_product-hero.xml',
        'views/snippets/s_security.xml',
        'views/snippets/s_start-steps.xml',
    ],
    'installable': True,
    'auto_install': False,
    'application': True,
}