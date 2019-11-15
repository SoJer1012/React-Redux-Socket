const { override, fixBabelImports, addLessLoader, } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { "@brand-primary": "#1DA57A" }
    })
);