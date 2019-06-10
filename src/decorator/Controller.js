const Pages = {};

const Controller = function(url, params) {
  if (!url) {
    throw new Error('需指定页面的URL');
  }
  if (Pages[url]) {
    throw new Error('URL已被注册：' + url);
  }
  return function(target) {
    Pages[url] = {
      params,
      target
    };
    target.__params = params;
  };
};
const getPages = () => Pages;

export { Controller as default, getPages };
