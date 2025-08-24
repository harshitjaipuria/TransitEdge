import React from 'react'

const MessageComponent: React.FC<{ message: string }> = ({ message }) => {
  return <span dangerouslySetInnerHTML={{ __html: message }} />
}

export default MessageComponent
