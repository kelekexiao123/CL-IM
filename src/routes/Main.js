import React from 'react'
import { connect } from 'dva'
import { Layout, Button, Row, Col, Avatar, message, notification } from 'antd'
import UsersSidebar from '../components/UsersSidebar'
import ChattingDisplay from '../components/ChattingDisplay'
import E from 'wangeditor'
import xss from 'xss'
import { browserHistory } from 'react-router'

const { Header, Content, Footer } = Layout

class MainPanel extends React.Component {
  static editor = null
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
  componentWillReceiveProps(nextProps) {
    if (this.props.chatting.alertMsg !== nextProps.chatting.alertMsg) {
      const { from, description } = nextProps.chatting.alertMsg
      const btn = (
        <Button type="primary" size="small" onClick={() => {
          notification.close()
        }}>
          查看新消息
        </Button>
      )
      notification['info']({
        message: `收到了来自${from}的新消息。`,
        description,
        duration: 5,
        btn,
      })
      const friendsArr = this.props.users.userList
      for (let i = 0; i < friendsArr.length; i++) {
        if (friendsArr[i].account === from) {
          this.props.dispatch({
            type: 'users/addUnreadNum',
            payload: from
          })
          break
        }
      }
    }
  }
  tabChange = (e) => {
    console.log('tabchange')
    const userList = this.props.users.userList
    for (let i = 0; i < userList.length; i++) {
      if (e.key === userList[i].account) {
        browserHistory.push(`/main?account=${this.props.users.self.account}&toAccount=${userList[i].account}`)
        this.props.dispatch({
          type: 'chatting/fetchChattingMsg',
          payload: { user: userList[i], tab: e.key }
        })
        this.props.dispatch({
          type: 'users/afterRead',
          payload: userList[i].account
        })
        break
      }
    }
    this.editor && this.editor.txt.clear()
  }

  handleSend = () => {
    if (this.editor.txt.text()) {
      const appendData = {
        fromUser: this.props.users.self.account,
        toUser: this.props.chatting.toUser.account,
        htmlContent: xss(this.editor.txt.html()),
      }
      this.props.dispatch({ type: 'chatting/putChattingMsg', payload: appendData })
    } else {
      message.warning('聊天信息不能为空')
    }
    this.editor && this.editor.txt.clear()
  }
  handleClear = () => {
    this.editor && this.editor.txt.clear()
  }
  render() {
    const chatting = this.props.chatting
    return (
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>
        <UsersSidebar
          handleChange={this.tabChange}
          initialTab={chatting.currentTab}
          users={this.props.users}
        />
        <Layout style={{ height: '100%' }}>
          <Header
            style={{
              backgroundColor: '#fff', height: 60, display: 'inline-flex',
              alignItems: 'center', fontSize: '18px', color: 'black', paddingLeft: 16,
            }}
          >
            <Avatar style={{ marginRight: 10 }} src={chatting.toUser.avatar} size="large" />
            <p>{chatting.toUser.name}</p>
          </Header>
          <Content style={{ margin: '12px 16px' }}>
            <Row style={{ padding: 24, marginBottom: 12, background: '#fff', height: 400, minWidth: 500, overflow: 'auto' }}>
              <ChattingDisplay chattingData={chatting.chattingData} selfUser={this.props.users.self} toUser={chatting.toUser}></ChattingDisplay>
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
                <Button type="danger" onClick={this.handleClear}>
                  清除
                </Button>
              </Col>
              <Col>
                <Button type="primary" onClick={this.handleSend}>
                  发送
                </Button>
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            CL IM ©2017 Created by CL
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(({ users, chatting }) => ({ users, chatting }))(MainPanel)
