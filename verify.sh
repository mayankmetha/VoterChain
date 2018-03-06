cat filelist.sha256 | cut -d" " -f1 > i
cat filelist.sha256 | cut -d" " -f3 | xargs openssl sha256 | cut -d" " -f2 > j
rm filelist.sha256
if diff i j > /dev/null; then
    rm i j
    echo -e "\033[2J\033[u"
    exit 0
else
    rm i j
    echo -e "\033[2J\033[u\033[1;31mError:Files have been modified\033[0m"
    exit 1
fi