const glob = require("glob");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ConcatPlugin = require('webpack-concat-plugin');
var webpack = require('webpack');
const mode = process.env.NODE_ENV ? process.env.NODE_ENV == 'local' ? 'none' : process.env.NODE_ENV : 'development';
const ProgressBarPlugin = require('progress-bar-webpack-plugin');


const getFileLists = (...data) => {
    let ret = {};
    for ([i, obj] of Object.entries(data)) {
        let path = `${obj.base}${obj.src}`;
        pathList = glob.sync(path);
        for ([i, p] of Object.entries(pathList)) {
            let fileName = p.split('/').slice(-1)[0];
            /*
            if (mode == 'production') {
              fileName = fileName.split('.');
              fileName = `${fileName.slice(0, 1)}.min.${fileName.slice(1, 2)}`;
            }
            */
            let key = obj.dest + fileName;
            if (typeof obj.ext != "undefined") {
                key = key.replace(obj.src.split('.').slice(-1)[0].trim(), obj.ext);
            }

            if (typeof ret[key] == "undefined") {
                ret[key] = [p];
            } else {
                ret[key].push(p);
            }
        }
    }
    return ret;
}

const stylesheets = {
    base: "./assets/src/scss/pages/",
    src: "**/*.scss",
    dest: "./assets/build/css/",
    ext: "css"
};

const scripts = {
    base: "./assets/src/js/pages/",
    src: "**/*.js",
    dest: "./assets/build/js/"
};


let filesToTranspile = {};

filesToTranspile = getFileLists(scripts, stylesheets);

module.exports = {
    mode: mode,
    entry: filesToTranspile,
    output: {
        path: __dirname,
        filename: "[name]"
    },
    devtool: (mode == 'production') ? false : 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: ((mode == 'production') ? false : true),
                                url: false,
                                minimize: mode == "production" ? true : false
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: ((mode == 'production') ? false : true),
                                outputStyle: "expanded",
                                minimize: mode == "production" ? true : false
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),

        new ExtractTextPlugin({
            filename: getPath => {
                let path = getPath("[name]")
                    .replace("js", "css")
                    .replace("scss", "css");
                return path;
            },
            allChunks: true
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Popper: ["popper.js", "default"],
        }),

        new ConcatPlugin({
            uglify: false,
            sourceMap: ((mode == 'production') ? false : true),
            name: "vendors.css",
            outputPath: "../assets/build/css/",
            fileName: "[name]",
            filesToConcat: [
                "./node_modules/bootstrap/dist/css/bootstrap.min.css",
                "./node_modules/font-awesome/css/font-awesome.min.css",
            ]
        }),

        new CopyWebpackPlugin([
            { from: "./assets/src/img/", to: "../assets/build/img/" },
            {
                from: "./node_modules/font-awesome/fonts/",
                to: "../assets/build/fonts/"
            },
            // { from: "./assets/favicon.ico", to: "../assets/build/favicon.ico" },
        ])
    ]
};