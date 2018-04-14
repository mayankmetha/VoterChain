cd $1
echo -ne "\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m Dependencies\033[0m\033[1;37m:\033[0m\033[1;36m Installing\033[0m"
npm install > /dev/null 2>&1
echo -ne "\r\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Dependencies\033[0m\033[1;37m:\033[0m\033[1;36m Installed\033[0m                         \n"  