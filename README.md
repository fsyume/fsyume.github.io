# www.fsyume.com
> 我的主页
> 感谢deepseek-v4.1-flash & opencode协助迁移旧文章

## 部署

一次 `git push main` 触发 GitHub Actions 构建与发布（工作流见 `.github/workflows/deploy.yml`）：

- **国外线路**：GitHub Pages（`www.fsyume.com` 境外线路 CNAME → `fsyume.github.io`）
- **国内线路**：待定 —— 原又拍云已停服，需另选静态托管，届时在 workflow 中替换对应部署步骤
- 分流由 DNSPod 的「默认 / 境外」线路实现

## 图片资源

图片统一存放于仓库 `docs/public/images/`，正文以 `/images/...` 引用，随构建产物一起发布，不再依赖外部图床。