#! /usr/bin/env bash

# NOTE: Doppler CLI support for ephemeral secrets via named pipes will be released in Q1, 2022

DEVELOPMENT_ENV_PATH='.env.development'
[ ! -d './gatsby-starter' ] && ./bin/gatsby-starter-init.sh

cd gatsby-starter || exit

cleanup_secrets_file() {
  echo -e "\n[info]: cleaning up $DEVELOPMENT_ENV_PATH"
  rm -f $DEVELOPMENT_ENV_PATH
}

# Use Doppler CLI secrets mount if supported
echo -e "\n[info]: trying Doppler CLI ephemeral $DEVELOPMENT_ENV_PATH\n"
doppler run --mount .env.development --mount-format env -- gatsby develop 2> /dev/null

if [ $? -eq 1 ]
then
  echo -e "[info]: falling back to using downloaded ephemeral $DEVELOPMENT_ENV_PATH\n"
  trap "cleanup_secrets_file" EXIT
  doppler secrets download --no-file --format env > $DEVELOPMENT_ENV_PATH
fi

gatsby develop
