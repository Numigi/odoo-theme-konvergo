# Copyright 2025-today Numigi and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

import re

from odoo import models


class ScssEditor(models.AbstractModel):

    _inherit = 'web_editor.assets'

    def _get_theme_variable(self, content, variable):
        regex = r'{0}\:?\s(.*?);'.format(variable)
        value = re.search(regex, content)
        return value and value.group(1)

    def _get_theme_variables(self, content, variables):
        return {var: self._get_theme_variable(content, var) for var in variables}

    def _replace_theme_variables(self, content, variables):
        for variable in variables:
            variable_content = '{0}: {1};'.format(
                variable['name'],
                variable['value']
            )
            regex = r'{0}\:?\s(.*?);'.format(variable['name'])
            content = re.sub(regex, variable_content, content)
        return content

    def get_theme_variables_values(self, url, bundle, variables):
        custom_url = self._make_custom_asset_url(url, bundle)
        content = self._get_content_from_url(custom_url)
        if not content:
            content = self._get_content_from_url(url)
        return self._get_theme_variables(content.decode('utf-8'), variables)

    def replace_theme_variables_values(self, url, bundle, variables):
        original = self._get_content_from_url(url).decode('utf-8')
        content = self._replace_theme_variables(original, variables)
        self.with_context(theme_variables=True).save_asset(
            url, bundle, content, 'scss'
        )
