cat filelist.sha256 | cut -d" " -f1 > i
cat filelist.sha256 | cut -d" " -f3 | xargs openssl sha256 | cut -d" " -f2 > j
rm filelist.sha256
if diff i j > /dev/null; then
    rm i j
    clear
    echo -e "\033[1;37m---------------------------------------------------\033[0m"
    echo -ne "\033[1;33m"
    cat setup/common/header
    echo -e "\033[0m"
    echo -e "\033[1;37m---------------------------------------------------\033[0m"
    echo -e "\033[1;37m+++++\033[1;31mhttps://github.com/mayankmetha/VoterChain\033[1;37m+++++\033[0m"
    echo -e "\033[1;37m---------------------------------------------------\033[0m"
    exit 0
else
    rm i j
    clear
    echo -e "\033[1;31mError:Files have been modified\033[0m"
    exit 1
fi