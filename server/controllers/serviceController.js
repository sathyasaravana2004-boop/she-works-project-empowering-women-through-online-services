// // backend/controllers/serviceController.js
// const Service = require('../models/service');
// const User = require('../models/user');

// const normalizeSubs = (body) => {
//   // accept array, or repeated fields like subservices[], or comma string
//   if (!body) return [];
//   if (Array.isArray(body)) return body;
//   if (typeof body === 'string') {
//     try {
//       // possibly serialized JSON array
//       const parsed = JSON.parse(body);
//       if (Array.isArray(parsed)) return parsed;
//     } catch (_) {}
//     // fallback: comma separated
//     return body.split(',').map(s => s.trim()).filter(Boolean);
//   }
//   return [];
// };

// exports.createService = async (req, res) => {
//   try {
//     const { name, email, contact, service, subservices, description, price, location } = req.body;

//     if (!service) return res.status(400).json({ message: 'Service title required' });

//     const providerId = req.user?.id;
//     const provider = await User.findById(providerId);
//     if (!provider || provider.role !== 'provider') {
//       return res.status(403).json({ message: 'Only providers can create services' });
//     }

//     const subs = normalizeSubs(subservices || req.body['subservices[]'] || req.body['subservices']);

//     const images = (req.files || []).map(f => `/uploads/${f.filename}`); // store web accessible path

//     const newService = new Service({
//       title: service,
//       subservices: subs,
//       description,
//       price: price ? Number(price) : undefined,
//       location,
//       provider: provider._id,
//       providerName: name || provider.name,
//       providerEmail: email || provider.email,
//       providerContact: contact || provider.location || '',
//       images
//     });

//     await newService.save();
//     res.status(201).json(newService);
//   } catch (err) {
//     console.error('createService error', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// exports.updateService = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const service = await Service.findById(id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     // authorization
//     if (service.provider.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     // update fields if present
//     const { name, email, contact, service: serviceTitle, subservices, description, price, location } = req.body;
//     if (serviceTitle) service.title = serviceTitle;
//     if (description) service.description = description;
//     if (price) service.price = Number(price);
//     if (location) service.location = location;
//     if (name) service.providerName = name;
//     if (email) service.providerEmail = email;
//     if (contact) service.providerContact = contact;

//     const subs = normalizeSubs(subservices || req.body['subservices[]'] || req.body['subservices']);
//     if (subs && subs.length) service.subservices = subs;

//     // append uploaded images (do not remove existing)
//     if (req.files && req.files.length) {
//       const uploaded = req.files.map(f => `/uploads/${f.filename}`);
//       service.images = service.images.concat(uploaded);
//     }

//     await service.save();
//     res.json(service);
//   } catch (err) {
//     console.error('updateService error', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// exports.getServicesByProvider = async (req, res) => {
//   try {
//     const providerId = req.params.providerId;
//     const services = await Service.find({ provider: providerId });
//     res.json(services);
//   } catch (err) {
//     console.error('getServicesByProvider', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };


// const Service = require('../models/service');
// const User = require('../models/user');

// // helper: normalize subservices field
// const normalizeSubs = (body) => {
//   if (!body) return [];
//   if (Array.isArray(body)) return body;
//   if (typeof body === 'string') {
//     try {
//       const parsed = JSON.parse(body);
//       if (Array.isArray(parsed)) return parsed;
//     } catch (_) {}
//     return body.split(',').map(s => s.trim()).filter(Boolean);
//   }
//   return [];
// };

// // ---------------- CREATE SERVICE (Provider Profile) ----------------
// exports.createService = async (req, res) => {
//   try {
//     const { name, email, contact, service, subservices, description, price, location } = req.body;

//     if (!service) return res.status(400).json({ message: 'Service title required' });

//     const providerId = req.user?.id;
//     const provider = await User.findById(providerId);
//     if (!provider || provider.role !== 'provider') {
//       return res.status(403).json({ message: 'Only providers can create services' });
//     }

//     // ✅ Prevent multiple profiles per provider
//     const existingService = await Service.findOne({ provider: provider._id });
//     if (existingService) {
//       return res.status(400).json({ message: 'Profile already exists. Please edit instead.' });
//     }

//     const subs = normalizeSubs(subservices || req.body['subservices[]'] || req.body['subservices']);
//     const images = (req.files || []).map(f => `/uploads/${f.filename}`);

//     const newService = new Service({
//       title: service,
//       subservices: subs,
//       description,
//       price: price ? Number(price) : undefined,
//       location,
//       provider: provider._id,
//       providerName: name || provider.name,
//       providerEmail: email || provider.email,
//       providerContact: contact || provider.location || '',
//       images
//     });

