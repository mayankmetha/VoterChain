if [[ ! -f ./ssl/blockchain.key ]]
then
echo "[+] Generating cryptofiles"
openssl enc -aes-256-cfb -P -md sha256 | tail -2 | head -1 | cut -d"=" -f2 > ./ssl/blockchain.key
echo "[+] Generated cryptofiles"
else
echo "[+] Cryptofiles found"
fi