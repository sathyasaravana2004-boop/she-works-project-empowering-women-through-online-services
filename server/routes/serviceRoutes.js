// const express = require('express');
// const router = express.Router();
// const Service = require('../models/service');
// const categories = require('../data/categories');

// // Create a service
// router.post('/', async (req, res) => {
//   try {
//     const service = new Service(req.body);
//     await service.save();
//     res.status(201).json(service);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Get all services
// router.get('/', async (req, res) => {
//   try {
//     const services = await Service.find().populate('provider', 'name email location');
//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get all categories and subservices
// router.get('/categories', (req, res) => {
//   res.json(categories);
// });

// // Get services by category and subservice
// router.get('/category/:category/subservice/:subservice', async (req, res) => {
//   try {
//     const { category, subservice } = req.params;

//     // Case-insensitive search
//     const services = await Service.find({
//       category: { $regex: new RegExp(category, "i") },
//       subservices: { $in: [new RegExp(subservice, "i")] }
//     }).populate('provider', 'name email location');

//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get services by provider (for profile view)
// router.get('/provider/:id', async (req, res) => {
//   try {
//     const services = await Service.find({ provider: req.params.id })
//       .populate('provider', 'name email location');
//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// module.exports = router;


// routes/serviceRoutes.js
// const express = require('express');
// const router = express.Router();
// const Service = require('../models/service');
// const User = require('../models/user'); // to get provider info
// const categories = require('../data/categories'); // optional, for fetching category list
// const jwt = require('jsonwebtoken');

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: 'No token provided' });

//   const token = authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Invalid token' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: 'Token invalid or expired' });
//     req.userId = decoded.id;
//     next();
//   });
// };

// // Create a service (provider only)
// router.post('/', verifyToken, async (req, res) => {
//   try {
//     const { service, subservices, description, price, location } = req.body;

//     if (!service || !subservices || !description || !price || !location) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const provider = await User.findById(req.userId);
//     if (!provider || provider.role !== 'provider') {
//       return res.status(403).json({ message: 'Only service providers can create services' });
//     }

//     const newService = new Service({
//       title: service,
//       subservices,
//       description,
//       price,
//       location,
//       provider: provider._id,
//     });

//     await newService.save();
//     res.status(201).json(newService);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Get all services
// router.get('/', async (req, res) => {
//   try {
//     const services = await Service.find().populate('provider', 'name email location');
//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Get all categories and subservices
// router.get('/categories', (req, res) => {
//   res.json(categories);
// });

// // Get services by category and subservice
// router.get('/category/:category/subservice/:subservice', async (req, res) => {
//   try {
//     const { category, subservice } = req.params;

//     const services = await Service.find({
//       title: { $regex: new RegExp(category, "i") },
//       subservices: { $in: [new RegExp(subservice, "i")] }
//     }).populate('provider', 'name email location');

//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// module.exports = router;


// // backend/routes/serviceRoutes.js
// const express = require('express');
// const router = express.Router();
// const Service = require('../models/service');
// const User = require('../models/user'); // To get provider info
// const categories = require('../data/categories'); // Optional: list of categories
// const jwt = require('jsonwebtoken');

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: 'No token provided' });

//   const token = authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Invalid token' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: 'Token invalid or expired' });
//     req.userId = decoded.id;
//     next();
//   });
// };

// // Create a new service (provider only)
// router.post('/', verifyToken, async (req, res) => {
//   try {
//     const { service, subservices, description, price, location } = req.body;

//     if (!service || !subservices || !description || !price || !location) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Get provider info
//     const provider = await User.findById(req.userId);
//     if (!provider || provider.role !== 'provider') {
//       return res.status(403).json({ message: 'Only service providers can create services' });
//     }

//     const newService = new Service({
//       title: service,
//       subservices,
//       description,
//       price,
//       location,
//       provider: provider._id,
//     });

//     await newService.save();
//     res.status(201).json(newService);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Get all services
// router.get('/', async (req, res) => {
//   try {
//     const services = await Service.find().populate('provider', 'name email location');
//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Get all categories and subservices
// router.get('/categories', (req, res) => {
//   res.json(categories);
// });

