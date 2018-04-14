echo -ne "\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m NodeJS         \033[0m\033[1;37m:\033[0m\033[1;36m Checking\033[0m"
if ! type node > /dev/null 2>&1
then
    echo -ne "\r\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m NodeJS         \033[0m\033[1;37m:\033[0m\033[1;36m Installing\033[0m                       "
    sudo apt-get update > /dev/null
    sudo apt-get install software-properties-common > /dev/null
    sudo add-apt-repository -y -r ppa:chris-lea/node.js > /dev/null
    sudo rm -f /etc/apt/sources.list.d/chris-lea-node_js-*.list > /dev/null
    sudo rm -f /etc/apt/sources.list.d/chris-lea-node_js-*.list.save > /dev/null
    wget --quiet -O - https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add - > /dev/null 2>&1
    VERSION=node_9.x
    DISTRO="$(lsb_release -s -c)"
    echo "deb https://deb.nodesource.com/$VERSION $DISTRO main" | sudo tee /etc/apt/sources.list.d/nodesource.list > /dev/null
    echo "deb-src https://deb.nodesource.com/$VERSION $DISTRO main" | sudo tee -a /etc/apt/sources.list.d/nodesource.list > /dev/null
    sudo apt-get update > /dev/null
    sudo apt-get install nodejs -y > /dev/null 2>&1
    echo -ne "\r\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m NodeJS         \033[0m\033[1;37m:\033[0m\033[1;36m Installed\033[0m                         \n" 
else
    echo -ne "\r\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m NodeJS         \033[0m\033[1;37m:\033[0m\033[1;36m Installed\033[0m                         \n"  
fi