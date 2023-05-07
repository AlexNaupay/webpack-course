/** @type {import('webpack').Configuration} */
const path = require('path'); // Para trabajar con archivos y rutas de directorios
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    // mode: 'production', // le pasamos explicitamente el modo desde el archivo
    entry: './src/index.js', // el punto de entrada de mi aplicación
    output: { // Esta es la salida de mi bundle
        path: path.resolve(__dirname, 'dist'),
        // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
        // para no tener conflictos entre Linux, Windows, etc
        //filename: 'main.js', // EL NOMBRE DEL ARCHIVO FINAL,
        filename: '[name].[contenthash].js',

        assetModuleFilename: 'assets/images/[hash][ext][query]'
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
            },
            {
                test: /\.css|\.styl$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {filename: 'static/images/[hash][ext][query]'},
            },
            {
                test: /\.(woff|woff2)$/, // REGLA PARA ARCHIVOS WOFF | WOFF2
                use: {
                    loader: 'url-loader', // NOMBRE DEL LOADER
                    options: {
                        //limit: false, // O LE PASAMOS UN NUMERO
                        limit: 10000, // O LE PASAMOS UN NUMERO
                        // Habilita o deshabilita la transformación de archivos en base64.
                        mimetype: 'aplication/font-woff',
                        // Especifica el tipo MIME con el que se alineará el archivo.
                        // Los MIME Types (Multipurpose Internet Mail Extensions)
                        // son la manera standard de mandar contenido a través de la red.
                        name: "[name].[contenthash].[ext]",
                        // EL NOMBRE INICIAL DEL PROYECTO + SU EXTENSIÓN
                        // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria
                        // ubuntu-regularhola.woff
                        outputPath: './assets/fonts/',
                        // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                        publicPath: './assets/fonts/',
                        // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                        esModule: false
                    }
                }
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
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({ // CONFIGURACIÓN DEL COPY PLUGIN
            patterns: [
                {
                    from: path.resolve(__dirname , "src" , 'assets/images'), // CARPETA A MOVER AL DIST
                    to: "assets/images" // RUTA FINAL DEL DIST
                }
            ]
        })
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }

}