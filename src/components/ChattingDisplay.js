import React from 'react'
import PropTypes from 'prop-types'
import ChattingItem from './ChattingItem'

const ChattingDisplay = ({ chattingData, selfUser, toUser }) => {
  const htmlData = chattingData.map((data, index) =>
    <ChattingItem data={data} selfUser={selfUser} toUser={toUser} key={index}></ChattingItem>
  )
  return <div>{htmlData}</div>
}

ChattingDisplay.propTypes = {
  selfUser: PropTypes.object,
  toUser: PropTypes.object,
  chattingData: PropTypes.array,
}

export default ChattingDisplay
