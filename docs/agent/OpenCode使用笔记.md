---
date: 2026-10-07
---
# OpenCode 使用笔记

OpenCode 是一个开源的 AI 编码代理（AI coding agent），提供终端 TUI、桌面端和网页端三种入口。它采用客户端–服务端架构：一个后台服务负责会话、配置、插件、权限和工具执行，各种前端（TUI / Desktop / Web）连到同一个服务上。这篇记录我平时最常用到的配置项和命令，方便速查。

> 本文按 **OpenCode V2** 编写，官方文档：<https://opencode.ai/v2/docs/>

## 安装与启动

```bash
# 任选一种安装方式
curl -fsSL https://opencode.ai/v2/install | bash
npm install -g @opencode/cli
brew install anomalyco/tap/opencode-v2
```

常用启动方式：

```bash
opencode                      # 在当前项目打开全屏 TUI
opencode ~/code/my-project    # 指定工作目录
opencode run "解释这个仓库"    # 非交互，直接输出结果（适合脚本/CI）
opencode mini                 # 精简交互界面，而非全屏 TUI
opencode pair                 # 启动网页端并输出访问地址与密码
```

关于后台服务：

```bash
opencode --standalone                 # 使用私有服务，隔离共享服务问题
opencode --server http://localhost:4096  # 连接指定服务
opencode service set disabled true    # 默认不使用共享服务（会停止后台服务）
```

## TUI 常用操作

- `Ctrl+P` → **Open settings**：在 TUI 里直接改常用设置
- `/connect`：连接 LLM Provider
- `/mcps`：查看 / 连接 / 认证 MCP 服务器
- `/diff`：查看改动，按 `d` 可切换比较范围
- `Ctrl+数字`：在会话标签间切换

CLI 设置与项目配置是**两套东西**，终端外观、快捷键等属于 CLI 设置，只放全局文件 `~/.config/opencode/cli.json`（没有项目级 `cli.json`）：

```jsonc title="~/.config/opencode/cli.json"
{
  "$schema": "https://opencode.ai/v2/cli.json",
  "theme": { "name": "tokyonight", "mode": "system" },
  "keybinds": { "leader": "ctrl+x" }
}
```

几个常用分组：`theme`（主题）、`session`（思考内容、tokens/s、权限提示 `prompt`/`autoaccept`）、`tabs`、`diffs`、`attention`（通知/提示音）、`keybinds`。也可以用环境变量临时覆盖：

```bash
OPENCODE_CLI_CONFIG_CONTENT='{"tabs":{"mode":"off"}}' opencode
```

## 配置文件与位置

OpenCode 的服务/项目配置用 JSON 或 JSONC，文件名叫 `opencode.json` 或 `opencode.jsonc`：

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5"
}
```

位置与优先级（从低到高）：

| 位置 | 作用范围 |
| --- | --- |
| `~/.config/opencode/opencode.json(c)` | 全局，所有项目 |
| `<项目>/opencode.json(c)` | 项目 |
| `<项目>/.opencode/opencode.json(c)` | 项目，优先级更高 |

OpenCode 会从当前目录向上搜索到文件系统根，先合并外层再合并内层；同一层级里 `.opencode` 下的配置会覆盖直连的 `opencode.json(c)`。所以**一个目录树里尽量只用一种形式**，否则容易被覆盖关系绕晕。

## 常用配置字段速查

| 字段 | 作用 |
| --- | --- |
| `model` | 默认模型，格式 `provider/model` |
| `default_agent` | 默认主 Agent（未显式选择时） |
| `shell` | 终端与 shell 工具使用的 shell |
| `permissions` | 有序权限规则：`allow` / `ask` / `deny` |
| `agents` | 覆盖内置 Agent 或定义自定义 Agent |
| `commands` | 自定义斜杠命令模板 |
| `mcp.servers` | 本地 / 远程 MCP 服务器 |
| `providers` | Provider 及其模型、请求设置、headers |
| `plugins` | 加载插件包或本地插件 |
| `skills` | 额外的 Skill 目录或 URL |
| `instructions` | 额外的说明文件（实际以 `AGENTS.md` 为准） |
| `references` | 把本地目录 / Git 仓库作为上下文 |
| `formatter` | `write`/`edit` 后自动格式化 |
| `update` | 更新策略：`notify`（默认）/ `auto` / `disable`（仅全局） |
| `snapshots` | 是否启用文件快照（undo/revert） |
| `watcher.ignore` | 忽略不触发文件更新的路径 |
| `tool_output` | 保留的工具输出行数 / 字节上限 |
| `websearch.provider` | 网络搜索来源，`random` 自动选择 |
| `compaction` | 上下文自动压缩策略 |

权限示例——凡是 `git push` 都需要确认：

```jsonc
{
  "permissions": [
    { "action": "shell", "resource": "git push *", "effect": "ask" }
  ]
}
```

## Agent

内置可见 Agent：

| Agent | 模式 | 用途 |
| --- | --- | --- |
| `build` | `primary` | 默认编码 Agent，工具默认放行 |
| `plan` | `primary` | 只探索与规划，不改动项目文件 |
| `general` | `subagent` | 研究型、多步任务，可广泛用工具 |
| `explore` | `subagent` | 只读搜索代码/网页 |

自定义 Agent 用 Markdown 文件，放全局 `~/.config/opencode/agents/` 或项目 `.opencode/agents/`，正文即 system prompt：

```md title=".opencode/agents/reviewer.md"
---
description: 只做代码评审，不改文件
mode: subagent
model: anthropic/claude-sonnet-4-5#high
permissions:
  - action: edit
    resource: "*"
    effect: deny
  - action: shell
    resource: "*"
    effect: deny
