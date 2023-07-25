
from odoo.tests import TransactionCase


class TestModules(TransactionCase):

    def test_main_is_installed(self):
        module = self.env['ir.module.module'].search([('name', '=', 'main')])
        assert module.state == 'installed'
