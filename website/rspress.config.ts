// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import path from 'node:path'
import { defineConfig } from '@rspress/core'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginLess } from '@rsbuild/plugin-less'

// Environment variables
const isDev = process.env.NODE_ENV === 'development'

const { CDN_INNER_CN, CDN_PATH_PREFIX } = process.env

export default defineConfig({
  globalStyles: path.join(__dirname, 'src/lynx-ui/styles/global.css'),
  root: path.join(__dirname, 'docs'),
  title: 'lynx-ui',
  description: 'The official website of lynx-ui',
  logo: {
    light: '/assets/lynx-ui-icon-color-light.svg',
    dark: '/assets/lynx-ui-icon-color-dark.svg',
  },
  logoText: 'lynx-ui',
  icon: '/assets/lynx-ui-icon-color-light.svg',
  // 默认语言
  // Default language
  lang: 'zh',
  builderConfig: {
    plugins: [pluginSass(), pluginLess()],
    server: {
      cors: {
        // make sure the web preview can access the local server
        origin: 'https://www.unpkg.com',
      },
    },
    output: {
      assetPrefix: isDev
        ? void 0
        // TODO: deal with regions
        : `https://${CDN_INNER_CN}/${CDN_PATH_PREFIX}/`,
    },
    tools: {
      rspack: {
        resolve: {
          // This is a workaround for the lack of native fs and path modules in the browser in .server.tsx
          fallback: {
            fs: false,
            path: false,
          },
        },
      },
    },
    resolve: {
      alias: {
        '@lynx/*': './src/lynx-ui/components/*',
        '@assets/*': './docs/public/assets/*',
        '@docs/*': [
          './sharedDocs/packageDocs/*',
        ],
      },
    },
    source: {
      define: {
        'process.env': {
          LYNXUIONLY: 'true',
          LYNX_EXPLORER_URL_CN: JSON.stringify(
            'https://lynx.bytedance.net/example-app',
          ),
          LYNX_EXPLORER_URL_EN: JSON.stringify(
            'https://lynx.bytedance.net/example-app',
          ),
        },
      },
    },
    html: {
      tags: [
        {
          tag: 'script',
          attrs: {
            type: 'text/javascript',
          },
          head: true,
          children: `
;(function (w, d, u, b, n, pc, ga, ae, po, s, p, e, t, pp) {pc = 'precollect';ga
= 'getAttribute';ae = 'addEventListener';po = 'PerformanceObserver';s = function
(m) {p = [].slice.call(arguments);p.push(Date.now(), location.href);(m == pc ?
s.p.a : s.q).push(p)};s.q = [];s.p = { a: [] };w[n] = s;e =
document.createElement('script');e.src = u + '?bid=' + b + '&globalName=' +
n;e.crossOrigin = u.indexOf('sdk-web') > 0 ? 'anonymous' :
'use-credentials';d.getElementsByTagName('head')[0].appendChild(e);if (ae in w)
{s.pcErr = function (e) {e = e || w.event;t = e.target || e.srcElement;if (t
instanceof Element || t instanceof HTMLElement) {if (t[ga]('integrity'))
{w[n](pc, 'sri', t[ga]('href') || t[ga]('src'))} else {w[n](pc, 'st', { tagName:
t.tagName, url: t[ga]('href') || t[ga]('src') })}} else {w[n](pc, 'err', e.error)}};s.pcRej = function (e) {e = e || w.event;w[n](pc, 'reject',
e.reason || (e.detail && e.detail.reason))};w[ae]('error', s.pcErr,
true);w[ae]('unhandledrejection', s.pcRej,
true);};if('PerformanceLongTaskTiming' in w) {pp = s.pp = { entries: []
};pp.observer = new PerformanceObserver(function (l) {pp.entries =
pp.entries.concat(l.getEntries())});pp.observer.observe({ entryTypes:
['longtask']
})}})(window,document,'https://lf3-short.ibytedapm.com/slardar/fe/sdk-web/browser.cn.js','lynx_internal_website','Slardar')
            `,
        },
        {
          tag: 'script',
          attrs: {
            type: 'text/javascript',
          },
          head: true,
          children: `
              var isProd = [/lynx\.bytedance\.net/].some((reg) => reg.test(location.host))
              var isBOE = [/lynx\.gf-boe\.bytedance\.net/].some((reg) => reg.test(location.host))
              var ignoreUrls = ['mcs.snssdk.com', 'i.snssdk.com', 'mon.snssdk.com', 'starling.snssdk.com']
              window.Slardar('init', {
                bid: 'lynx_internal_website',
                env: isProd ? 'production' : (isBOE ? 'boe' : 'development' ),
                userId: '1',
                plugins: {
                  pageview: {
                    extractPid: (url) => {
                      return new URL(url).pathname
                    }
                  },
                  action:  {
                    types: ['click'],
                    pure: true,
                  },
                  blankScreen: {
                    rootSelector: '#root',
                  },
                  ajax: { collectBodyOnError: true, ignoreUrls },
                  fetch: { collectBodyOnError: true, ignoreUrls },
                  jsError: {
                    onerror: true,
                    // 是否添加全局 onunhandledrejection 监听器
                    onunhandledrejection: true
                  }
                }
              })
              window.Slardar('start');
`,
        },
        {
          tag: 'script',
          attrs: {
            src: 'https://at.alicdn.com/t/c/font_4313451_hzqiezx4k7i.js',
            type: 'text/javascript',
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            src: './src/iconfont/iconfont.css',
          },
        },
        {
          tag: 'script',
          attrs: {
            type: 'text/javascript',
          },
          head: true,
          children: `
!function(){function e(e){var t=Math.random().toString(36).substr(2,10),a=document.createElement("iframe");a.id=t;var r="?iframeId="+t;return a.dataset.lynxEmbedType=e.embedType,a.dataset.lynxIframe="true",e.platform&&(r+="&platform="+e.platform),e.supportedPlatforms&&(r+="&supportedPlatforms="+e.supportedPlatforms),e.sdkVersion&&(r+="&sdkVersion="+e.sdkVersion),e.name&&(r+="&name="+e.name),e.description&&(r+="&description="+e.description),e.theme&&(r+="&theme="+e.theme),e.id&&(r+="&id="+e.id),{iframe:a,iframeQueryParams:r,iframeId:t}}if(!window.LynxPlayer){var t={postMessage:function(e,t){var a=e.querySelector("iframe[data-lynx-iframe]");if(a){var r={iframeId:a.id};if("preview"===a.dataset.lynxEmbedType){var d=t||{};d.files&&(r.files=d.files),d.theme&&(r.theme=d.theme),d.sourceUrl&&(r.sourceUrl=d.sourceUrl),d.selectedCard&&(r.selectedCard=d.selectedCard),d.mini&&(r.mini=d.mini)}else{var n=t||{};n.theme&&(r.theme=n.theme)}a.contentWindow&&a.contentWindow.postMessage(["lynxDataEvent",r],"*")}},append:function(t,a){if(!t.querySelector("iframe[data-lynx-iframe]")){var r=(a||{}).embedType||t.dataset.lynxEmbedType||"code",d=function(e,t){if((t=t||{}).embedType=t.embedType||e.dataset.lynxEmbedType||"code",t.id=t.id||e.dataset.lynxId,t.platform=t.platform||e.dataset.lynxPlatform,t.supportedPlatforms=t.supportedPlatforms||e.dataset.lynxSupportedPlatforms,t.sdkVersion=t.sdkVersion||e.dataset.lynxSdkVersion,t.name=t.name||e.dataset.lynxName,t.description=t.description||e.dataset.lynxDescription,t.theme=t.theme||e.dataset.lynxTheme,t.useSpeedy=t.useSpeedy||e.dataset.lynxUseSpeedy,t.schema=t.schema||e.dataset.lynxSchema,!t.files&&e.dataset.lynxFiles&&(t.files=decodeURIComponent(e.dataset.lynxFiles)),!t.sourceUrl&&e.dataset.lynxSourceUrl){var a=decodeURIComponent(e.dataset.lynxSourceUrl||"");try{var r=new URL(a).searchParams.get("project");r&&(a=r)}catch(e){}try{var d=new URL(a);a=d.toString()}catch(e){}t.sourceUrl=a}return t}(t,a||{});if("code"===r){if(!d.id&&!d.files&&!d.sourceUrl)return;!function(t,a){var r=e(a),d=r.iframeQueryParams,n=r.iframe,i=r.iframeId;a.preview&&(d+="&preview="+a.preview),a.selectedFile&&(d+="&selectedFile="+a.selectedFile),"true"===a.useSpeedy&&(d+="&useSpeedy=true"),a.schema&&(d+="&schema="+a.schema);var l="http://lynx.web.bytedance.net/embedded";n.src=a.id?l+"/"+a.id+d:""+l+d,n.height="100%",n.width="100%",n.frameBorder="0",n.allowTransparency=!0,t.appendChild(n),(a.files||a.sourceUrl)&&window.addEventListener("message",function(e){if("lynxFrameLoaded"===e.data[0]&&e.data[1].iframeId===i&&n.contentWindow){var t={iframeId:i};null!=a&&a.files&&(t.files=null==a?void 0:a.files),null!=a&&a.sourceUrl&&(t.sourceUrl=null==a?void 0:a.sourceUrl),n.contentWindow.postMessage(["lynxDataEvent",t],"*")}})}(t,function(e,t){return t.preview=t.preview||e.dataset.lynxPreview,t.selectedFile=t.selectedFile||e.dataset.lynxSelectedFile,t}(t,d))}else!function(t,a){var r=e(a),d=r.iframeQueryParams,n=r.iframe,i=r.iframeId;a.mini&&(d+="&mini="+a.mini),a.projectId&&(d+="&projectId="+a.projectId),a.selectedCard&&(d+="&selectedCard="+a.selectedCard),"true"===a.useSpeedy&&(d+="&useSpeedy=true"),a.schema&&(d+="&schema="+a.schema);var l="http://lynx.web.bytedance.net/preview";n.src=a.id?l+"/"+a.id+d:""+l+d,n.height="100%",n.width="100%",n.frameBorder="0",n.allowTransparency=!0,t.appendChild(n),(a.files||a.sourceUrl)&&window.addEventListener("message",function(e){if("lynxFrameLoaded"===e.data[0]&&e.data[1].iframeId===i&&n.contentWindow){var t={iframeId:i};null!=a&&a.files&&(t.files=null==a?void 0:a.files),null!=a&&a.sourceUrl&&(t.sourceUrl=null==a?void 0:a.sourceUrl),null!=a&&a.selectedCard&&(t.selectedCard=null==a?void 0:a.selectedCard),null!=a&&a.mini&&(t.mini=null==a?void 0:a.mini),n.contentWindow.postMessage(["lynxDataEvent",t],"*")}})}(t,function(e,t){return t.selectedCard=t.selectedCard||e.dataset.lynxSelectedCard,t.mini=t.mini||e.dataset.lynxMini,t.projectId=t.projectId||e.dataset.lynxProjectId,t}(t,d))}},remove:function(e){var t=e.querySelector("iframe[data-lynx-iframe]");t&&t.parentNode&&t.parentNode.removeChild(t)},initialize:function(){document.querySelectorAll("[data-lynx-id], [data-lynx-files], [data-lynx-source-url]").forEach(function(e){t.append(e)})}};"complete"===document.readyState?t.initialize():document.addEventListener("readystatechange",function(){"complete"===document.readyState&&t.initialize()}),window.LynxPlayer=t}}();
//# sourceMappingURL=embed.js.map
            `,
        },
      ],
    },
  },

  markdown: {
    link: {
      checkDeadLinks: {
        excludes: [
          '/api/lynx-api/gesture/index.html',
          '/api/lynx-api/gesture/fundamentals/installation.html',
        ],
      },
    },
  },

  themeConfig: {
    // 不同语言的配置
    // Configuration for different languages
    locales: [
      {
        lang: 'zh',
        title: 'Lynx',
        description: '用 Web 技术栈快速构建 Native 视图的高性能跨端框架',
        // 语言切换按钮的文案
        // Language switch button text
        label: '简体中文',
      },
      {
        lang: 'en',
        title: 'Lynx',
        description:
          'Powerful Cross-Platform Framework that builds native Apps with Web technologies',
        label: 'English',
      },
    ],
    socialLinks: [
      {
        icon: 'gitlab',
        mode: 'link',
        content: 'https://bits.bytedance.net/code/lynx/lynx-ui',
      },
    ],
    lastUpdated: true,
  },

  llms: true,
})
