# VoterChain
blockchain based evoting system

## Commands
### sudo npm start [mode=admin|client] [browser=chrome|firefox]
start program
### npm start help
help message

## Config
1) add firebase config and module export config to js/config.js

2) add firebase config to admin-web/js/config.js

## SSL for HTTPS
run following bash commands in ssl/

`openssl req -new -newkey rsa:2048 -nodes -out mydomain.csr -keyout private.key`

`openssl x509 -signkey private.key -in mydomain.csr -req -days 1000 -out private.crt`

## SHA256SUM
Run the script

`openssl sha256 filelist.sha256`

Compare its output with

`SHA256(filelist.sha256)= ef6af49cd8429be4ea8821b3d755b844e792556c49b1a78f46ce072c00967bc7`