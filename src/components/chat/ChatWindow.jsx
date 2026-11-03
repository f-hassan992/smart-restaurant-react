// The chat: message list, suggested questions, and the input form.
import { useEffect, useRef, useState } from 'react';
import { useOrders } from '../../context/OrdersContext.jsx';
import { greeting, suggestedQuestions } from '../../data/chatbotData.js';
import { getBotReply } from '../../utils/getBotReply.js';
import ChatMessage from './ChatMessage.jsx';

function ChatWindow() {
  const { orders } = useOrders();

  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: greeting },
  ]);
  const [input, setInput] = useState('');
  const messageListRef = useRef(null);

  // Scroll the message list to the newest message after every change.
  useEffect(() => {
    const list = messageListRef.current;

    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [messages]);

  // Adds the customer's message and the assistant's reply together.
  const sendMessage = (text) => {
    const question = text.trim();

    if (question === '') {
      return;
    }

    const reply = getBotReply(question, orders);

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: currentMessages.length + 1, sender: 'user', text: question },
      { id: currentMessages.length + 2, sender: 'bot', text: reply },
    ]);

    setInput('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="chat-window">
      <div
        className="chat-messages"
        ref={messageListRef}
        role="log"
        aria-live="polite"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <div className="chat-suggestions">
        {suggestedQuestions.map((question) => (
          <button
            key={question}
            className="chat-suggestion"
            type="button"
            onClick={() => sendMessage(question)}
          >
            {question}
          </button>
        ))}
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <label className="visually-hidden" htmlFor="chat-input">
          Your question
        </label>

        <input
          id="chat-input"
          type="text"
          placeholder="Ask a question..."
          autoComplete="off"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="chat-send" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;