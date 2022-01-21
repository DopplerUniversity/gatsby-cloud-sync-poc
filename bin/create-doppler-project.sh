#!/usr/bin/env bash

set -e

./bin/doppler-cli-check.sh

echo -e '\n[info]: Creating "gatsby-cloud-sync" project'
doppler import
doppler setup --no-interactive --silent

doppler secrets delete GATSBY_API_URL GATSBY_AUTH_TOKEN GATSBY_SITE_ID --config dev -y --silent
doppler secrets delete GATSBY_API_URL GATSBY_AUTH_TOKEN GATSBY_SITE_ID --config build -y --silent
doppler secrets delete GATSBY_API_URL GATSBY_AUTH_TOKEN GATSBY_SITE_ID --config prev -y --silent
doppler secrets delete CONTENTFUL_ACCESS_TOKEN SITE_TITLE SITE_DESCRIPTION --config gatsby-cloud -y --silent

echo -e '\n[info]: Opening the Doppler dashboard to enter Gatsby auth token and site id'
sleep 1
doppler open dashboard --config gatsby-cloud
