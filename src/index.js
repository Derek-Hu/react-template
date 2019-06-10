import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Config, GIT_COMMIT } from '~/constant/config';
import { getPages } from '~/decorator/Controller';

function importAll(r) {
  r.keys().forEach(r);
}

// 加载src/pages目录下以.page.js结尾对文件，从而绑定路由
importAll(require.context('~/pages/', true, /\.page\.js$/));

const Pages = getPages();
ReactDOM.render(
  <Router>
    <div>
      <Switch>
        {Object.keys(Pages).map(url => (
          <Route key={url} path={url} component={Pages[url].target} />
        ))}
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);

console.log(`当前环境配置src/config.js内容:${JSON.stringify(Config)}`)
console.log(`当前代码版本:${GIT_COMMIT}`)