//     await newService.save();
//     res.status(201).json(newService);
//   } catch (err) {
//     console.error('createService error', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ---------------- UPDATE SERVICE (Edit Profile) ----------------
// exports.updateService = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const service = await Service.findById(id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     // authorization: only provider who owns can update
//     if (service.provider.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     // update fields
//     const { name, email, contact, service: serviceTitle, subservices, description, price, location } = req.body;
//     if (serviceTitle) service.title = serviceTitle;
//     if (description) service.description = description;
//     if (price) service.price = Number(price);
//     if (location) service.location = location;
//     if (name) service.providerName = name;
//     if (email) service.providerEmail = email;
//     if (contact) service.providerContact = contact;

//     const subs = normalizeSubs(subservices || req.body['subservices[]'] || req.body['subservices']);
//     if (subs && subs.length) service.subservices = subs;

//     // append uploaded images
//     if (req.files && req.files.length) {
//       const uploaded = req.files.map(f => `/uploads/${f.filename}`);
//       service.images = service.images.concat(uploaded);
//     }

//     await service.save();
//     res.json(service);
//   } catch (err) {
//     console.error('updateService error', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ---------------- GET ALL SERVICES FOR A PROVIDER ----------------
// exports.getServicesByProvider = async (req, res) => {
//   try {
//     const providerId = req.params.providerId;
//     const services = await Service.find({ provider: providerId }).populate('provider', 'name email role');
//     res.json(services);
//   } catch (err) {
//     console.error('getServicesByProvider', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ---------------- GET SERVICE BY ID (Profile View) ----------------
// exports.getServiceById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const service = await Service.findById(id).populate('provider', 'name email role');
//     if (!service) return res.status(404).json({ message: 'Service not found' });
//     res.json(service);
//   } catch (err) {
//     console.error('getServiceById', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ---------------- DELETE SERVICE (Optional) ----------------
// exports.deleteService = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const service = await Service.findById(id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     if (service.provider.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     await service.deleteOne();
//     res.json({ message: 'Service deleted successfully' });
//   } catch (err) {
//     console.error('deleteService error', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };


// const Service = require('../models/service');
// const User = require('../models/user');

// // Helper: normalize subservices field
// const normalizeSubs = (body) => {
//   if (!body) return [];
//   if (Array.isArray(body)) return body;
//   if (typeof body === 'string') {
//     try {
//       const parsed = JSON.parse(body);
//       if (Array.isArray(parsed)) return parsed;
//     } catch (_) {}
//     return body.split(',').map(s => s.trim()).filter(Boolean);
//   }
//   return [];
// };

// // ---------------- CREATE SERVICE (Provider Profile) ----------------
// exports.createService = async (req, res) => {
//   try {
//     const { name, email, contact, service, subservices, description, price, location } = req.body;

//     if (!service) return res.status(400).json({ message: 'Service title required' });

//     const providerId = req.user?.id;
//     const provider = await User.findById(providerId);
//     if (!provider || provider.role !== 'provider') {
//       return res.status(403).json({ message: 'Only providers can create services' });
//     }

//     // Prevent multiple profiles per provider
//     const existingService = await Service.findOne({ provider: provider._id });
//     if (existingService) {
//       return res.status(400).json({ message: 'Profile already exists. Please edit instead.' });
//     }

//     const subs = normalizeSubs(subservices || req.body['subservices[]'] || req.body['subservices']);
//     const images = (req.files || []).map(f => `/uploads/${f.filename}`);

//     // ✅ Update profile image in User model (first uploaded image)
//     if (images.length > 0) {
//       const profileImage = images[0];
//       await User.findByIdAndUpdate(provider._id, { profileImage });
//     }

//     const newService = new Service({
//       title: service,
//       subservices: subs,
//       description,
//       price: price ? Number(price) : undefined,
//       location,
//       provider: provider._id,
//       providerName: name || provider.name,
//       providerEmail: email || provider.email,
//       providerContact: contact || provider.location || '',
//       images
//     });

//     await newService.save();
//     res.status(201).json(newService);
//   } catch (err) {
//     console.error('createService error', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ---------------- UPDATE SERVICE (Edit Profile) ----------------
// exports.updateService = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const service = await Service.findById(id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     // Authorization: only provider who owns can update
//     if (service.provider.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     // Update fields
//     const { name, email, contact, service: serviceTitle, subservices, description, price, location } = req.body;
//     if (serviceTitle) service.title = serviceTitle;
//     if (description) service.description = description;
//     if (price) service.price = Number(price);
//     if (location) service.location = location;
//     if (name) service.providerName = name;
//     if (email) service.providerEmail = email;
//     if (contact) service.providerContact = contact;

//     const subs = normalizeSubs(subservices || req.body['subservices[]'] || req.body['subservices']);
//     if (subs && subs.length) service.subservices = subs;

