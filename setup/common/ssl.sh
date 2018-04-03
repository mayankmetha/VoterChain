if [[ ! -d ssl ]]
then
mkdir ssl
fi
if [[ ! -f ./ssl/mydomain.csr || ! -f ./ssl/private.key || ! -f ./ssl/private.crt ]] 
then
echo "[+] Generating SSL files"
openssl req -new -newkey rsa:2048 -nodes -out ./ssl/mydomain.csr -keyout ./ssl/private.key
openssl x509 -signkey ./ssl/private.key -in ./ssl/mydomain.csr -req -days 1000 -out ./ssl/private.crt
echo "[+] SSL files generated"
else
echo "[+] SSL files found"
fi