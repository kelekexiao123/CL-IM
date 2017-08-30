import React from 'react';
import { Row, Col, Avatar } from 'antd';
import PropTypes from 'prop-types'

const ChattingItem = ({ htmlContent, user }) => {
  const uri = 'https://raw.githubusercontent.com/kelekexiao123/blog-storage/master/avatar.jpg'
  if (user === 'Duang') {
    return (
      <Row type="flex" justify="end" style={{ padding: 10 }}>
        <Col>
          <Row type="flex" justify="end">
            <p>{user}</p>
          </Row>
          <Row>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }}
              style={{ borderRadius: "5%", padding: 10, backgroundColor: "rgb(158,234,106)", maxWidth: "300px" }}
            ></div>
          </Row>
        </Col>
        <Col>
          <Avatar shape="square" style={{ marginLeft: 10 }} src={uri} size="large" />
        </Col>
      </Row>
    )
  } else {
    return (
      <Row type="flex" style={{ padding: 10 }}>
        <Col>
          <Avatar shape="square" style={{ marginRight: 10 }} src={uri} size="large" />
        </Col>
        <Col>
          <Row type="flex">
            <p>{user}</p>
          </Row>
          <Row>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }}
              style={{ borderRadius: "5%", padding: 10, backgroundColor: "rgb(236,236,236)", maxWidth: "300px" }}
            ></div>
          </Row>
        </Col>
      </Row>
    )
  }
}

ChattingItem.propTypes = {
  htmlContent: PropTypes.string,
  user: PropTypes.string,
};

export default ChattingItem;
