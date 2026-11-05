// The chat: message list, suggested questions, and the input form.
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useMenu } from '../../context/MenuContext.jsx';
import { useOrders } from '../../context/OrdersContext.jsx';
import { greeting, suggestedQuestions } from '../../data/chatbotData.js';
import { getBotReply } from '../../utils/getBotReply.js';
import ChatMessage from './ChatMessage.jsx';

function ChatWindow() {
  const { user } = useAuth();
  const { menuItems } = useMenu();
  const { orders } = useOrders();

  // Only this customer's orders (guests have userId null).
  const myOrders = orders.filter(
    (order) => order.userId === (user ? user.id : null)
  );

  // Logged-in customers get a greeting with their first name.
  const firstName = user ? user.name.split(' ')[0] : '';
  const startMessage = user
    ? greeting.replace('Hi!', `Hi ${firstName}!`)
    : greeting;

  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: startMessage },
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

    const reply = getBotReply(question, myOrders, user, menuItems);

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