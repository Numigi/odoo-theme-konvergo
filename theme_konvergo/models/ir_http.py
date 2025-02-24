# Copyright 2025-today Numigi and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import models
from odoo.http import request


class IrHttp(models.AbstractModel):

    _inherit = "ir.http"

    def session_info(self):
        result = super(IrHttp, self).session_info()
        if request.env.user._is_internal():
            for company in request.env.user.company_ids:
                result['user_companies']['allowed_companies'][company.id].update({
                    'has_background_image': bool(company.background_image),
                })
        result['pager_autoload_interval'] = int(
            self.env['ir.config_parameter'].sudo().get_param(
                'theme_konvergo.autoload', default=30000
            )
        )
        return result
