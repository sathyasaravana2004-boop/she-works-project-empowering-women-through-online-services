import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProviderOrdersPage.css";

const ProviderOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Dummy data — replace with backend fetch
    setOrders([
      {
        id: 1,
        customerName: "John Doe",
        service: "Home-cooked Meal",
        date: "2025-10-18",
        status: "Pending",
        stages: ["Ordered", "Accepted", "Processing", "Shipped", "Completed"],
        currentStage: 0,
      },
      {
        id: 2,
        customerName: "Jane Smith",
        service: "Embroidery Design",
        date: "2025-10-17",
        status: "Accepted",
        stages: ["Ordered", "Accepted", "Processing", "Shipped", "Completed"],
        currentStage: 2,
      },
      {
        id: 3,
        customerName: "Krishna",
        service: "Gift Wrapping",
        date: "2025-10-16",
        status: "Completed",
        stages: ["Ordered", "Accepted", "Processing", "Shipped", "Completed"],
        currentStage: 4,
      },
    ]);
  }, []);

  const passedOrder = location.state?.order;
  const visibleOrders = passedOrder
    ? orders.filter((o) => o.id === passedOrder.id)
    : orders;

  const toggleExpand = (id) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  const updateOrderStatus = (id, stageIndex) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              currentStage: stageIndex,
              status: o.stages[stageIndex],
            }
          : o
      )
    );
  };

  const handleChatClick = (orderId) => {
    navigate(`/provider/ProviderChat/${orderId}`);
  };

  const actionStages = ["ordered","Accepted", "Processing", "Shipped", "Completed"];

  return (
    <div className="provider-orders-page">
      <h2>📋 Manage Client Orders</h2>

      {visibleOrders.length === 0 ? (
        <p className="empty-note">
          {passedOrder
            ? "No order found for the selected booking."
            : "No orders yet."}
        </p>
      ) : (
        <div className="orders-list">
          {visibleOrders.map((order) => (
            <motion.div
              key={order.id}
              layout
              transition={{ layout: { duration: 0.4, type: "spring" } }}
              className="order-card-wrapper"
            >
              {/* Order Summary */}
              <motion.div
                layout
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => toggleExpand(order.id)}
                className={`order-card ${order.status.toLowerCase()}`}
              >
                <div className="order-info">
                  <h3>{order.customerName}</h3>
                  <p className="service-line">Service: {order.service}</p>
                  <p className="date-line">Date: {order.date}</p>
                </div>
                <div className={`status-tag ${order.status.toLowerCase()}`}>
                  {order.status}
                </div>
              </motion.div>

              {/* Tracking Section */}
              <AnimatePresence>
                {expandedOrder === order.id && (
                  <motion.div
                    key="tracking"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                    className="tracking-container"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="tracking-steps pipeline">
                      {/* Pipeline progress bar */}
                      <motion.div
                        className="pipeline-progress"
                        initial={{ width: "0%" }}
                        animate={{
                          width: `${
                            (order.currentStage / (order.stages.length - 1)) *
                            85
                          }%`,
                        }}
                        transition={{ duration: 0.6 }}
                      />

                      {order.stages.map((stage, index) => (
                        <div className="pipeline-step" key={stage}>
                          <motion.div
                            initial={{ scale: 1 }}
                            animate={{
                              scale: index <= order.currentStage ? 1.2 : 1,
                              backgroundColor:
                                index <= order.currentStage ? "#db2777" : "#f3f3f3",
                              borderColor:
                                index <= order.currentStage ? "#db2777" : "#ccc",
                            }}
                            transition={{ duration: 0.4 }}
                            className="circle"
                          />
                          <motion.div
                            className={`label ${
                              index <= order.currentStage ? "active" : ""
                            }`}
                            initial={{ opacity: 0.6 }}
                            animate={{
                              opacity: index <= order.currentStage ? 1 : 0.6,
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            {stage}
                          </motion.div>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons vertically */}
                    <div className="provider-actions-vertical">
                      {actionStages.map((stage, index) => (
                        <button
                          key={stage}
                          className={`btn action-btn ${
                            index <= order.currentStage ? "active" : ""
                          }`}
                          onClick={() => updateOrderStatus(order.id, index)}
                        >
                          {stage}
                        </button>
                      ))}

                      <button
                        className="btn-chat"
                        onClick={() => handleChatClick(order.id)}
                      >
                        💬 Chat with Client
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderOrdersPage;
