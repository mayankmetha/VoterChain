echo "[+] Checking Node.js"
if ! type node > /dev/null
then
    echo "[!] Node.js not found"
    echo "[!] Installing Node.js"
    sudo eopkg install nodejs
else
    echo "[+] Node.js found"
fi