echo -ne "\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m NodeJS         \033[0m\033[1;37m:\033[0m\033[1;36m Checking\033[0m"
if ! type node > /dev/null 2>&1
then
    echo -ne "\r\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m NodeJS         \033[0m\033[1;37m:\033[0m\033[1;36m Installing\033[0m                       "
    curl -sL https://deb.nodesource.com/setup_9.x | bash - > /dev/null 2>&1
    apt-get install -y nodejs > /dev/null 2>&1
    echo -ne "\r\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m NodeJS         \033[0m\033[1;37m:\033[0m\033[1;36m Installed\033[0m                         \n" 
else
    echo -ne "\r\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m NodeJS         \033[0m\033[1;37m:\033[0m\033[1;36m Installed\033[0m                         \n"  
fi