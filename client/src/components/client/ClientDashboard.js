import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ClientDashboard.css';

const services = [
  {
    id: 1,
    category: 'Embroidery',
    title: 'Embroidery',
    description: 'Elegant handcrafted embroidery with unique designs.',
    image: '/assets/ServiceImages/Embriodrey.jpeg',
  },
  {
    id: 2,
    category: 'Home Cooked Food',
    title: 'Home Cooked Food',
    description: 'Fresh, hygienic, and delicious homemade meals.',
    image: '/assets/ServiceImages/Foods.jpeg',
  },
  {
    id: 3,
    category: 'Custom Gifts',
    title: 'Custom Gifts',
    description: 'Personalized gifts crafted with love for every occasion.',
    image: '/assets/ServiceImages/Gifts.jpeg',
  },
  {
    id: 4,
    category: 'Arts & Crafts',
    title: 'Arts & Crafts',
    description: 'Creative handmade décor and craft items.',
    image: '/assets/ServiceImages/arts&crafts.jpeg',
  },
  {
    id: 5,
    category: 'Fashion & Tailoring',
    title: 'Fashion & Tailoring',
    description: 'Stylish custom stitching and alterations.',
    image: '/assets/ServiceImages/Tailoring.jpeg',
  },
  {
    id: 6,
    category: 'Beauty & Wellness',
    title: 'Beauty & Wellness',
    description: 'Professional beauty care and wellness services at home.',
    image: '/assets/ServiceImages/Beuty&wellness.jpeg',
  },
  {
    id: 7,
    category: 'Sugar Bloom',
    title: 'Sugar Bloom',
    description: 'Personalized learning support for all ages.',
    image: '/assets/ServiceImages/sugar-bloom.png',
  },
  {
    id: 8,
    category: 'Event Decoration',
    title: 'Event Decoration',
    description: 'Beautiful and budget-friendly event decorations.',
    image: '/assets/ServiceImages/Event.jpeg',
  },
  
  {
    id: 9,
    category: 'Home Gardening Kits',
    title: 'Home Gardening Kits',
    description: 'Expert care and setup for your home garden, from plants to maintenance.',
    image: '/assets/ServiceImages/Gardening.jpeg',
  },
  {
    id: 10,
    category: 'Traditional Festival Kits',
    title: 'Traditional Festival Kits',
    description: 'Ready-made kits for rituals and festive needs.',
    image: '/assets/ServiceImages/Festive.jpeg',
  },

];

const ClientDashboard = () => {
  return (
      
    <div className="client-dashboard">
      <h1> Services</h1>
      <div className="service-grid">
        {services.map((service) => (
          <motion.div
            key={service.id}
            className="service-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <Link to={`/services/${service.category}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={service.image} alt={service.title} />
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClientDashboard;
