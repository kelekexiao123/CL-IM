import React from 'react'
import { Menu, Layout, Avatar, Button, Icon } from 'antd'
import PropTypes from 'prop-types'

const SubMenu = Menu.SubMenu
const ButtonGroup = Button.Group
const { Sider } = Layout

const UsersSidebar = ({ handleChange, initialTab, users }) => {
  // const uri = 'https://raw.githubusercontent.com/kelekexiao123/blog-storage/master/avatar.jpg'
  const htmlGroups = users.groups.map(function (groupName, groupIndex) {
    const htmlUserList = users.userList
      .filter(function (data, index) {
        return data.group === groupName
      })
      .map(function (data, index) {
        return (
          <Menu.Item account={data.account} key={data.account} style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar shape="square" style={{ marginRight: 10 }} src={data.avatar} />
            <span>{data.name}({data.account})</span>
          </Menu.Item>
        )
      })

    return (
      <SubMenu key={'sub' + groupIndex} title={groupName === 'default' ? '我的好友' : groupName}>
        {htmlUserList}
      </SubMenu>
    )
  })

  return (
    <Sider
      width="240"
      style={{ background: 'rgba(64,64,64,1)', flexDirection: 'column', display: 'inline-flex' }}
    >
      <div style={{ height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'white' }}>
        <Avatar src={users.self.avatar} size="large" style={{ marginRight: 10 }} />
        <p>欢迎您, {users.self.name}</p>
      </div>
      <ButtonGroup style={{ display: 'flex', justifyContent: 'center' }}>
        <Button ghost>
          <Icon type="user" />联系人
        </Button>
        <Button ghost>
          <Icon type="team" />群聊
        </Button>
      </ButtonGroup>
      <Menu
        theme="dark"
        onSelect={handleChange}
        width="240"
        selectedKeys={[initialTab]}
        mode="inline"
      >
        {htmlGroups}
      </Menu>
      <div style={{ display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }} />
    </Sider>
  )
}

UsersSidebar.propTypes = {
  handleChange: PropTypes.func,
  initialTab: PropTypes.string,
}

export default UsersSidebar
