import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item

const Login = ({
  login,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  const { loginLoading } = login

  const uri = 'https://raw.githubusercontent.com/kelekexiao123/blog-storage/master/avatar.jpg'

  function handleOk() {
    validateFieldsAndScroll((err, value) => {
      if (err) {
        return
      }
      console.log(value)
      dispatch({ type: 'login/login', payload: value })
    })
  }

  return (
    <div style={styles.login}>
      <div style={styles.loginView}>
        <div style={styles.loginHead}>
          <img style={styles.loginImg} src={uri} alt="img" />
          <span style={styles.loginText}>D.va IM 登录</span>
        </div>
        <div style={styles.loginBody}>
          <form style={{ width: '80%' }}>
            <FormItem hasFeedback>
              {
                getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input size="large" prefix={<Icon type="user" />} onPressEnter={handleOk} placeholder="请输入用户名" />)
              }
            </FormItem>
            <FormItem hasFeedback>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      hasFeedback: true,
                    },
                  ],
                })(<Input size="large" type="password" prefix={<Icon type="lock" />} onPressEnter={handleOk} placeholder="请输入密码" />)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>记住我</Checkbox>)
              }
              <Button
                style={styles.loginButton} type="primary" size="large"
                onClick={handleOk} loading={loginLoading}
              >登录</Button>
              或者 <a href="">现在注册!</a>
            </FormItem>
          </form>
        </div>

      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
}

const styles = {
  login: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(https://raw.githubusercontent.com/kelekexiao123/blog-storage/master/background_you%26i.jpg)',
    backgroundSize: '100% 100%',
  },
  loginView: {
    width: 320,
    height: 320,
    backgroundColor: 'rgba(0,111,111,0.3)',
    boxShadow: '0 0 50px rgba(0,111,111,0.2)',
  },
  loginHead: {
    width: 320,
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  loginImg: {
    width: 40,
    marginRight: 8,
  },
  loginText: {
    fontSize: 18,
  },
  loginBody: {
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
  },
}

// function mapStateToProps (state) {
//   return {
//     login: state.login
//   }
// }

export default connect(({ login }) => ({ login }))(Form.create()(Login))
