#!/bin/zsh
# echo "Deploying to server..."
# scp -r dist/spa root@206.189.183.61:/var/www/html/pp8.com/
# echo "Executing deploy script"      
# ssh root@206.189.183.61 "source ~/.zshrc && cd /var/www/html/pp8.com && ./deploy.sh"

# New local repository
CURRENT=$(date +'%m/%d/%Y')
cp -r ./dist/spa/* ../../JS_Deploy/pp8
cd ../../JS_Deploy/pp8
echo "# PP8_SPA" >> README.md
git init
git add .
git commit -m "${CURRENT} commit"
git branch -M main
git remote add origin https://github.com/StolenThunda/PP8_SPA.git
git push -u origin main