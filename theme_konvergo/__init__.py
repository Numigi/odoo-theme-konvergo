# Copyright 2025-today Numigi and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from . import models
from odoo import api, SUPERUSER_ID


def _uninstall_cleanup(cr, registry):
    env = api.Environment(cr, SUPERUSER_ID, {})
    env['web_editor.assets'].reset_asset(
        '/theme_konvergo/static/src/colors.scss',
        'web._assets_primary_variables'
    )
