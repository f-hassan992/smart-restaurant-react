// Chat page: a heading and the chat window.
import ChatWindow from '../../components/chat/ChatWindow.jsx';

function Chat() {
  return (
    <section className="chat-page">
      <header className="chat-heading">
        <h1>Chat</h1>
      </header>

      <ChatWindow />
    </section>
  );
}

export default Chat;