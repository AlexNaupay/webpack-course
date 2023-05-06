/** @type {import('webpack').Configuration} */
const path = require('path'); // Para trabajar con archivos y rutas de directorios

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
    }
}