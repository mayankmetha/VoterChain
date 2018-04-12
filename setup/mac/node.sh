echo "[+] Check Homebrew"
if ! type brew > /dev/null 2>&1
then
    echo "[!] Homebrew not found"
    echo "[!] Installing Homebrew"
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    echo "[+] Homebrew found"
fi
echo "[+] Checking Node.js"
if ! type node > /dev/null 2>&1
then
    echo "[!] Node.js not found"
    echo "[!] Installing Node.js"
    brew install node
else
    echo "[+] Node.js found"
fi