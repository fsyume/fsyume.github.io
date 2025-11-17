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
    sidebar: {
      '/ffxiv/':[
        {
          text: '最终幻想14',
          items: [
            { text: '给狒狒豆芽看的常见PVE黑话', link: '/ffxiv/给狒狒豆芽看的常见PVE黑话.md' }
          ]
        }
      ]
    },
    footer: {
      message: '<a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral">本网站由<img src="https://cos.blog.fsyume.com/my/upyun_logo5.png" style="display:inline;height:30px;position:relative;top:9px;background-color:rgb(255,255,255,0.5);">提供CDN加速/云存储服务</a></br><a href="https://beian.miit.gov.cn/"><span>豫ICP备2020026923号-3</span></a>',
      copyright: 'Copyright © 2022-present <a href="https://space.bilibili.com/115505904">chihying</a>'
    },
    search: {
      provider: 'local'
    }
  }
})