---

按严重程度列出问题，附文件与行号。
```

`mode` 取值：`primary`（主 Agent）、`subagent`（子会话专用）、`all`。设置默认主 Agent：

```jsonc
{ "default_agent": "build" }
```

## Command（自定义斜杠命令）

把提示词做成 `/命令`。文件放全局 `~/.config/opencode/commands/` 或项目 `.opencode/commands/`：

```md title=".opencode/commands/review.md"
---
description: 评审代码
agent: plan
---

评审 $ARGUMENTS，先报 bug。
```

占位符：`$ARGUMENTS` 是全部参数，`$1`/`$2` 是位置参数（引号可分组）。还能插入 shell 输出：

```md title=".opencode/commands/review-diff.md"
评审这个 diff：

!`git diff --stat && git diff`
```

> 注意：`!` 反引号里的命令在命令展开阶段执行，不经过 Agent 的工具权限流程，只用来路可信的命令。

## MCP 服务器

用 CLI 添加（会写进项目配置，加 `--global` 则对所有项目生效）：

```bash
opencode mcp add context7 --url https://mcp.context7.com/mcp   # 远程
opencode mcp add everything -- npx -y @modelcontextprotocol/server-everything  # 本地
opencode mcp list          # 查看连接状态
opencode mcp auth sentry   # 认证
opencode mcp logout sentry # 清除凭据
```

远程服务器默认走 OAuth；若 `mcp list` 显示需要认证，进 TUI 用 `/mcps` 登录。手动配置时注意 V2 的名字放在 `mcp.servers` 下（不是直接放 `mcp`）：

```jsonc
{
  "mcp": {
    "servers": {
      "context7": {
        "type": "remote",
        "url": "https://mcp.context7.com/mcp",
        "headers": { "CONTEXT7_API_KEY": "{env:CONTEXT7_API_KEY}" }
      }
    }
  }
}
```

密钥用 `{env:NAME}` 从环境变量读取，别写死在配置里。停用某个服务器用 `disabled: true`。

## 服务与排障

```bash
opencode service status          # 查看后台服务
opencode api get /api/info       # 验证 API 是否健康
opencode service restart         # 卡住/不健康时重启
opencode service stop
opencode service start
```

日志位置与查看：

```bash
tail -f ~/.local/share/opencode/log/opencode.log
grep 'role=server' ~/.local/share/opencode/log/opencode.log   # 只看服务端
grep 'run=8fc3b1d5' ~/.local/share/opencode/log/opencode.log  # 按 run 过滤
```

需要更详细的日志时：

```bash
OPENCODE_LOG_LEVEL=DEBUG opencode
```

其它路径可以用 `opencode debug paths`（可选 `db`/`config`/`log`/`data` 等）打印。排障时**不要删改**服务文件与数据库：

- 服务注册：`~/.local/state/opencode/service.json`
- 服务配置：`~/.config/opencode/service.json`
- 数据库：`~/.local/share/opencode/opencode.db`（可用 `OPENCODE_DB` 覆盖）

## 参考

- OpenCode V2 官方文档：<https://opencode.ai/v2/docs/>
- 配置字段完整参考：<https://opencode.ai/v2/docs/config>
- CLI 设置与快捷键：<https://opencode.ai/v2/docs/cli/config>
- MCP：<https://opencode.ai/v2/docs/mcp-servers>
- 排障：<https://opencode.ai/v2/docs/troubleshooting>