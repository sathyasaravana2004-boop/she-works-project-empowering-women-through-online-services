// src/components/chat/ChatListPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import "./ChatListPage.css";

const ChatListPage = () => {
  const navigate = useNavigate();

  const chats = [
    {
      id: 1,
      providerName: "Priya Sharma",
      service: "Handmade Embroidery",
      lastMessage: "Thank you! I'll deliver it by Monday.",
      time: "10:45 AM",
      providerImage:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      providerName: "Ananya Gupta",
      service: "Home-cooked Tiffin Service",
      lastMessage: "Sure, I’ll pack an extra portion!",
      time: "Yesterday",
      providerImage:
        "https://images.unsplash.com/photo-1502767089025-6572583495b0?w=100&h=100&fit=crop",
    },
  ];

  const handleChatClick = (id) => {
    navigate(`/chats/${id}`); // ✅ navigate to ChatPage
  };

  return (
    <div className="chat-list-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="chat-list-title"
      >
        💬 Your Conversations
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="chat-list-box"
      >
        {chats.map((chat, index) => (
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
                src={chat.providerImage}
                alt={chat.providerName}
                className="chat-avatar"
              />
              <span className="chat-status-dot"></span>
            </div>

            <div className="chat-info">
              <h2>{chat.providerName}</h2>
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

export default ChatListPage;
