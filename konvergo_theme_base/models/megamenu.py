# Copyright 2024 Numigi (tm) and all its contributors (https://bit.ly/numigiens)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import api, fields, models
from odoo.tools.translate import html_translate


class MixedLinks(models.Model):
    _name = "megamenu.links"
    _description = "Website Megamenu Mixed Links"

    link_type = fields.Selection(
        selection=[
            ("website.page", "Page"),
        ],
        string="Link Type",
        default="website.page",
    )
    name = fields.Char(string="Name", translate=True)
    link_pages = fields.Many2one(
        "website.page", string="Page Name", domain=[("website_published", "=", True)]
    )
    url = fields.Char(string="URL", default="#")
    description = fields.Char(string="Description", translate=True)
    pos_row = fields.Integer(string="Row-Position")
    pos_column = fields.Integer(string="Column-Position")
    image = fields.Binary(string="Image", store=True)
    image_name = fields.Char(string="Image Name")
    megamenu_id = fields.Many2one("megamenu.content", string="Mega Menu")

    @api.onchange("link_type")
    def setRelationSelection(self):
        self.update(
            {
                "link_pages": None,
                "url": None,
                "name": None,
            }
        )

    @api.onchange("link_pages")
    def setNameUrl(self):
        """set name URL in website megamenu options"""
        if self.link_type == "website.page":
            if self.link_pages:
                self.update({"name": self.link_pages.name, "url": self.link_pages.url})
            else:
                self.update({"name": None, "url": None})
        else:
            self.update({"name": None, "url": None})


class ContentSectionGroup(models.Model):
    _name = "megamenu.content_section"
    _description = "Website Megamenu HTML Content Section"

    name = fields.Char(string="Name", translate=True)
    content_section_pos = fields.Integer(string="Content Section Position")
    content_html = fields.Html(string="Content HTML", translate=html_translate)
    megamenu_id = fields.Many2one("megamenu.content", string="Mega Menu")


class ColumnHeadline(models.Model):
    _name = "megamenu.column_headline"
    _description = "Website Megamenu Column Heading"

    name = fields.Char(string="Title", translate=True, required=True)
    headline_link = fields.Char(string="Headline Link")
    description = fields.Text(string="Description")
    pos_column = fields.Integer(string="Column-Position")
    megamenu_id = fields.Many2one("megamenu.content", string="Mega Menu")

class MegamenuContent(models.Model):
    _name = "megamenu.content"
    _description = "Website Megamenu Content"

    has_label = fields.Boolean()
    label_text = fields.Char()
    label_bg_color = fields.Char(string="Label bgcolor")
    label_text_color = fields.Char(string="Label text color")

    name = fields.Char(string="Content Name", translate=True)
    active = fields.Boolean(string="Active", default=True)
    is_header = fields.Boolean(string="Header")
    is_footer = fields.Boolean(string="Footer")
    main_content_type = fields.Selection(
        [
            ("mixed_list", "Mixed Listing"),
        ],
        string="Content Type",
    )
    no_of_columns = fields.Selection(
        [("1", "1"), ("2", "2"), ("3", "3"), ("4", "4"), ("5", "5"), ("6", "6")],
        string="Number of Columns",
    )
    header_content = fields.Html(string="Header Content", translate=html_translate)
    footer_content = fields.Html(string="Footer Content", translate=html_translate)

    menu_content = fields.Html(string="Content", translate=html_translate)
    background_image = fields.Binary(string="Background Image")
    background_image_pos = fields.Selection(
        selection=[("left", "Left"), ("right", "Right")],
        string="Background Image Position",
        default="left",
    )
    link_ids = fields.One2many("megamenu.links", "megamenu_id", string="Linked Item")
    content_section_ids = fields.One2many(
        "megamenu.content_section", "megamenu_id", string="Content Sections"
    )
    column_headline_ids = fields.One2many(
        "megamenu.column_headline", "megamenu_id", string="Column Headlines"
    )
    slider_image_option = fields.Selection(
        [("slider", "Slider"), ("image", "Image")],
        string="Show Image/Slider",
        default="image",
    )
    slider_image_position = fields.Integer(string="Column-Position")

    image_img = fields.Binary(string="Image", store=True)
    image_name = fields.Char(string="Image Name")
    image_title = fields.Char(string="Title")
    image_link = fields.Char(string="Link")
    image_desc = fields.Char(string="Short Description")
    megamenu_slider = fields.One2many(
        "megamenu_slider", "megamenu_id", string="Slider Lines"
    )
    slider_speed = fields.Char(string="Slider Speed")
    slider_header = fields.Char(string="Name")


class Megamenu_slider(models.Model):
    _name = "megamenu_slider"
    _description = "Megamenu Slider"

    slider_image_img = fields.Binary(string="Image", store=True)
    slider_image_name = fields.Char(string="Image Name")
    slider_image_title = fields.Char(string="Title")
    slider_image_link = fields.Char(string="Link")
    slider_image_desc = fields.Char(string="Short Description")
    megamenu_id = fields.Many2one("megamenu.content", string="Mega Menu")


class website_menu(models.Model):
    _inherit = "website.menu"

    is_dynamic_mega_menu = fields.Boolean(string="Dynamic Mega Menu")
    content_id = fields.Many2one("megamenu.content", string="Content")
    parent_id = fields.Many2one(
        "website.menu",
        "Parent Menu",
        index=True,
        ondelete="cascade",
        domain=[("is_dynamic_mega_menu", "=", False)],
    )
