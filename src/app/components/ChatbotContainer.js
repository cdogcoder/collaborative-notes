export default function ChatbotContainer({ messages, messageIdentifiers, chatbotIsTyping }) {
  const formatMessage = (message, index) => {
    const messageInArray = (JSON.parse((message.parts[0].text).replace(/(\r\n|\n|\r)/gm, "")));
    return (
      <div className="message gray-background summary" key={index}>
        {messageInArray.map((message, index) => {
          if (index == 1) {
            return (<div className="summary-section" key={index}>
              <p className="section-title"><strong>Key Insights</strong></p>
              {messageInArray[index].map((point, index) => {
                return <li key={index}>{point}</li>
              })}
            </div>)
          }
          return (<div className="summary-section" key={index}>
            <p className="section-title"><strong>{index == 0 ? "Main Ideas" : "Next Steps"}</strong></p>
            <p className="section-text">{messageInArray[index]}</p>
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
