import React from 'react'
import { Row, Col, Avatar } from 'antd'
import PropTypes from 'prop-types'

const ChattingItem = ({ data, selfUser, toUser }) => {
  // const uri = 'https://raw.githubusercontent.com/kelekexiao123/blog-storage/master/avatar.jpg'
  if (data.user === selfUser.account) {
    return (
      <Row type="flex" justify="end" style={{ padding: 10 }}>
        <Col>
          <Row type="flex" justify="end">
            <p>{selfUser.name}</p>
          </Row>
          <Row>
            <div dangerouslySetInnerHTML={{ __html: data.htmlContent }}
              style={{ borderRadius: '5%', padding: 10, backgroundColor: 'rgb(158,234,106)', maxWidth: '300px' }}
            ></div>
          </Row>
        </Col>
        <Col>
          <Avatar shape="square" style={{ marginLeft: 10 }} src={selfUser.avatar} size="large" />
        </Col>
      </Row>
    )
  } else if (data.user === toUser.account) {
    return (
      <Row type="flex" style={{ padding: 10 }}>
        <Col>
          <Avatar shape="square" style={{ marginRight: 10 }} src={toUser.avatar} size="large" />
        </Col>
        <Col>
          <Row type="flex">
            <p>{toUser.name}</p>
          </Row>
          <Row>
            <div dangerouslySetInnerHTML={{ __html: data.htmlContent }}
              style={{ borderRadius: '5%', padding: 10, backgroundColor: 'rgb(236,236,236)', maxWidth: '300px' }}
            ></div>
          </Row>
        </Col>
      </Row>
    )
  } else {
    return <Row></Row>
  }
}

ChattingItem.propTypes = {
  selfUser: PropTypes.object,
  toUser: PropTypes.object,
  data: PropTypes.object,
}

export default ChattingItem
