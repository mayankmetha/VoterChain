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
echo -ne "\033[1;33m"
cat $DIR/common/header
echo -e "\033[0m"
echo -e "\033[1;37m---------------------------------------------------\033[0m"
echo -e "\033[1;37m+++++\033[1;31mhttps://github.com/mayankmetha/VoterChain\033[1;37m+++++\033[0m"
echo -e "\033[1;37m---------------------------------------------------\033[0m"
if [[ "$OSTYPE" == "darwin"* ]]
then
    echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m OS             \033[0m\033[1;37m:\033[0m\033[1;36m macOS/OS X\033[0m"
    bash $DIR/mac/node.sh
elif [[ "$OSTYPE" == "linux-gnu" || "$OSTYPE" == "linux" ]]
then
    echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m OS             \033[0m\033[1;37m:\033[0m\033[1;36m Linux\033[0m"
    #ubuntu-ubuntu
    if [[ "`lsb_release -i | cut -f2`" == "Ubuntu" ]]
    then
        echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m Ubuntu\033[0m"
        bash $DIR/ubuntu/node.sh
    #mint-mint
    elif [[ "`lsb_release -i | cut -f2`" == "LinuxMint" ]]
    then
        echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m LinuxMint/LMDE\033[0m"
        bash $DIR/mint/node.sh
    #elementary-mint
    elif [[ "`lsb_release -i | cut -f2`" == "elementary" ]]
    then
        echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m Elementary\033[0m"
        bash $DIR/mint/node.sh
    #boss-debian
    elif [[ "`lsb_release -i | cut -f2`" == "BOSS" ]]
    then
        echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m BOSS\033[0m"
        bash $DIR/debian/node.sh
    #debian-debian
    elif [[ "`lsb_release -i | cut -f2`" == "Debian" ]]
    then
        echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m Debian\033[0m"
        bash $DIR/debian/node.sh
    #solus-solus
    elif [[ "`lsb_release -i | cut -f2`" == "Solus" ]]
    then
        echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m Solus\033[0m"
        bash $DIR/solus/node.sh
    #fedora-fedora
    elif [[ "`lsb_release -i | cut -f2`" == "Fedora" ]]
    then
        echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m Fedora\033[0m"
        bash $DIR/fedora/node.sh
    #cent-fedora
    elif [[ "`lsb_release -i | cut -f2`" == "CentOS" ]]
    then
        echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m CentOS\033[0m"
        bash $DIR/fedora/node.sh
    #opensuse-suse
    elif [[ "`lsb_release -i | cut -f2`" == "openSUSE project" ]]
    then
        echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m OpenSUSE\033[0m"
        bash $DIR/opensuse/node.sh
    #arch-arch
    elif [[ "`lsb_release -i | cut -f2`" == "Arch" ]]
    then
        echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m Arch\033[0m"
        bash $DIR/arch/node.sh
    #voidLinux-void
    elif [[ "`lsb_release -i | cut -f2`" == "VoidLinux" ]]
    then
        echo -e "\033[1;37m[\033[0m\033[1;32m✔\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m Void Linux\033[0m"
        bash $DIR/void/node.sh
    else
        echo -e "\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m Distro         \033[0m\033[1;37m:\033[0m\033[1;36m Not Supported\033[0m"
        exit 0
    fi
else
    echo -e "\033[1;37m[\033[0m\033[1;31m✘\033[0m\033[1;37m]\033[0m\033[1;33m OS             \033[0m\033[1;37m:\033[0m\033[1;36m Not Supported\033[0m"
    exit 0
fi
bash $DIR/common/ssl.sh $PDIR
bash $LOC/$DIR/common/aes.sh $PDIR
bash $LOC/$DIR/common/firebase.sh $PDIR
bash $DIR/common/npm.sh $PDIR