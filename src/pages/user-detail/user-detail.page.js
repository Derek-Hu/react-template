import React from 'react';
import Controller from '~/decorator/Controller';
import style from './style.module.less';

// 访问/user/1000 等路径时内容
@Controller('/user/:userId')
export default class extends React.Component {
  render() {
    console.log('路径参数:', this.props.match.params.userId);
    console.log('请求参数:', this.props);
    console.log('请求参数:', this.props.location.search);
    return <div className={style.root}> 详情页</div>;
  }
}
