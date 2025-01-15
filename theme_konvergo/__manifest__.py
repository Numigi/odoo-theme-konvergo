
{
    'name': 'Konvergo ERP Theme', 
    'summary': 'Konvergo ERP Theme',
    'version': '16.0.0',
    'category': 'Themes/Backend', 
    'license': 'LGPL-3', 
    'author': 'Konvergo',
    'website': 'https://www.konvergo.com',
    'contributors': [
        'Kapreon <contact@kapreon.com>',
        'Konvergo <contact@konvergo.com>',
    ],
    'depends': [
        'base_setup',
        'web_editor',
        'mail',
    ],
    'excludes': [
        'web_enterprise',
    ],
    'data': [
        'templates/webclient.xml',
        'views/res_config_settings.xml',
        'views/res_users.xml',
    ],
    'assets': {
        'web._assets_primary_variables': [
            (
                'after', 
                'web/static/src/scss/primary_variables.scss', 
                'konvergo_erp_theme/static/src/colors.scss'
            ),
        ],
        'web._assets_backend_helpers': [
            'konvergo_erp_theme/static/src/variables.scss',
            'konvergo_erp_theme/static/src/mixins.scss',
        ],
        'web.assets_backend': [
            'konvergo_erp_theme/static/src/core/**/*.xml',
            'konvergo_erp_theme/static/src/core/**/*.scss',
            'konvergo_erp_theme/static/src/core/**/*.js',
            'konvergo_erp_theme/static/src/webclient/**/*.xml',
            'konvergo_erp_theme/static/src/webclient/**/*.scss',
            'konvergo_erp_theme/static/src/webclient/**/*.js',
            'konvergo_erp_theme/static/src/views/**/*.scss',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
    'uninstall_hook': '_uninstall_cleanup',
}
