# Wireshark使用方法及技巧

::: tip
Date: 2026-9-25

Updated: 2026-9-25
:::

## 按协议/IP/端口过滤

**按协议过滤**：直接输入协议名，如 `ip`、`tcp`、`udp`、`http`、`dns`、`tls`。

**按 IP 过滤**：

- 指定源 IP 或目的 IP：`ip.src == 192.168.1.1` 或 `ip.dst == 10.0.0.1`
- 包含指定 IP（无论源/目的）：`ip.addr == 192.168.1.1`

**按端口过滤**：

- 指定端口：`tcp.port == 80` 或 `udp.port == 53`
- 指定端口范围：`tcp.port >= 8000 and tcp.port <= 8080`

## 逻辑组合与应用层筛选

- **逻辑运算符**：`and`（且）、`or`（或）、`not`（非，或用 `!`）。
  - 示例：`ip.addr == 192.168.1.100 and tcp.port == 443`
- **HTTP 请求筛选**：
  - 仅看 GET 请求：`http.request.method == "GET"`
  - 包含特定域名：`http.host contains "example.com"`
  - 查看响应状态码：`http.response.code == 200`

> **提示：捕获过滤器 vs 显示过滤器**
>
> - **捕获过滤器（Capture Filter）**：在抓包前设置（如 `host 192.168.1.1`），只保存符合条件的数据，节省内存。
> - **显示过滤器（Display Filter）**：抓包后或抓包时实时筛选（如 `ip.addr == ...`），不丢失任何原始数据，最常用。

## 高频实用分析技巧

### 1. 追踪流（Follow Stream）

查看 HTTP 网页请求、TCP 握手或文本协议时，单看每个数据包很难连续解读。

- **操作**：右键点击任意 TCP/HTTP 数据包 -> 选择 **Follow** -> **TCP Stream**（或 HTTP Stream）。
- **效果**：Wireshark 会自动把整个会话过程组装成完整的文本对话（客户端请求标红，服务端响应标蓝），可直接提取通信内容或传输的文件。

### 2. 统计分析（Statistics）

通过顶部菜单的 **Statistics** 快速定位网络瓶颈：

- **Protocol Hierarchy（协议分级）**：直观查看当前抓到的数据包中各协议占比，快速判断是否有异常流量泛滥。
- **Conversations（对话）**：查看哪一对 IP/端口之间传输的数据量最大，方便寻找占用带宽的设备。

### 3. 专家信息（Expert Information）

点击左下角的圆圈图标或顶部菜单 `Analyze -> Expert Information`。Wireshark 会自动汇总当前抓包中的网络异常，如 **TCP 重传（Retransmission）**、**乱序（Out-of-Order）**、**连接重置（RST）**，是排查网络卡顿与丢包的利器。