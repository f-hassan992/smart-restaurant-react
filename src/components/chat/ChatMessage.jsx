// One chat bubble. The message comes in through props.
function ChatMessage({ message }) {
  return (
    <div className={`chat-message chat-message-${message.sender}`}>
      <span className="chat-sender">
        {message.sender === 'user' ? 'You' : 'Assistant'}
      </span>
      <p>{message.text}</p>
    </div>
  );
}

export default ChatMessage;