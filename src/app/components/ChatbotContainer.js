export default function ChatbotContainer({ messages, chatbotIsTyping }) {
  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <div className={`message ${message.role == "user" ? "blue-background" : "gray-background"}`} key={index}>
          {message.parts.map((part) => part.text).join(" ")}
        </div>
      ))}
      <div className="typing-indicator" hidden={!chatbotIsTyping}>
        Chatbot is typing...
      </div>
    </div>
  );
}