//     // Append uploaded images
//     if (req.files && req.files.length) {
//       const uploaded = req.files.map(f => `/uploads/${f.filename}`);
//       service.images = service.images.concat(uploaded);

//       // ✅ Update profile image if new images uploaded
//       if (uploaded.length > 0) {
//         await User.findByIdAndUpdate(req.user.id, { profileImage: uploaded[0] });
//       }
//     }

//     await service.save();
//     res.json(service);
//   } catch (err) {
//     console.error('updateService error', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ---------------- GET ALL SERVICES FOR A PROVIDER ----------------
// exports.getServicesByProvider = async (req, res) => {
//   try {
//     const providerId = req.params.providerId;
//     const services = await Service.find({ provider: providerId }).populate('provider', 'name email role profileImage');
//     res.json(services);
//   } catch (err) {
//     console.error('getServicesByProvider', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ---------------- GET SERVICE BY ID (Profile View) ----------------
// exports.getServiceById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const service = await Service.findById(id).populate('provider', 'name email role profileImage');
//     if (!service) return res.status(404).json({ message: 'Service not found' });
//     res.json(service);
//   } catch (err) {
//     console.error('getServiceById', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ---------------- DELETE SERVICE (Optional) ----------------
// exports.deleteService = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const service = await Service.findById(id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     if (service.provider.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     await service.deleteOne();
//     res.json({ message: 'Service deleted successfully' });
//   } catch (err) {
//     console.error('deleteService error', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };


// const Service = require('../models/service');
// const User = require('../models/user');

// // Helper: normalize subservices field
// const normalizeSubs = (body) => {
//   if (!body) return [];
//   if (Array.isArray(body)) return body;
//   if (typeof body === 'string') {
//     try {
//       const parsed = JSON.parse(body);
//       if (Array.isArray(parsed)) return parsed;
//     } catch (_) {}
//     return body.split(',').map(s => s.trim()).filter(Boolean);
//   }
//   return [];
// };

// // ---------------- CREATE SERVICE (Provider Profile) ----------------
// exports.createService = async (req, res) => {
//   try {
//     const { name, email, contact, service, subservices, description, price, location } = req.body;

//     if (!service) return res.status(400).json({ message: 'Service title required' });

//     const providerId = req.user?.id;
//     const provider = await User.findById(providerId);
//     if (!provider || provider.role !== 'provider') {
//       return res.status(403).json({ message: 'Only providers can create services' });
//     }

//     // Prevent multiple profiles per provider
//     const existingService = await Service.findOne({ provider: provider._id });
//     if (existingService) {
//       return res.status(400).json({ message: 'Profile already exists. Please edit instead.' });
//     }

//     const subs = normalizeSubs(subservices || req.body['subservices[]'] || req.body['subservices']);
//     const images = (req.files || []).map(f => `/uploads/${f.filename}`);

//     // ✅ Update provider profileImage
//     if (images.length > 0) {
//       const profileImage = images[0];
//       await User.findByIdAndUpdate(provider._id, { profileImage });
//     }

//     const newService = new Service({
//       title: service,
//       subservices: subs,
//       description,
//       price: price ? Number(price) : undefined,
//       location,
//       provider: provider._id,
//       providerName: name || provider.name,
//       providerEmail: email || provider.email,
//       providerContact: contact || '',
//       images
//     });

//     await newService.save();
//     res.status(201).json(newService);
//   } catch (err) {
//     console.error('createService error', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ---------------- UPDATE SERVICE (Edit Profile) ----------------
// exports.updateService = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const service = await Service.findById(id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     // Authorization
//     if (service.provider.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     // Update fields
//     const { name, email, contact, service: serviceTitle, subservices, description, price, location } = req.body;
//     if (serviceTitle) service.title = serviceTitle;
//     if (description) service.description = description;
//     if (price) service.price = Number(price);
//     if (location) service.location = location;
//     if (name) service.providerName = name;
//     if (email) service.providerEmail = email;
//     if (contact) service.providerContact = contact;

//     const subs = normalizeSubs(subservices || req.body['subservices[]'] || req.body['subservices']);
//     if (subs && subs.length) service.subservices = subs;

//     // Append uploaded images
//     if (req.files && req.files.length) {
//       const uploaded = req.files.map(f => `/uploads/${f.filename}`);
//       service.images = service.images.concat(uploaded);

//       // ✅ Update profile image if new images uploaded
//       if (uploaded.length > 0) {
//         await User.findByIdAndUpdate(req.user.id, { profileImage: uploaded[0] });
//       }
//     }

