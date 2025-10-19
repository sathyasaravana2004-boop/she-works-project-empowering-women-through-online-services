// src/components/provider/ProviderChatListPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import "./ProviderChatListPage.css";

const ProviderChatListPage = () => {
  const navigate = useNavigate();

  const chats = [
    {
      id: 1,
      clientName: "Sahana Reddy",
      service: "Home-Cooked Meals",
      lastMessage: "Can you prepare it for tomorrow?",
      time: "10:45 AM",
      clientImage:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      clientName: "Priya Verma",
      service: "Handmade Jewelry",
      lastMessage: "Thank you! I’ll confirm the order soon.",
      time: "Yesterday",
      clientImage:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
  ];

  const handleChatClick = (id) => {
    navigate(`/provider/ProviderChat/${id}`); // Navigate to ProviderChatPage
  };

  return (
    <div className="provider-chat-list-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="chat-list-title"
      >
        💬 Client Conversations
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="chat-list-box"
      >
        {chats.map((chat) => (
          <motion.div
            key={chat.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => handleChatClick(chat.id)}
            className="chat-item"
          >
            <div className="chat-avatar-wrapper">
              <img
                src={chat.clientImage}
                alt={chat.clientName}
                className="chat-avatar"
              />
              <span className="chat-status-dot"></span>
            </div>

            <div className="chat-info">
              <h2>{chat.clientName}</h2>
              <p className="service">{chat.service}</p>
              <p className="last-message">{chat.lastMessage}</p>
            </div>

            <div className="chat-meta">
              <p className="chat-time">{chat.time}</p>
              <MessageCircle className="chat-icon" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProviderChatListPage;
