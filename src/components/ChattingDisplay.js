import React from 'react';
import { Row, Col, Avatar } from 'antd';
import PropTypes from 'prop-types'
import ChattingItem from './ChattingItem'

const ChattingDisplay = ({ chattingData }) => {
  const htmlData = chattingData.map((data, index) =>
    <ChattingItem htmlContent={data.htmlContent} user={data.user} key={index}></ChattingItem>
  )
  return (<div>{htmlData}</div>)
}

ChattingDisplay.propTypes = {
  chattingData: PropTypes.array,
};

export default ChattingDisplay;
