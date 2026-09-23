import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FS的博客",
  description: "FS的博客",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '分类', link: '/category' },
      { text: '关于', link: '/about' }
    ],
    // sidebar: {
    //   '/ffxiv/':[
    //     {
    //       text: '最终幻想14',
    //       items: [
    //         { text: '给狒狒豆芽看的常见PVE黑话', link: '/ffxiv/给狒狒豆芽看的常见PVE黑话.md' }
    //       ]
    //     }
    //   ]
    // },
    footer: {
      message: '<a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral">本网站由<img src="https://cos.blog.fsyume.com/my/upyun_logo5.png" style="display:inline;height:30px;position:relative;top:9px;background-color:rgb(255,255,255,0.5);">提供CDN加速/云存储服务</a></br><a href="https://beian.miit.gov.cn/"><span>豫ICP备2020026923号-3</span></a>',
      copyright: 'Copyright © 2022-present <a href="https://space.bilibili.com/115505904">chihying</a>'
    },
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            // MiniSearch 默认只按空白/标点切词，中文整句会变成一个 token，
            // 导致正文里的中文词无法被检索。这里对 CJK 追加 bigram 分词。
            tokenize: (text) =>
              text
                .split(/[\n\r\p{Z}\p{P}]+/u)
                .flatMap((segment) => {
                  const tokens = segment.match(/[A-Za-z0-9_]+/g) ?? []
                  const cjk = segment.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]+/gu) ?? []
                  for (const run of cjk) {
                    if (run.length === 1) {
                      tokens.push(run)
                      continue
                    }
                    for (let i = 0; i < run.length - 1; i++) {
                      tokens.push(run.slice(i, i + 2))
                    }
                  }
                  return tokens
                })
          },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 }
          }
        }
      }
    }
  }
})