//     await service.save();
//     res.json(service);
//   } catch (err) {
//     console.error('updateService error', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ---------------- GET ALL SERVICES FOR A PROVIDER ----------------
// exports.getServicesByProvider = async (req, res) => {
//   try {
//     const providerId = req.params.providerId;
//     const services = await Service.find({ provider: providerId })
//       .populate('provider', 'name email role profileImage');
//     res.json(services);
//   } catch (err) {
//     console.error('getServicesByProvider', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ---------------- GET SERVICE BY ID ----------------
// exports.getServiceById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const service = await Service.findById(id)
//       .populate('provider', 'name email role profileImage');
//     if (!service) return res.status(404).json({ message: 'Service not found' });
//     res.json(service);
//   } catch (err) {
//     console.error('getServiceById', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // ---------------- DELETE SERVICE ----------------
// exports.deleteService = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const service = await Service.findById(id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     if (service.provider.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     await service.deleteOne();
//     res.json({ message: 'Service deleted successfully' });
//   } catch (err) {
//     console.error('deleteService error', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };


const Service = require('../models/service');
const User = require('../models/user');

// ---------------- Helper: normalize subservices ----------------
const normalizeSubs = (body) => {
  if (!body) return [];
  if (Array.isArray(body)) return body;
  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {}
    return body.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

// ---------------- CREATE SERVICE (Provider Profile) ----------------
exports.createService = async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      service,
      subservices,
      description,
      price,
      location,
    } = req.body;

    if (!service)
      return res.status(400).json({ message: 'Service title required' });

    const providerId = req.user?.id;
    const provider = await User.findById(providerId);
    if (!provider || provider.role !== 'provider') {
      return res
        .status(403)
        .json({ message: 'Only providers can create services' });
    }

    // Prevent multiple profiles per provider
    const existingService = await Service.findOne({ provider: provider._id });
    if (existingService) {
      return res
        .status(400)
        .json({ message: 'Profile already exists. Please edit instead.' });
    }

    const subs = normalizeSubs(
      subservices || req.body['subservices[]'] || req.body['subservices']
    );

    // Store all uploaded files as portfolio images
    const images = (req.files || []).map((f) => `/uploads/${f.filename}`);

    // ✅ Save first uploaded image as provider profileImage
    if (images.length > 0) {
      provider.profileImage = images[0];
      await provider.save();
    }

    const newService = new Service({
      title: service,
      subservices: subs,
      description,
      price: price ? Number(price) : undefined,
      location,
      provider: provider._id,
      providerName: name || provider.name,
      providerEmail: email || provider.email,
      providerContact: contact || '',
      images, // ✅ portfolio images
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    console.error('createService error', err);
    res
      .status(500)
      .json({ message: 'Server error', error: err.message });
  }
};

// ---------------- UPDATE SERVICE (Edit Profile / Upload Work) ----------------
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    // Authorization check
    if (service.provider.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update editable fields
    const {
      name,
      email,
      contact,
      service: serviceTitle,
      subservices,
      description,
      price,
      location,
    } = req.body;

    if (serviceTitle) service.title = serviceTitle;
    if (description) service.description = description;
    if (price) service.price = Number(price);
    if (location) service.location = location;
    if (name) service.providerName = name;
    if (email) service.providerEmail = email;
    if (contact) service.providerContact = contact;

    const subs = normalizeSubs(
      subservices || req.body['subservices[]'] || req.body['subservices']
    );
    if (subs && subs.length) service.subservices = subs;

    // Append new uploaded images (portfolio)
    if (req.files && req.files.length) {
      const uploaded = req.files.map((f) => `/uploads/${f.filename}`);
      service.images = service.images.concat(uploaded);

      // ✅ Update provider profile image if any new image uploaded
      if (uploaded.length > 0) {
        await User.findByIdAndUpdate(req.user.id, {
          profileImage: uploaded[0],
        });
      }
    }

    await service.save();
    res.json(service);
  } catch (err) {
    console.error('updateService error', err);
    res
      .status(500)
      .json({ message: 'Server error', error: err.message });
  }
};

// ---------------- GET ALL SERVICES FOR A PROVIDER ----------------
exports.getServicesByProvider = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const services = await Service.find({ provider: providerId }).populate(
      'provider',
      'name email role profileImage'
    );
    res.json(services);
  } catch (err) {
    console.error('getServicesByProvider', err);
    res
      .status(500)
      .json({ message: 'Server error', error: err.message });
  }
};

// ---------------- GET SERVICE BY ID ----------------
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id).populate(
      'provider',
      'name email role profileImage'
    );
    if (!service)
      return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    console.error('getServiceById', err);
    res
      .status(500)
      .json({ message: 'Server error', error: err.message });
  }
};

// ---------------- DELETE SERVICE ----------------
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (service.provider.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await service.deleteOne();
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('deleteService error', err);
    res
      .status(500)
      .json({ message: 'Server error', error: err.message });
  }
};
