echo -ne "[\033[0;31m✘\033[0m] NodeJS: Checking"
if ! type node > /dev/null 2>&1
then
    echo -ne "\r[\033[0;31m✘\033[0m] NodeJS: Installing               "
    sudo add-apt-repository -y -r ppa:chris-lea/node.js > /dev/null
    sudo rm -f /etc/apt/sources.list.d/chris-lea-node_js-*.list > /dev/null
    sudo rm -f /etc/apt/sources.list.d/chris-lea-node_js-*.list.save > /dev/null
    wget --quiet -O - https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add - > /dev/null 2>&1
    VERSION=node_9.x
    DISTRO="$(lsb_release -s -c)"
    echo "deb https://deb.nodesource.com/$VERSION $DISTRO main" | sudo tee /etc/apt/sources.list.d/nodesource.list > /dev/null
    echo "deb-src https://deb.nodesource.com/$VERSION $DISTRO main" | sudo tee -a /etc/apt/sources.list.d/nodesource.list > /dev/null
    sudo apt-get update > /dev/null
    sudo apt-get install nodejs -y > /dev/null
    echo -ne "\r[\033[1;32m✔\033[0m] NodeJS: Installed               \n" 
else
    echo -ne "\r[\033[1;32m✔\033[0m] NodeJS: Installed               \n" 
fi