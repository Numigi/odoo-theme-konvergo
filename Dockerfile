FROM quay.io/numigi/odoo-public:12.28
LABEL maintainer="contact@numigi.com"

USER root

# Variable used for fetching private git repositories.
ARG GIT_TOKEN

ENV THIRD_PARTY_ADDONS /mnt/third-party-addons
RUN mkdir -p "${THIRD_PARTY_ADDONS}" && chown -R odoo "${THIRD_PARTY_ADDONS}"

USER odoo

COPY atharva_theme_base /mnt/extra-addons/atharva_theme_base
COPY theme_alan /mnt/extra-addons/theme_alan

COPY .docker_files/main /mnt/extra-addons/main
COPY .docker_files/odoo.conf /etc/odoo
