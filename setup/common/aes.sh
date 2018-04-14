echo -ne "\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m CryptoKey\033[0m\033[1;37m:\033[0m\033[1;36m Checking\033[0m"
if [[ ! -f "$1/ssl/blockchain.key" ]]
then
    echo -ne "\r\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m CryptoKey\033[0m\033[1;37m:\033[0m\033[1;36m Generating\033[0m                       "    
    pass="`openssl rand -base64 12`"
    openssl enc -aes-256-cfb -P -k $pass -md sha256 | tail -2 | head -1 | cut -d"=" -f2 > "$1/ssl/blockchain.key"
    echo -ne "\r\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m CryptoKey\033[0m\033[1;37m:\033[0m\033[1;36m Generated\033[0m                         \n"      
else
    echo -ne "\r\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m CryptoKey\033[0m\033[1;37m:\033[0m\033[1;36m Generated\033[0m                         \n"      
fi