// // Get services by category and subservice
// router.get('/category/:category/subservice/:subservice', async (req, res) => {
//   try {
//     const { category, subservice } = req.params;

//     const services = await Service.find({
//       title: { $regex: new RegExp(category, "i") },
//       subservices: { $in: [new RegExp(subservice, "i")] }
//     }).populate('provider', 'name email location');

//     res.json(services);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// const express = require('express');
// const router = express.Router();

// // 🔹 Import controller
// const { createService } = require('../controllers/serviceController');

// // 🔹 Middlewares
// const { protect } = require('../middleware/authMiddleware'); // JWT auth
// const upload = require('../middleware/uploadMiddleware');   // Multer config

// const Service = require('../models/service');
// const User = require('../models/user');
// const categories = require('../data/categories');

// // ✅ Create a new service (with images, provider only)
// router.post("/", protect, upload.array("images", 5), createService);

// // ✅ Get all services
// router.get('/', async (req, res) => {
//   try {
//     const services = await Service.find().populate('provider', 'name email location');
//     res.json(services);
//   } catch (err) {
//     console.error("Error fetching services:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ✅ Get all categories
// router.get('/categories', (req, res) => {
//   res.json(categories);
// });

// // ✅ Get services by category & subservice
// router.get('/category/:category/subservice/:subservice', async (req, res) => {
//   try {
//     const { category, subservice } = req.params;

//     const services = await Service.find({
//       title: { $regex: new RegExp(category, "i") },
//       subservices: { $in: [new RegExp(subservice, "i")] }
//     }).populate('provider', 'name email location');

//     res.json(services);
//   } catch (err) {
//     console.error("Error fetching category services:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ✅ Get services of a specific provider
// router.get('/provider/:providerId', async (req, res) => {
//   try {
//     const services = await Service.find({ provider: req.params.providerId });
//     res.json(services);
//   } catch (err) {
//     console.error("Error fetching provider services:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ✅ Delete a service (only provider who created it)
// router.delete('/:id', protect, async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) return res.status(404).json({ message: "Service not found" });

//     if (service.provider.toString() !== req.user.id) {
//       return res.status(403).json({ message: "You are not authorized to delete this service" });
//     }

//     await service.deleteOne();
//     res.json({ message: "Service deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting service:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();

// // 🔹 Import controller
// const { createService } = require('../controllers/serviceController');

// // 🔹 Middlewares
// const { protect } = require('../middleware/authMiddleware'); // JWT auth
// const upload = require('../middleware/uploadMiddleware');   // Multer config

// const Service = require('../models/service');
// const categories = require('../data/categories');

// // ✅ Create a new service (with images, provider only)
// router.post("/", protect, upload.array("images", 5), createService);

// // ✅ Get all services
// router.get('/', async (req, res) => {
//   try {
//     const services = await Service.find().populate('user', 'name email contact location');
//     res.json(services);
//   } catch (err) {
//     console.error("Error fetching services:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ✅ Get all categories
// router.get('/categories', (req, res) => {
//   res.json(categories);
// });

// // ✅ Get services by category & subservice
// router.get('/category/:category/subservice/:subservice', async (req, res) => {
//   try {
//     const { category, subservice } = req.params;

//     const services = await Service.find({
//       service: { $regex: new RegExp(category, "i") },
//       subservices: { $in: [new RegExp(subservice, "i")] }
//     }).populate('user', 'name email contact location');

//     res.json(services);
//   } catch (err) {
//     console.error("Error fetching category services:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ✅ Get services of a specific provider
// router.get('/provider/:providerId', async (req, res) => {
//   try {
//     const services = await Service.find({ user: req.params.providerId });
//     res.json(services);
//   } catch (err) {
//     console.error("Error fetching provider services:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ✅ Delete a service (only provider who created it)
// router.delete('/:id', protect, async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) return res.status(404).json({ message: "Service not found" });

