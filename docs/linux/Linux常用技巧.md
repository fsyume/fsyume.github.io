# Linux常用技巧
## 启用远程root权限
首先确认是否安装了ssh服务，如果未安装请使用以下命令（Debian系）

```shell
sudo apt update
sudo apt install -y openssh-server
```
在物理机处进入以下目录并编辑以下文件：
```shell
/etc/ssh/sshd_config
```
找到PermitRootLogin并改为yes
使用以下命令：
```shell
sudo systemctl restart sshd //重启ssh
```
然后远程连接：
```shell
ssh root@server-ip
```