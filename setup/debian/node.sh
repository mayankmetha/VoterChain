echo "[+] Checking Node.js"
if ! type node > /dev/null
then
    echo "[!] Node.js not found"
    echo "[!] Installing Node.js"
    curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
    apt-get install -y nodejs
else
    echo "[+] Node.js found"
fi