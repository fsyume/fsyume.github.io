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
找到`PermitRootLogin`并改为`yes`
使用以下命令：

```shell
sudo systemctl restart sshd //重启ssh
```
然后远程连接：
```shell
ssh root@server-ip
```
## 查看系统信息
```shell
lscpu //查看CPU信息
lsblk //查看磁盘
free -h //查看内存
```

## screen 是 Linux 下的一个 终端多路复用工具
```shell
screen -S 名字	创建一个新的会话
screen -ls	查看当前有哪些会话
screen -r 名字	恢复（进入）指定会话
Ctrl + A + D	从当前会话分离，返回系统终端（程序继续运行）
exit	关闭当前会话（结束程序）
```

## Linux 查看端口占用情况

```shell
lsof -i:端口号
```

## 脱离终端的方式在后台运行shell命令

```shell
nohup 你的shell命令 &
```

## 常用任务管理命令

```shell
jobs //查看任务，返回任务编号n和进程号

bg %n //将编号为n的任务转后台运行

fg %n //将编号为n的任务转前台运行

ctrl+z //挂起当前任务

ctrl+c //结束当前任务
```