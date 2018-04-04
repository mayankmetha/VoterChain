#!/bin/bash
cd ..
cat ./setup/common/header
if [[ "$OSTYPE" == "darwin"* || "$OSTYPE" == "linux-gnu" ]]
then
bash ./setup/common/npm.sh
bash ./setup/common/ssl.sh
bash ./setup/common/aes.sh
bash ./setup/common/firebase.sh
else
echo "[+] OS not supported"
fi
