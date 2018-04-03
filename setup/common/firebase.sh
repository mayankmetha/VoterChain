if [[ ! -f ./js/config.js && ! -f ./admin-web/js/config.js ]]
then
echo "[+] Generating Firebase config"
read -p "Enter apiKey: " apiKey
read -p "Enter authDomain: " authDomain
read -p "Enter databaseURL: " databaseURL
read -p "Enter projectId: " projectId
read -p "Enter storageBucket: " storageBucket
read -p "Enter messagingSenderId: " messagingSenderId
echo "var config = {apiKey: \"$apiKey\",authDomain: \"$authDomain\",databaseURL: \"$databaseURL\",projectId: \"$projectId\",storageBucket: \"$storageBucket\",messagingSenderId: \"$messagingSenderId\"};firebase.initializeApp(config);" > ./admin-web/js/config.js
echo "var config = {apiKey: \"$apiKey\",authDomain: \"$authDomain\",databaseURL: \"$databaseURL\",projectId: \"$projectId\",storageBucket: \"$storageBucket\",messagingSenderId: \"$messagingSenderId\"};module.exports = {config: config};" > ./js/config.js
echo "[+] Generated files"
else
echo "[+] Firebase files found"
fi