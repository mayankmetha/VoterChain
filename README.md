# VoterChain
blockchain based evoting system

## Commands
### npm start [options]
start program

## Config
1) add firebase config and module export config to js/config.js

2) add firebase config to admin-web/js/config.js

## SSL for HTTPS
run following bash commands in ssl/

`openssl req -new -newkey rsa:2048 -nodes -out mydomain.csr -keyout private.key`

`openssl x509 -signkey private.key -in mydomain.csr -req -days 1000 -out private.crt`
