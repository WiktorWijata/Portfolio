#!/bin/bash
set -e

mkdir -p config

# DbMigrator
export DB_HOST DB_PORT DB_PASSWORD
envsubst '${DB_HOST}${DB_PORT}${DB_PASSWORD}' \
  < templates/migrator/appsettings.Production.json \
  > config/migrator.appsettings.Production.json

# API
export DB_HOST DB_PORT DB_PASSWORD CORS_ALLOWED_ORIGIN INTEGRATORAI_BASE_URL INTEGRATORAI_CONTEXT_PL INTEGRATORAI_CONTEXT_EN
envsubst '${DB_HOST}${DB_PORT}${DB_PASSWORD}${CORS_ALLOWED_ORIGIN}${INTEGRATORAI_BASE_URL}${INTEGRATORAI_CONTEXT_PL}${INTEGRATORAI_CONTEXT_EN}' \
  < templates/api/appsettings.Production.json \
  > config/api.appsettings.Production.json
