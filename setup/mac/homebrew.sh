echo "[+] Check Homebrew"
brew -v > /dev/null
if [ $? -ne 0 ]
then
    echo "[!] Homebrew not found"
    echo "[!] Installing Homebrew"
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    echo "[+] Homebrew found"
fi