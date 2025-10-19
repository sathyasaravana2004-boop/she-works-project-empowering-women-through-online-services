import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ClientOrdersPage.css";

const ClientOrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: 1,
      providerName: "Priya Sharma",
      service: "Handmade Embroidery",
      status: "Processing",
      orderDate: "2025-10-12",
      deliveryDate: "2025-10-20",
      stages: ["Ordered", "Accepted", "Processing", "Shipped", "Completed"],
      currentStage: 2,
    },
    {
      id: 2,
      providerName: "Ananya Gupta",
      service: "Home Cooked Tiffin",
      status: "Pending",
      orderDate: "2025-10-15",
      deliveryDate: "2025-10-21",
      stages: ["Ordered", "Accepted", "Processing", "Shipped", "Completed"],
      currentStage: 0,
    },
  ];

  const handleToggle = (id) => {
    setSelectedOrder(selectedOrder === id ? null : id);
  };

  return (
    <div className="client-orders-page">
      <h2>📦 Your Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            layout
            transition={{ layout: { duration: 0.4, type: "spring" } }}
            className="order-wrapper"
          >
            <motion.div
              layout
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleToggle(order.id)}
              className={`order-card ${order.status.toLowerCase()}`}
            >
              <div className="order-info">
                <h3>{order.providerName}</h3>
                <p>{order.service}</p>
                <p className="dates">
                  Order: {order.orderDate} | Delivery: {order.deliveryDate}
                </p>
              </div>
              <div className={`status-tag ${order.status.toLowerCase()}`}>
                {order.status}
              </div>
            </motion.div>

            <AnimatePresence>
              {selectedOrder === order.id && (
                <motion.div
                  key="tracking"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="tracking-container"
                >
                  {order.stages.map((stage, index) => (
                    <div key={index} className="tracking-step">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: index <= order.currentStage ? 1.1 : 1,
                        }}
                        className={`circle ${
                          index <= order.currentStage ? "active" : ""
                        }`}
                      ></motion.div>
                      <p
                        className={`label ${
                          index <= order.currentStage ? "active" : ""
                        }`}
                      >
                        {stage}
                      </p>
                      {index < order.stages.length - 1 && (
                        <div
                          className={`line ${
                            index < order.currentStage ? "active" : ""
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClientOrdersPage;
