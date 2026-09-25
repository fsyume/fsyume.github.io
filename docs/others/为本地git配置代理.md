---
date: 2024-04-27
updated: 2024-04-27
---
# 为本地git配置代理
```bash
# 查看当前设置
git config --global --list

git config --global https.proxy socks5://127.0.0.1:7890

git config --global http.proxy socks5://127.0.0.1:7890

git config --global --unset http.proxy

git config --global --unset https.proxy

```
