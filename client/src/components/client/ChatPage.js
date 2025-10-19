// src/pages/client/ChatPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import "./ChatPage.css";

const ChatPage = () => {
  const { providerId } = useParams();
  const [messages, setMessages] = useState([
    { sender: "provider", text: "Hello! How can I help you today?", time: "10:00 AM" },
    { sender: "client", text: "Hi! I want to book a gift wrapping service.", time: "10:02 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages([
        ...messages,
        { sender: "client", text: newMessage, time: currentTime },
      ]);
      setNewMessage("");
      setIsTyping(true);

      // Simulate provider response after delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "provider",
            text: "Sure, I’m available for that. What date are you thinking?",
            time: currentTime,
          },
        ]);
        setIsTyping(false);
      }, 1500);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-page-wrapper">
      <div className="chat-page">
        {/* Header */}
        <div className="chat-header">
        
          <div className="chat-header-info">
            <h3>Chat with Provider #{providerId}</h3>
            <p>Active now</p>
          </div>
        </div>

        {/* Chat Body */}
        <div className="chat-body">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`message ${msg.sender === "client" ? "sent" : "received"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bubble">
                <span className="avatar">
                  {msg.sender === "client" ? "🧑" : "👩‍🎨"}
                </span>
                <div>
                  <p>{msg.text}</p>
                  <span className="timestamp">{msg.time}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="typing-indicator received">
              <span className="avatar">👩‍🎨</span>
              <span className="dots">Typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="chat-input">
          <input
            type="text"
            value={newMessage}
            placeholder="Type your message..."
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSendMessage}
            className="send-btn"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
