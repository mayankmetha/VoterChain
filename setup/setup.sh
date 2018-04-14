#!/bin/bash
DIR=`pwd`/`dirname "$0"`
if [[ `dirname "$0"` == "." ]]
then
    PDIR=`echo $DIR | rev | cut -c9- | rev`
else
    PDIR=`echo $DIR | rev | cut -c7- | rev`
fi
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
    echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m OS             \033[0m\033[1;37m:\033[0m\033[1;36m macOS/OS X\033[0m"
    bash $DIR/mac/node.sh
elif [[ "$OSTYPE" == "linux-gnu" ]]
then
    echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m OS             \033[0m\033[1;37m:\033[0m\033[1;36m Linux\033[0m"
    if [[ "`lsb_release -i | cut -d":" -f2 | cut --complement -c1`" == "Ubuntu" ]]
    then
        echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m Ubuntu\033[0m"
        bash $DIR/ubuntu/node.sh
    elif [[ "`lsb_release -i | cut -d":" -f2 | cut --complement -c1`" == "elementary" ]]
    then
        echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m Elementary\033[0m"
        bash $DIR/ubuntu/node.sh
    fi
else
    echo -e "\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m OS             \033[0m\033[1;37m:\033[0m\033[1;36m Not Supported\033[0m"
    exit 0
fi
bash $DIR/common/ssl.sh $PDIR
bash $LOC/$DIR/common/aes.sh $PDIR
bash $LOC/$DIR/common/firebase.sh $PDIR
bash $DIR/common/npm.sh $PDIR