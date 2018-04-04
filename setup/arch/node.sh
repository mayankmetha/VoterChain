echo "[+] Checking Node.js"
if ! type node > /dev/null
then
    echo "[!] Node.js not found"
    echo "[!] Installing Node.js"
    sudo pacman -S nodejs npm
else
    echo "[+] Node.js found"
fi