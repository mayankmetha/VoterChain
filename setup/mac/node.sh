echo -ne "[\033[0;31m✘\033[0m] Homebrew: Checking"
if ! type brew > /dev/null 2>&1
then
    echo -ne "\r[\033[0;31m✘\033[0m] Homebrew: Installing               "
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    echo -ne "\r[\033[1;32m✔\033[0m] Homebrew: Installed               \n" 
else
    echo -ne "\r[\033[1;32m✔\033[0m] Homebrew: Installed               \n"
fi
echo -ne "[\033[0;31m✘\033[0m] NodeJS: Checking"
if ! type node > /dev/null 2>&1
then
    echo -ne "\r[\033[0;31m✘\033[0m] NodeJS: Installing               "
    brew install node
    echo -ne "\r[\033[1;32m✔\033[0m] NodeJS: Installed               \n" 
else
    echo -ne "\r[\033[1;32m✔\033[0m] NodeJS: Installed               \n"
fi