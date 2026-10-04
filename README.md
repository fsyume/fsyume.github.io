# www.fsyume.com
> 我的主页
> 感谢deepseek-v4.1-flash & opencode协助迁移旧文章

## 部署

一次 `git push main` 触发 GitHub Actions，双端发布同一份构建产物：

- **国外线路**：GitHub Pages（`www.fsyume.com` 境外线路 CNAME → `fsyume.github.io`）
- **国内线路**：又拍云 CDN（云存储为源，默认线路 CNAME → 又拍云）
- 分流由 DNSPod 的「默认 / 境外」线路实现；工作流见 `.github/workflows/deploy.yml`

图片资源存储于 Upyun。

> 又拍云步骤依赖仓库 Secrets：`UPYUN_SERVICE` / `UPYUN_OPERATOR` / `UPYUN_PASSWORD`；未配置时自动跳过，仅发布 GitHub Pages。