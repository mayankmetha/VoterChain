#!/bin/bash
DIR=`pwd`/`dirname "$0"`
PDIR="$(dirname "$DIR")"
clear
echo -e "\033[1;37m---------------------------------------------------\033[0m"
echo -e "\033[1;33m"
cat $DIR/common/header
echo -e "\033[0m"
echo -e "\033[1;37m---------------------------------------------------\033[0m"
echo -e "\033[1;37m+++++\033[1;31mhttps://github.com/mayankmetha/VoterChain\033[1;37m+++++\033[0m"
echo -e "\033[1;37m---------------------------------------------------\033[0m"
if [[ "$OSTYPE" == "darwin"* ]]
then
echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m OS\033[0m\033[1;37m:\033[0m\033[1;36m macOS/OS X\033[0m"
bash $DIR/mac/node.sh
elif [[ "$OSTYPE" == "linux-gnu" || "`grep Ubuntu /etc/issue.net`" == "Ubuntu" ]]
then
echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m OS\033[0m\033[1;37m:\033[0m\033[1;36m Ubuntu Linux\033[0m"
bash $DIR/ubuntu/node.sh
else
echo -e "\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m OS\033[0m\033[1;37m:\033[0m\033[1;36m Not Supported\033[0m"
exit 0
fi
bash $DIR/common/npm.sh $PDIR
#bash $DIR/common/ssl.sh $PDIR
#bash $LOC/$DIR/common/aes.sh
#bash $LOC/$DIR/common/firebase.sh