module.exports = {
    // outputDir: '../server/web',
    publicPath: process.env.NODE_ENV === 'production' ?
        '/web2/' :
        '/'
}
// module.exports = {
//     outputDir: './dist',
//     publicPath: process.env.NODE_ENV === 'production' ?
//         '/' : '/'
// }