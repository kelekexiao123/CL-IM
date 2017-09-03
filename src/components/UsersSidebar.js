import React from 'react';
import { Menu, Icon, Layout, Avatar, Row, Col } from 'antd';
import { Link } from 'dva/router';
import PropTypes from 'prop-types'
import { fetch } from 'dva/fetch'

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

const UsersSidebar = ({ handleClick, initialTab, userMsg }) => {
  const uri = 'https://raw.githubusercontent.com/kelekexiao123/blog-storage/master/avatar.jpg'
  const htmlGroups = userMsg.groups.map(function (groupName, groupIndex) {
    const htmlUserList = userMsg.userList
      .filter(function (data, index) {
        return data.group === groupName
      })
      .map(function (data, index) {
        return (
          <Menu.Item account={data.account} key={"sub" + groupIndex + ' ' + index} style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar shape="square" style={{ marginRight: 10 }} src={data.avatar} />
            <span>{data.name}({data.account})</span>
          </Menu.Item>
        )
      })

    return (
      <SubMenu key={"sub" + groupIndex} title={groupName === 'default' ? '我的好友' : groupName}>
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
        <Avatar src={uri} size="large" style={{ marginRight: 10 }} />
        <p>欢迎您, Duang</p>
      </div>
      <Menu
        theme="dark"
        onClick={handleClick}
        width="240"
        selectedKeys={[initialTab]}
        mode="inline"
      >
        {htmlGroups}
      </Menu>
      <div style={{ display: 'flex', flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }} />
    </Sider>
  );
};

UsersSidebar.propTypes = {
  handleClick: PropTypes.func,
  initialTab: PropTypes.string,
};

export default UsersSidebar;
