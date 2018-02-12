cat filelist.sha256 | cut -d" " -f1 > i
cat filelist.sha256 | cut -d" " -f3 | xargs openssl sha256 | cut -d" " -f2 > j
rm filelist.sha256
if diff i j > /dev/null; then
    rm i j
    exit 0
else
    rm i j
    echo "Error:Files have been modified"
    exit 1
fi