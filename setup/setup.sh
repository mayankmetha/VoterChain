#!/bin/bash
cd ..
cat ./setup/common/header
if [[ "$OSTYPE" == "darwin"* ]]
then
echo "[+] OS: macOS/OS X"
bash ./setup/mac/node.sh
bash ./setup/common/npm.sh
bash ./setup/common/ssl.sh
bash ./setup/common/aes.sh
bash ./setup/common/firebase.sh
elif [[ "$OSTYPE" == "linux-gnu" || "`grep Ubuntu /etc/issue.net`" == "Ubuntu" ]]
then
echo "[+] OS: Ubuntu Linux"
bash ./setup/ubuntu/node.sh
bash ./setup/common/npm.sh
bash ./setup/common/ssl.sh
bash ./setup/common/aes.sh
bash ./setup/common/firebase.sh
else
echo "[+] OS not supported"
fi