//     if (service.user.toString() !== req.user.id) {
//       return res.status(403).json({ message: "You are not authorized to delete this service" });
//     }

//     await service.deleteOne();
//     res.json({ message: "Service deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting service:", err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// module.exports = router;


// // backend/routes/serviceRoutes.js
// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/uploadMiddleware');
// const { protect } = require('../middleware/authMiddleware');
// const serviceController = require('../controllers/serviceController');
// const categories = require('../data/categories'); // if you have this file already

// // create with images (provider only)
// router.post('/', protect, upload.array('images', 6), serviceController.createService);

// // update (edit) service/profile (provider)
// router.put('/:id', protect, upload.array('images', 6), serviceController.updateService);

// // get all (optional)
// router.get('/', async (req, res) => {
//   // you can keep / get all if desired
//   const Service = require('../models/service');
//   const services = await Service.find().populate('provider', 'name email location');
//   res.json(services);
// });

// // categories
// router.get('/categories', (req, res) => {
//   res.json(categories);
// });

// // get by category/subservice
// router.get('/category/:category/subservice/:subservice', async (req, res) => {
//   const Service = require('../models/service');
//   const { category, subservice } = req.params;
//   const services = await Service.find({
//     title: { $regex: new RegExp(category, 'i') },
//     subservices: { $in: [new RegExp(subservice, 'i')] }
//   }).populate('provider', 'name email location');
//   res.json(services);
// });

// // get services by provider
// router.get('/provider/:providerId', serviceController.getServicesByProvider);

// // delete
// router.delete('/:id', protect, async (req, res) => {
//   const Service = require('../models/service');
//   const service = await Service.findById(req.params.id);
//   if (!service) return res.status(404).json({ message: 'Not found' });
//   if (service.provider.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
//   await service.deleteOne();
//   res.json({ message: 'Deleted' });
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/uploadMiddleware');
// const { protect } = require('../middleware/authMiddleware');
// const serviceController = require('../controllers/serviceController');
// const categories = require('../data/categories');

// // Create new service (Provider)
// router.post('/', protect, upload.array('images', 6), serviceController.createService);

// // Update existing service
// router.put('/:id', protect, upload.array('images', 6), serviceController.updateService);

// // Get all services
// router.get('/', async (req, res) => {
//   const Service = require('../models/service');
//   const services = await Service.find().populate('provider', 'name email location profileImage');
//   res.json(services);
// });

// // Categories
// router.get('/categories', (req, res) => {
//   res.json(categories);
// });

// // Get services by category & subservice
// router.get('/category/:category/subservice/:subservice', async (req, res) => {
//   const Service = require('../models/service');
//   const { category, subservice } = req.params;
//   const services = await Service.find({
//     title: { $regex: new RegExp(category, 'i') },
//     subservices: { $in: [new RegExp(subservice, 'i')] }
//   }).populate('provider', 'name email location profileImage');
//   res.json(services);
// });

// // Get services by provider
// router.get('/provider/:providerId', serviceController.getServicesByProvider);

// // Get single service by ID
// router.get('/:id', serviceController.getServiceById);

// // Delete service
// router.delete('/:id', protect, serviceController.deleteService);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const upload = require('../middleware/uploadMiddleware'); // multer config
// const { protect } = require('../middleware/authMiddleware');
// const serviceController = require('../controllers/serviceController');
// const categories = require('../data/categories');

// // ---------------- CREATE SERVICE (Provider) ----------------
// router.post(
//   '/',
//   protect,
//   upload.array('images', 6), // allow up to 6 images (profile + portfolio)
//   serviceController.createService
// );

// // ---------------- UPDATE SERVICE ----------------
// router.put(
//   '/:id',
//   protect,
//   upload.array('images', 6),
//   serviceController.updateService
// );

// // ---------------- GET ALL SERVICES ----------------
// router.get('/', async (req, res) => {
//   try {
//     const Service = require('../models/service');
//     const services = await Service.find()
//       .populate('provider', 'name email location profileImage');
//     res.json(services);
//   } catch (err) {
//     console.error('getAllServices error', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ---------------- CATEGORIES ----------------
// router.get('/categories', (req, res) => {
//   res.json(categories);
// });

