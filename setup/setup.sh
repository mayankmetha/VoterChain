#!/bin/bash
DIR=`pwd`/`dirname "$0"`
PDIR="$(dirname "$DIR")"
echo $PDIR
cat $DIR/common/header
if [[ "$OSTYPE" == "darwin"* ]]
then
echo -e "[\033[1;32m✔\033[0m] OS: macOS/OS X"
bash $DIR/mac/node.sh
elif [[ "$OSTYPE" == "linux-gnu" || "`grep Ubuntu /etc/issue.net`" == "Ubuntu" ]]
then
echo -e "[\033[1;32m✔\033[0m] OS: Ubuntu Linux"
bash $DIR/ubuntu/node.sh
else
echo -e "[\033[0;31m✘\033[0m] OS: Not Supported"
exit 0
fi
bash $DIR/common/npm.sh $PDIR
bash $DIR/common/ssl.sh $PDIR
#bash $LOC/$DIR/common/aes.sh $LOC
#bash $LOC/$DIR/common/firebase.sh $LOC