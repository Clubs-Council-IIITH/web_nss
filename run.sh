#!/bin/bash

# Write environment variables to .env file
cat << EOF > ./web/.env
GRAPHQL_ENDPOINT="https://clubs.iiit.ac.in/graphql"
NEXT_PUBLIC_FILESERVER_URL="https://clubs.iiit.ac.in"
NEXT_PUBLIC_STATIC_URL="https://clubs.iiit.ac.in/static"
NEXT_PUBLIC_CLUB_ID="hacking.club"
EOF

# IP_ADDRESS=$(hostname -I | awk '{print $1}')
# cat << EOF > ./web/.env
# GRAPHQL_ENDPOINT="http://${IP_ADDRESS}/graphql"
# NEXT_PUBLIC_FILESERVER_URL="http://${IP_ADDRESS}"
# NEXT_PUBLIC_STATIC_URL="http://${IP_ADDRESS}/static"
# NEXT_PUBLIC_CLUB_ID="osdg"
# EOF

# cd web
# npm i
# cd ..

docker compose -p nss-web up --build

docker compose -p nss-web down
