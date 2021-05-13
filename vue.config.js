const Dotenv = require('dotenv-webpack');

require('dotenv-defaults').config();

module.exports = {
    css: {
        extract: false
    },
    configureWebpack: {
        plugins: [
            new Dotenv({
                        defaults: true,
                        silent:false,
                        safe:false,
                        allowEmptyValues:false,
                    })
          ],
    },
    chainWebpack: config =>{
        config.externals();
        
    },
      devServer: {
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
          }
    },
    
}