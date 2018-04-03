#!/bin/bash
cd ..
cat ./setup/common/header
if [[ "$OSTYPE" == "darwin"* ]]
then
echo "[!] OS Detected: MacOS/OS X"
bash ./setup/common/homebrew.sh
bash ./setup/common/macNode.sh
elif [[ "$OSTYPE" == "linux-gnu" ]]
then
echo "[!] OS Detected: Linux"
if [[ "`grep ID_LIKE /etc/*-release | cut -d'=' -f2`" == "debian" ]]
then
echo "[!] Distro: Ubuntu/Debian/Linux Mint/ElementryOS"
bash ./setup/common/debianNode.sh
else
echo "[!] Distro not tested!"
fi
fi
if [[ "$OSTYPE" == "darwin"* || "$OSTYPE" == "linux-gnu" ]]
then
bash ./setup/common/npmInstall.sh
bash ./setup/common/ssl.sh
bash ./setup/common/aes.sh
bash ./setup/common/firebase.sh
else
echo "[+] OS not supported"
fi
