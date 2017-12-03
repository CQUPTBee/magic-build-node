# magic-build-node

> 模块管理系统后台

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 内置指令

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


### 目录说明
```

├─app
│  │  router.js // 路由文件
│  │  
│  ├─controller 
│  │  │  home.js
│  │  │  
│  │  └─api     // 接口相关controller
│  │          componentList.js
│  │          
│  ├─core   // 基础controller，均继承此controller
│  │      baseController.js
│  │      
│  ├─db     // 数据暂存目录，可在app.config中配置
│  │      .gitkeep
│  │      
│  ├─enums  // 常用枚举值
│  │      code.js
│  │      
│  ├─public // 静态资源文件夹
│  ├─service  // service层
│  │      componentList.js
│  │      
│  └─view // html或其他页面模版目录
├─config
│      config.default.js // 默认配置项
│      config.prod.js // 生产环境配置项
│      plugin.js
│      
├─logs // 日志暂存文件夹，可在app.config中配置
│  └─magic-build-node
│      
└─test // 测试用例目录
    └─app
        └─controller
                componentList.test.js
                home.test.js
                

```

[egg]: https://eggjs.org