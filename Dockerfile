FROM quay.io/numigi/odoo-public:14.latest
LABEL maintainer="contact@numigi.com"

USER root

# Variable used for fetching private git repositories.
ARG GIT_TOKEN

ENV THIRD_PARTY_ADDONS /mnt/third-party-addons
RUN mkdir -p "${THIRD_PARTY_ADDONS}" && chown -R odoo "${THIRD_PARTY_ADDONS}"

USER odoo

COPY konvergo_theme_base /mnt/extra-addons/konvergo_theme_base

COPY .docker_files/main /mnt/extra-addons/main
COPY .docker_files/odoo.conf /etc/odoo
