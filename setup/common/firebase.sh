echo -ne "\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m FirebaseConfig \033[0m\033[1;37m:\033[0m\033[1;36m Checking\033[0m"
if [[ ! -f "$1/js/config.js" || ! -f "$1/admin-web/js/config.js" ]]
then
    echo -ne "\r\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m FirebaseConfig \033[0m\033[1;37m:\033[0m\033[1;36m Generating\033[0m                  \n"
    read -p "Enter apiKey: " apiKey
    tput cuu1;tput el
    read -p "Enter authDomain: " authDomain
    tput cuu1;tput el
    read -p "Enter databaseURL: " databaseURL
    tput cuu1;tput el
    read -p "Enter projectId: " projectId
    tput cuu1;tput el
    read -p "Enter storageBucket: " storageBucket
    tput cuu1;tput el
    read -p "Enter messagingSenderId: " messagingSenderId
    tput cuu1;tput el
    tput cuu1;tput el
    echo "var config = {apiKey: \"$apiKey\",authDomain: \"$authDomain\",databaseURL: \"$databaseURL\",projectId: \"$projectId\",storageBucket: \"$storageBucket\",messagingSenderId: \"$messagingSenderId\"};firebase.initializeApp(config);" > "$1/admin-web/js/config.js"
    echo "var config = {apiKey: \"$apiKey\",authDomain: \"$authDomain\",databaseURL: \"$databaseURL\",projectId: \"$projectId\",storageBucket: \"$storageBucket\",messagingSenderId: \"$messagingSenderId\"};module.exports = {config: config};" > "$1/js/config.js"
    echo -ne "\r\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m FirebaseConfig \033[0m\033[1;37m:\033[0m\033[1;36m Generated\033[0m                         \n"  
else
    echo -ne "\r\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m FirebaseConfig \033[0m\033[1;37m:\033[0m\033[1;36m Generated\033[0m                         \n"  
fi