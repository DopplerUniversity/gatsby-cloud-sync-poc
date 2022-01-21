#! /usr/bin/env bash

echo -e '\n[info]: initializing gatsby-starter site at ./gatsby-starter\n'

[ ! -d './gatsby-starter' ] && git clone https://github.com/gatsbyjs/gatsby-starter-default.git gatsby-starter
cd gatsby-starter || exit
npm install
cp ../gatsby-starter-overrides/index.js ./src/pages/index.js
cp ../gatsby-starter-overrides/gatsby-config.js ./gatsby-config.js
cd ../