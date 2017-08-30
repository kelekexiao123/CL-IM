import React from 'react';
import { Menu, Icon, Layout, Avatar } from 'antd';
import { Link } from 'dva/router';
import PropTypes from 'prop-types'

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

const UsersSidebar = ({ handleClick, initialTab }) => {
  const uri = 'https://raw.githubusercontent.com/kelekexiao123/blog-storage/master/avatar.jpg'

  return (
    <Sider
      // collapsible
      // collapsed={collapsed}
      // onCollapse={onCollapse}
      width="240"
      style={{ background: 'rgba(64,64,64,1)', flexDirection: 'column', display: 'inline-flex' }}
    >
      <div style={{ height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', color: 'white' }}>
        <Avatar src={uri} size="large" style={{marginRight: 10}}/>
        <p>欢迎您, Duang</p>
      </div>
      <Menu
        theme="dark"
        onClick={handleClick}
        width="240"
        defaultOpenKeys={['sub1']}
        selectedKeys={[initialTab]}
        mode="inline"
      >
        <SubMenu key="sub1" title={<span><Icon type="user" /><span>在线好友</span></span>}>
          <SubMenu key="sub3" title="好友分组">
            <Menu.Item key="1">
              张三
            </Menu.Item>
            <Menu.Item key="2">
              李四
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="3">
            王五
          </Menu.Item>
          <Menu.Item key="4">
            赵六
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="disconnect" /><span>离线好友</span></span>}>
          <SubMenu key="sub4" title="好友分组">
            <Menu.Item key="7">
              钱七
            </Menu.Item>
            <Menu.Item key="8">
              丈八
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            金九
          </Menu.Item>
          <Menu.Item key="6">
            <Link to={'/path'}>银十</Link>
          </Menu.Item>
        </SubMenu>
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
