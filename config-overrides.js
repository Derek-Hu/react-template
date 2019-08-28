const webpack = require("webpack");
const path = require("path");
const git = require("git-rev-sync");
const configurations = require("./config");
const directoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const entries = require('./config-entry');
const multipleEntry = require('react-app-rewire-multiple-entry')(entries);

const {
  override,
  addBabelPlugin,
  useEslintRc,
  addWebpackAlias,
  overrideDevServer,
  babelInclude,
  addDecoratorsLegacy,
  removeModuleScopePlugin,
  fixBabelImports,
  addLessLoader
} = require("customize-cra");

module.exports = {
  webpack: override(
    addDecoratorsLegacy(),
    babelInclude([
      path.resolve("src"), // make sure you link your own source
    ]),
    fixBabelImports("import-antd", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true
    }),
    fixBabelImports("import-antd-mobile", {
      libraryName: "antd-mobile",
      libraryDirectory: "es",
      style: true
    }),
    useEslintRc(),
    addWebpackAlias({
      "~": path.resolve(__dirname, "src/"),
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        "@fill-body": "#f5f5f5",
        "@button-height": "45px",
        "@tabs-height": "47px",
        "@input-font-size": "16px",
        "@input-placeholder-color": "#E4E4E4",
        "@btn-disable-color": "#E4E4E4",
        "@input-color": "#333",
        "@modal-font-size-heading": "20px",
        "@brand-primary": "#00BC8D",
        "@primary-color": "#00BC8D",
        "@v-spacing-md": "10px",
        "@brand-primary-tap": "#00BC8D",
        "@brand-success": "#52cd4c",
        "@brand-error": "#f35833",
        "@brand-important": "#ff3b30",
        "@radius-xs": "2px",
        "@radius-sm": "2px",
        "@radius-md": "2px",
        "@radius-lg": "2px"
      }
    }),
    multipleEntry.addMultiEntry,
    config => {
      const envName = process.env.APP_NAME || 'local';

      config.plugins.push(
        new webpack.DefinePlugin({
          "process.env.config": JSON.stringify(configurations.env[envName]),
          "process.env.GIT_COMMIT": JSON.stringify(git.long()),
        }),
        new CircularDependencyPlugin({
          // exclude detection of files based on a RegExp
          exclude: /node_modules/,
          // add errors to webpack instead of warnings
          failOnError: true,
          // set the current working directory for displaying module paths
          cwd: process.cwd(),
        })
      );

      config.resolve.plugins.push(
        new directoryNamedWebpackPlugin(true)
      );
      return config;
    }
  ),
  // Proxy for Multiple Entry HTML Access in Development ENV
  devServer: overrideDevServer(multipleEntry.addEntryProxy)
} 
