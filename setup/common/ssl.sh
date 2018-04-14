echo -ne "\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m SSL            \033[0m\033[1;37m:\033[0m\033[1;36m Checking\033[0m"
if [[ ! -d "$1/ssl" ]]
then
    mkdir $1/ssl
fi
if [[ ! -f "$1/ssl/mydomain.csr" || ! -f "$1/ssl/private.key" || ! -f "$1/ssl/private.crt" ]] 
then
    echo -ne "\r\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m SSL            \033[0m\033[1;37m:\033[0m\033[1;36m Generating\033[0m                       "    
    openssl req -new -newkey rsa:2048 -nodes -out "$1/ssl/mydomain.csr" -keyout "$1/ssl/private.key" -subj "/CN=VoterChain" > /dev/null 2>&1
    openssl x509 -signkey "$1/ssl/private.key" -in "$1/ssl/mydomain.csr" -req -days 1000 -out "$1/ssl/private.crt" > /dev/null 2>&1
    echo -ne "\r\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m SSL            \033[0m\033[1;37m:\033[0m\033[1;36m Generated\033[0m                         \n"  

else
    echo -ne "\r\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m SSL            \033[0m\033[1;37m:\033[0m\033[1;36m Generated\033[0m                         \n"  
fi