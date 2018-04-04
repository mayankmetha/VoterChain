#!/bin/bash
cd ..
cat ./setup/common/header
if [[ "$OSTYPE" == "darwin"* ]]
then
echo "[!] OS Detected: MacOS/OS X"
bash ./setup/mac/homebrew.sh
bash ./setup/mac/node.sh
elif [[ "$OSTYPE" == "linux-gnu" ]]
then
echo "[!] OS Detected: Linux"
if [[ "`grep ID_LIKE /etc/*-release | cut -d'=' -f2`" == "debian" || "`grep ID_LIKE /etc/*-release | cut -d'=' -f2`" == "ubuntu" ]]
then
echo "[!] Distro: Ubuntu/Debian/Linux Mint/LMDE/Trisquel/ElementryOS/BOSS"
bash ./setup/debian/node.sh
elif [[ "`grep ID_LIKE /etc/*-release | cut -d'=' -f2`" == "archlinux" ]]
then
echo "[!] Distro: Arch Linux"
bash ./setup/arch/node.sh
else
echo "[!] Distro not tested!"
fi
fi
if [[ "$OSTYPE" == "darwin"* || "$OSTYPE" == "linux-gnu" ]]
then
bash ./setup/common/npm.sh
bash ./setup/common/ssl.sh
bash ./setup/common/aes.sh
bash ./setup/common/firebase.sh
else
echo "[+] OS not supported"
fi
