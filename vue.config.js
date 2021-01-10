module.exports = {
    devServer: { //配置请求代理
        proxy: {
            '/': { //配置请求代理
                target: 'http://localhost:3000/'
                // target: 'http://123.57.223.218:3003/'
            }
        }

    }
};