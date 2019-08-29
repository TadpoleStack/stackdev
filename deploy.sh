#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'istack.site' > CNAME
# 添加项目简介
echo '#### 下面是各平台发布的网站地址
#### [GitHub地址](https://istack.site)
#### [腾讯云开发者平台（coding）发布地址](https://mrchen1521620063.coding.me)
#### [码云发布地址](https://tadpolestack.gitee.io)' > js原型链.md
git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:TadpoleStack/TadpoleStack.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 腾讯云开发者平台（coding） 
#git push -f https://git.dev.tencent.com/mrchen1521620063/mrchen1521620063.git master
# 码云
#git push -f https://gitee.com/TadpoleStack/TadpoleStack.git master
cd -