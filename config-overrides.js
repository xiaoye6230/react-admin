const { override, fixBabelImports, addLessLoader, addBabelPlugins } = require('customize-cra');

module.exports = override(
  //antd中样式按需加载的一个插键
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),

  //less配置
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
 }),

 //装饰器的配置
 addBabelPlugins(
  [
    "@babel/plugin-proposal-decorators",
    {
      "legacy": true
    }
  ]
)
);