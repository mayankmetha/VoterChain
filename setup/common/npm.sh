cd $1
echo -ne "\r[\033[0;31m✘\033[0m] Dependencies: Installing" 
npm install > /dev/null 2>&1
echo -ne "\r[\033[1;32m✔\033[0m] Dependencies: Installed               \n"