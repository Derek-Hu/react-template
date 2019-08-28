import '~/common/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import '~/global.scss';
import { getPages } from '~/decorator/Controller';

function importAll(r) {
  r.keys().forEach(r);
}

export default function RenderDom(filepath) {
  // 绑定路由
  filepath && importAll(filepath);
  const Pages = getPages();
  return ReactDOM.render(
    <Router>
      <div>
        <Switch>
          {Object.keys(Pages).map(url => (
            <Route exact key={url} path={url} component={Pages[url].target} />
          ))}
        </Switch>
      </div>
    </Router>,
    document.getElementById('root')
  );
}
console.warn(process.env.GIT_COMMIT);
