/** @type {import('webpack').Configuration} */
const path = require('path'); // Para trabajar con archivos y rutas de directorios
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // mode: 'production', // le pasamos explicitamente el modo desde el archivo
    entry: './src/index.js', // el punto de entrada de mi aplicación
    output: { // Esta es la salida de mi bundle
        path: path.resolve(__dirname, 'dist'),
        // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
        // para no tener conflictos entre Linux, Windows, etc
        filename: 'main.js', // EL NOMBRE DEL ARCHIVO FINAL,
    },
    resolve: {
        extensions: ['.js'] // LOS ARCHIVOS QUE WEBPACK VA A LEER
    },

    module: {
        rules: [
            {
                // Test declara que extensión de archivos aplicara el loader
                test: /\.m?js$/,
                // Exclude permite omitir archivos o carpetas especificas
                exclude: /node_modules/,
                // Use es un arreglo u objeto donde dices que loader aplicaras
                use: {
                    loader: "babel-loader"
                },
            }
        ],

    },
    plugins: [
        new HtmlWebpackPlugin({
            //title: 'Title of my page',
            inject: 'body',
            template: './public/index.html',
            filename: 'index.html',
            // minify: false,
            // xhtml: false,
            // hash: false, // If true then append a unique webpack compilation hash to all included scripts and CSS files. This is useful for cache busting
        })
    ]

}