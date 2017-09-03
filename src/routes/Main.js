import React from 'react'
import { connect } from 'dva'
import { fetch } from 'dva/fetch'
import { Layout, Button, textarea, Row, Col, Avatar, notification } from 'antd';
import UsersSidebar from '../components/UsersSidebar';
import ChattingDisplay from '../components/ChattingDisplay';
import E from 'wangeditor'
import xss from 'xss'

const { Header, Content, Footer } = Layout;

class MainPanel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    }
  }
  static editor = null

  tabChange = (e) => {
    console.log(e);
    const userList = this.props.users.userList
    for (let i = 0; i < userList.length; i++) {
      if (e.item.props.account === userList[i].account) {
        this.props.dispatch({ 
          type: 'chatting/fetchChattingMsg', 
          payload: {user: userList[i], tab: e.key} 
        })
        return
      }
    }
  }

  handleSend = () => {
    if (this.editor.txt.text()) {
      const appendData = [{
        user: "Duang",
        htmlContent: xss(this.editor.txt.html())
      }]
      this.props.dispatch({ type: 'chatting/sendMsg', payload: appendData })
    } else {
      notification['error']({
        message: '聊天信息不能为空',
        duration: 2,
        style: {
          backgroundColor: "rgba(64,64,64,0.2)",
        },
      });
    }
    this.editor && this.editor.txt.clear()
  }
  handleClear = () => {
    this.editor && this.editor.txt.clear()
  }
  componentDidMount() {
    const element = this.refs.editor
    const editor = this.editor = new E(element)
    editor.customConfig.uploadImgShowBase64 = true    // 使用 base64 保存图片
    editor.customConfig.debug = true    // 通过 url 参数配置 debug 模式
    editor.customConfig.pasteFilterStyle = false    // 关闭粘贴样式的过滤
    editor.customConfig.menus = [
      'bold',  // 粗体
      'italic',  // 斜体
      'underline',  // 下划线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'emoticon',  // 表情
      'image',  // 插入图片
      'code',  // 插入代码
      'undo',  // 撤销
      'redo'  // 重复
    ]
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    // editor.customConfig.onchange = html => {
    //   this.setState({
    //     editorContent: xss(html)
    //   })
    // }
    editor.create()
  }
  render() {
    const uri = 'https://raw.githubusercontent.com/kelekexiao123/blog-storage/master/avatar.jpg'
    const chatting = this.props.chatting
    return (
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>
        <UsersSidebar
          handleClick={this.tabChange}
          initialTab={chatting.currentTab}
          userMsg={this.props.users}
        />
        <Layout>
          <Header
            style={{
              backgroundColor: '#fff', height: 60, display: 'inline-flex',
              alignItems: 'center', fontSize: '18px', color: 'black', paddingLeft: 16,
            }}
          >
            <Avatar style={{ marginRight: 10 }} src={uri} size="large" />
            <p>{chatting.currentUser.name}</p>
          </Header>
          <Content style={{ margin: '12px 16px' }}>
            <Row style={{ padding: 24, marginBottom: 12, background: '#fff', height: 450, minWidth: 500, overflow: 'auto' }}>
              <ChattingDisplay chattingData={this.props.chatting.chattingData} user={chatting.currentUser}></ChattingDisplay>
            </Row>
            <Row>
              <div ref="editor" style={{ textAlign: 'left', background: '#fff' }}></div>
            </Row>
            <Row
              type="flex"
              justify="end"
              gutter={16}
              style={{ padding: 10, margin: 0, background: '#fff', border: '1px solid #ccc', borderTop: '0' }}
            >
              <Col>
                <Button type="danger" onClick={this.handleClear}>清除</Button>
              </Col>
              <Col>
                <Button type="primary" onClick={this.handleSend}>发送</Button>
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            CL IM ©2017 Created by CL
        </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(({ users, chatting }) => ({ users, chatting }))(MainPanel)
