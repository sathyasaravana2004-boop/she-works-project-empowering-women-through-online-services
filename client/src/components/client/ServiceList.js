//displays the list of service providers
// src/components/client/ServiceList.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ServiceList.css';

const BASE_URL = 'http://localhost:5000';

function ServiceList() {
  const { category, subService } = useParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!category || !subService) {
      setError('Invalid route.');
      setLoading(false);
      return;
    }

    const fetchProviders = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch canonical categories from server and find matching display names by slug
        const catRes = await axios.get(`${BASE_URL}/api/services/categories`);
        const cats = catRes.data || [];

        const slugify = (s = '') =>
          s
            .toString()
            .toLowerCase()
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const targetCatObj = cats.find((c) => slugify(c.category) === slugify(category));

        // If we don't find canonical category, try fallback to using provided param
        const categoryName = targetCatObj ? targetCatObj.category : category;

        // find subservice display name
        let subServiceName = subService;
        if (targetCatObj) {
          const subs = targetCatObj.subservices || [];

          // 1) exact slug match
          let found = subs.find((s) => slugify(s) === slugify(subService));

          // 2) fallback: partial match (slug included or startsWith)
          if (!found) {
            const targetSlug = slugify(subService);
            found = subs.find((s) => {
              const sSlug = slugify(s);
              return sSlug.includes(targetSlug) || targetSlug.includes(sSlug) || sSlug.startsWith(targetSlug) || targetSlug.startsWith(sSlug);
            });
          }

          // 3) fallback: try matching by words (loose)
          if (!found) {
            const targetWords = subService.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
            found = subs.find((s) => {
              const sLower = s.toLowerCase();
              return targetWords.every((w) => sLower.includes(w));
            });
          }

          if (found) subServiceName = found;
        }

        const res = await axios.get(
          `${BASE_URL}/api/services/category/${encodeURIComponent(categoryName)}/subservice/${encodeURIComponent(subServiceName)}`
        );

        // Aggregate services by provider so a provider with multiple services appears once
        const services = res.data || [];
        const map = new Map();

        services.forEach((service) => {
          const providerObj = service.provider || {};
          const providerId = providerObj._id || providerObj.id || service.provider;

          // build or update entry
          const existing = map.get(providerId) || {
            id: providerId,
            name: providerObj.name || service.providerName || 'Provider',
            image: null,
            description: service.description || '',
            offers: new Set(), // set of offered subservices/titles
            rawServices: [],
          };

          // choose image priority: provider.profileImage > service.images[0]
          if (!existing.image) {
            const imagePath = (providerObj.profileImage && providerObj.profileImage) || (service.images && service.images[0]) || '/assets/default-profile.png';
            existing.image = imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
          }

          // Collect offered subservices (accept array or string)
          if (service.subservices) {
            if (Array.isArray(service.subservices)) {
              service.subservices.forEach((s) => existing.offers.add(s));
            } else if (typeof service.subservices === 'string') {
              // some entries store as space/comma separated string
              service.subservices
                .split(/[;,|]+|\s{2,}|\s+/)
                .map((s) => s.trim())
                .filter(Boolean)
                .forEach((s) => existing.offers.add(s));
            }
          } else if (service.title) {
            existing.offers.add(service.title);
          }

          existing.rawServices.push(service);
          map.set(providerId, existing);
        });

        // Transform map into array and compute ratings/counts
        const mapped = Array.from(map.values()).map((p) => {
          const storedReviews = JSON.parse(localStorage.getItem(`reviews_${p.id}`)) || [];
          const avgRating = storedReviews.length
            ? (storedReviews.reduce((s, r) => s + Number(r.rating), 0) / storedReviews.length).toFixed(1)
            : null;

          return {
            id: p.id,
            name: p.name,
            service: p.rawServices[0]?.title || categoryName,
            description: p.description,
            image: p.image,
            rating: avgRating,
            reviews: storedReviews.length,
            offers: Array.from(p.offers),
            rawServices: p.rawServices,
          };
        });

        setProviders(mapped);
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError('Failed to load providers.');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [category, subService]);

  if (loading) return <p>Loading providers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="service-list">
      <h2>
        Providers for "{subService}" in {category}
      </h2>
      <div className="grid">
        {providers.length > 0 ? (
          providers.map((provider) => (
            <div key={provider.id} className="card">
              <img src={provider.image} alt={provider.name} />
              <h3>{provider.name}</h3>
              <p>{provider.description}</p>
              <p>⭐ {provider.rating ?? 'No ratings yet'} ({provider.reviews} reviews)</p>
              <Link to={`/provider/${provider.id}`}>
                <button>View Profile</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No providers found for this sub-service.</p>
        )}
      </div>
    </div>
  );
}

export default ServiceList;
