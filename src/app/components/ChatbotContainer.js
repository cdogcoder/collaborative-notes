export default function ChatbotContainer({ messages, chatbotIsTyping }) {
  const formatMessage = (message, index) => {
    const messageInJSON = JSON.parse((message.parts[0].text).replace(/(\r\n|\n|\r)/gm, "").replace("```json", "").replace('```', ""));
    console.log(messageInJSON['Main Ideas'])
    return (
      <div className="message gray-background" key={index}>
        {Object.keys(messageInJSON).map((message) => {
          return (<div className="summary-section">
            <p className="section-title"><strong>{message}</strong></p>
            <p className="section-text">{messageInJSON[message]}</p>
          </div>)
        })}
      </div>
    )
  }

  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        index == 0 ? formatMessage(message, index) : <div className={`message ${message.role == "user" ? "blue-background" : "gray-background"}`} key={index}>
          {message.parts.map((part) => part.text).join("")}
        </div>
      ))}
      <div className="typing-indicator" hidden={!chatbotIsTyping}>
        Chatbot is typing...
      </div>
    </div>
  );
}
