echo "[+] Checking Node.js"
node -v > /dev/null
if [ $? -ne 0 ]
then
    echo "[!] Node.js not found"
    echo "[!] Installing Node.js"
    curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "[+] Node.js found"
fi