// // ---------------- GET SERVICES BY CATEGORY & SUBSERVICE ----------------
// router.get('/category/:category/subservice/:subservice', async (req, res) => {
//   try {
//     const Service = require('../models/service');
//     const { category, subservice } = req.params;

//     const services = await Service.find({
//       title: { $regex: new RegExp(category, 'i') },
//       subservices: { $in: [new RegExp(subservice, 'i')] }
//     }).populate('provider', 'name email location profileImage');

//     res.json(services);
//   } catch (err) {
//     console.error('getServicesByCategory error', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ---------------- GET SERVICES BY PROVIDER ----------------
// router.get('/provider/:providerId', serviceController.getServicesByProvider);

// // ---------------- GET SERVICE BY ID ----------------
// router.get('/:id', serviceController.getServiceById);

// // ---------------- DELETE SERVICE ----------------
// router.delete('/:id', protect, serviceController.deleteService);

// module.exports = router;


const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const serviceController = require('../controllers/serviceController');
const categories = require('../data/categories');
const Service = require('../models/service');
const User = require('../models/user');
const mongoose = require('mongoose');

// ----------------- Service Routes -----------------

// Create new service (Provider)
router.post('/', protect, upload.array('images', 6), serviceController.createService);

// Update existing service
router.put('/:id', protect, upload.array('images', 6), serviceController.updateService);

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().populate('provider', 'name email location profileImage');
    res.json(services);
  } catch (err) {
    console.error('Get all services error', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get service categories
router.get('/categories', (req, res) => {
  res.json(categories);
});

// Get services by category & subservice
router.get('/category/:category/subservice/:subservice', async (req, res) => {
  try {
    const { category, subservice } = req.params;
    const categoryRegex = new RegExp(category, 'i');
    const subRegex = new RegExp(subservice, 'i');

    // Match subservices whether stored as array or as a single string
    const services = await Service.find({
      title: categoryRegex,
      $or: [
        { subservices: { $in: [subRegex] } }, // when subservices is array
        { subservices: { $regex: subRegex } }, // when subservices is string
      ],
    }).populate('provider', 'name email location profileImage');
    res.json(services);
  } catch (err) {
    console.error('Get services by category/subservice error', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all services for a provider
router.get('/provider/:providerId', serviceController.getServicesByProvider);

// ----------------- DEV: Seed DB with example providers/services -----------------
// NOTE: Development helper only. Remove or protect in production.
router.get('/seed/dev-populate', async (req, res) => {
  try {
    const created = [];

    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i];
      const providerEmail = `provider_${i + 1}@example.com`;

      // create or find provider user
      let provider = await User.findOne({ email: providerEmail });
      if (!provider) {
        provider = new User({
          name: `Provider ${i + 1}`,
          email: providerEmail,
          password: `password${i + 1}`,
          role: 'provider',
        });
        await provider.save();
      }

      // create one service for this category using first subservice
      const firstSub = (cat.subservices && cat.subservices[0]) || 'General';

      // Avoid duplicate identical services
      const exists = await Service.findOne({ provider: provider._id, title: cat.category });
      if (exists) {
        created.push({ provider: provider.email, service: exists._id, skipped: true });
        continue;
      }

      const newService = new Service({
        title: cat.category,
        subservices: [firstSub],
        description: `Sample ${cat.category} provider offering ${firstSub}`,
        price: 100 + i * 50,
        location: 'Demo City',
        provider: provider._id,
        providerName: provider.name,
        providerEmail: provider.email,
        providerContact: '9999999999',
        images: [],
      });

      await newService.save();
      created.push({ provider: provider.email, service: newService._id });
    }

    res.json({ ok: true, created });
  } catch (err) {
    console.error('seed error', err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Get single service by ID
router.get('/:id', serviceController.getServiceById);

// Delete a service
router.delete('/:id', protect, serviceController.deleteService);

module.exports = router;
