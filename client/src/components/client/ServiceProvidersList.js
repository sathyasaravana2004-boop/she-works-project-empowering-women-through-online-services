// src/components/client/ServiceProvidersList.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./ServiceProvidersList.css";
import ClientProfileIcon from "./ClientProfileIcon";

// Mock providers data
const providers = [
  {
    id: 1,
    name: "Anitha Embroidery",
    category: "Embroidery",
    rating: 4.8,
    reviews: 12,
    image: "/assets/Providers/embroidery1.jpeg",
  },
  {
    id: 2,
    name: "Homely Meals by Priya",
    category: "Home Cooked Food",
    rating: 4.6,
    reviews: 20,
    image: "/assets/Providers/food1.jpeg",
  },
  {
    id: 3,
    name: "Crafty Hands",
    category: "Arts & Crafts",
    rating: 4.7,
    reviews: 9,
    image: "/assets/Providers/crafts1.jpeg",
  },
  // Add more providers per category...
];

const ServiceProvidersList = () => {
  const { category } = useParams();

  // filter providers by category
  const filteredProviders = providers.filter(
    (provider) => provider.category === category
  );

  return (
    <div className="providers-page">
      <div>
      <ClientProfileIcon />
      
      </div>
      <h1>Service Providers - {category.replace(/([A-Z])/g, " $1")}</h1>
      
      <div className="providers-grid">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <motion.div
              key={provider.id}
              className="provider-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <img src={provider.image} alt={provider.name} />
              <h2>{provider.name}</h2>
              <p>⭐ {provider.rating} ({provider.reviews} reviews)</p>
            </motion.div>
          ))
        ) : (
          <p>No providers available for this service yet.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceProvidersList;
