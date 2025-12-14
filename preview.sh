#!/usr/bin/env bash
echo "Hello！自动部署中！"

echo "项目打包中。。。"
npm run docs:build

echo "项目部署中。。。"
npm run docs:preview

echo "结束"