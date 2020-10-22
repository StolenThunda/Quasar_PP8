#!/bin/zsh
# echo "Deploying to server..."
# scp -r dist/spa root@206.189.183.61:/var/www/html/pp8.com/
# echo "Executing deploy script"      
# ssh root@206.189.183.61 "source ~/.zshrc && cd /var/www/html/pp8.com && ./deploy.sh"

# New local repository
cd /dist/spa
git init
git add .
git commit -m "Initial commit"

# New remote repository
git remote add origin https://github.com/StolenThunda/PP8_SPA.git
# Now push
git push -u origin master