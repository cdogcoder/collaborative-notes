export default function ChatbotContainer({ messages, messageIdentifiers, chatbotIsTyping }) {
  const formatMessage = (message, index) => {
    const messageInJSON = JSON.parse((message.parts[0].text).replace(/(\r\n|\n|\r)/gm, "").replace("```json", "").replace('```', ""));
    return (
      <div className="message gray-background summary" key={index}>
        {Object.keys(messageInJSON).map((message, index) => {
          if (message == "Key Insights") {
            return (<div className="summary-section" key={index}>
              <p className="section-title"><strong>{message}</strong></p>
              {messageInJSON[message].map((point, index) => {
                return <li key={index}>{point}</li>
              })}
            </div>)
          }
          return (<div className="summary-section" key={index}>
            <p className="section-title"><strong>{message}</strong></p>
            <p className="section-text">{messageInJSON[message]}</p>
          </div>)
        })}
      </div>
    )
  }

  return (
    <div className="messages-container can-change">
      {messages.map((message, index) => (
        messageIdentifiers[index] == 1 ? formatMessage(message, index) : <div className={`message ${message.role == "user" ? "blue-background" : "gray-background"}`} key={index}>
          {message.parts.map((part) => part.text).join("")}
        </div>
      ))}
      <div className="typing-indicator" hidden={!chatbotIsTyping}>
        Chatbot is typing...
      </div>
    </div>
  );
}
