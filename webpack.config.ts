import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts';
console.log('start');
const devServer: DevServerConfiguration = {
  static: {
    directory: path.resolve(__dirname, 'dist'),
  }, // webpack-dev-serverの公開フォルダ
  open: true, // サーバー起動時にブラウザを開く};
};
const entryPoint = {
  ts: './index.ts',
  react: './app.tsx',
  style: './scss/style.scss',
};
const isProduction = process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'minimize';
const skipMinimization = process.env.NODE_ENV == 'minimize';

const config: Configuration = {
  // モジュールバンドルを行う起点となるファイルの指定
  // 指定できる値としては、ファイル名の文字列や、それを並べた配列やオブジェクト
  // 下記はオブジェクトとして指定した例
  context: path.resolve(__dirname, 'src'),
  entry: {
    bundle: entryPoint.ts,
    app: entryPoint.react,
    style: entryPoint.style,
  },
  // モジュールバンドルを行った結果を出力する場所やファイル名の指定
  output: {
    path: path.resolve(__dirname, 'dist'), // "__dirname"はファイルが存在するディレクトリ
    filename: '[name].js', // [name]はentryで記述した名前（この設定ならbundle）
    // publicPath: 'https://hogehoge.com/assets',
  },

  // import文でファイル拡張子を書かずに名前解決するための設定
  // 例...「import World from './world'」と記述すると"world.ts"という名前のファイルをモジュールとして探す
  resolve: {
    extensions: ['.ts', 'tsx', '.js', 'jsx'], // Reactの.tsxや.jsxの拡張子も扱いたい場合は配列内に追加する
  },
  target: 'web',
  devServer,
  // モジュールに適用するルールの設定（ローダーの設定を行う事が多い）
  module: {
    rules: [
      {
        // 拡張子が.tsのファイルに対してTypeScriptコンパイラを適用する
        // Reactで用いる.tsxの拡張子にも適用する場合は test:/\.(ts|tsx)$/,
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false, // url()を変換しない
              // sourceMap: devMode,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              // sourceMap: devMode,
            },
          },
        ],
      },
    ],
  },
  plugins: [new RemoveEmptyScriptsPlugin(), new MiniCssExtractPlugin({ filename: 'style.css' })],
};

module.exports = () => {
  if (isProduction && !skipMinimization) {
    config.mode = 'production';
    console.log('production');
    // config.optimization = { minimizer: [new TerserPlugin({ terserOptions: { compress: { drop_console: true } } })] };
  } else if (isProduction && skipMinimization) {
    config.mode = 'production';
    console.log('production -> skip minimization');
    config.optimization = {
      minimize: false,
      usedExports: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {},
            compress: { drop_console: true },
            mangle: false, // Note `mangle.properties` is `false` by default.
          },
          extractComments: false,
        }),
      ],
    };
  } else {
    config.mode = 'development';
    // (config.optimization = {
    //   minimize: false,
    //   minimizer: [
    //     new TerserPlugin({
    //       terserOptions: {
    //         parse: {},
    //         compress: { drop_console: false },
    //         mangle: false, // Note `mangle.properties` is `false` by default.
    //       },
    //       extractComments: false,
    //     }),
    //   ],
    // })
    console.log('development');
    config.devtool = 'inline-source-map';
  }
  return config;
};
export default config;
