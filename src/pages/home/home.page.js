import React from 'react';
import Controller from '~/decorator/Controller';
import style from './style.module.less';
import DocumentTitle from 'react-document-title';
import { getUserInfo } from '~/service/api';

// 访问根路径时的内容
@Controller('/')
export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    getUserInfo().then((userInfo) => {
      this.setState({
        userInfo,
      })
    }, () => {
      console.log('请求失败')
    })
  }
  render() {
    return (
      <div className={style.root}>
        <DocumentTitle title="这是标题" />
        <p>Home页</p>
        {
          this.state.userInfo ? <p>当前用户：{this.state.userInfo.email}</p> : null
        }
      </div>
    );
  }
}
