// src/pages/provider/ProviderChat.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./ProviderChat.css";

export default function ProviderChat() {
  const { bookingId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Mock initial chat
  useEffect(() => {
    setMessages([
      { sender: "customer", text: "Hello! Is my booking confirmed?" },
      { sender: "provider", text: "Yes, I've accepted it." }
    ]);
  }, [bookingId]);

  // Send new message
  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { sender: "provider", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-page-wrapper">
      <div className="chat-card">
        {/* Chat header (without back button) */}
        <header className="chat-header">
          Chat with Customer (Booking #{bookingId})
        </header>

        {/* Chat messages */}
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${
                msg.sender === "provider" ? "sent" : "received"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="chat-input">
          <input
            type="text"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
