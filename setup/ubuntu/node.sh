echo "[+] Checking Node.js"
if ! type node > /dev/null 2>&1
then
    echo "[!] Node.js not found"
    echo "[!] Installing Node.js"
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
else
    echo "[+] Node.js found"
fi