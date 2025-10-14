// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth Pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import ClientProfilePage from "./components/client/ClientProfilePage";
import ClientProfileEditPage from './components/client/ClientProfileEditPage';

// Client Pages
import CreateClientProfile from './components/client/CreateClientProfile';
import ClientDashboard from './components/client/ClientDashboard';
import CategoryPage from './components/client/CategoryPage';
import ServiceList from './components/client/ServiceList';
import ProviderProfileC from './components/client/ProviderProfileC';
import BookingPage from './components/client/BookingPage';
import ChatPage from './components/client/ChatPage';
import PaymentPage from './components/client/PaymentPage';
import WriteReviewPage from './components/client/WriteReviewPage';



// Provider Pages
import CreateProfile from './components/provider/CreateProfile';
import ProviderProfileView from './components/provider/ProviderProfileView';
import EditProviderProfile from './components/provider/EditProviderProfile';
import ManageBookings from './components/provider/ManageBookings';
import ProviderReviews from './components/provider/ProviderReviews';
import ProviderChat from './components/provider/ProviderChat';


// Shared
import Navbar from './components/shared/Navbar';
import NotFound from './components/shared/NotFound';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login key={Date.now()} />} />
        <Route path="/login" element={<Login key={Date.now()} />} />
        <Route path="/register" element={<Register />} />

        {/* Client Routes */}
        <Route path="/client/CreateClientProfile" element={<CreateClientProfile />} />
        <Route path="/client/ClientDashboard" element={<ClientDashboard />} />
        <Route path="/" element={<ClientDashboard />} />
        <Route path="/services/:category" element={<CategoryPage />} />
        <Route path="/services/:category/:subService" element={<ServiceList />} />
        <Route path="/provider/:providerId" element={<ProviderProfileC />} />
        <Route path="/client/book/:providerId" element={<BookingPage />} />
        <Route path="/client/chat/:providerId" element={<ChatPage />} />
        <Route path="/client/payment/:providerId" element={<PaymentPage />} />
        <Route path="/client/writereview/:providerId" element={<WriteReviewPage/>}/>
        <Route path="/client/profile" element={<ClientProfilePage />} />
        <Route path="/client/edit-profile" element={<ClientProfileEditPage />} />

        <Route path="/client/ClientProfilePage" element={<ClientProfilePage />} />
        {/* <Route path="/client/orders" element={<ClientOrders />} />
        <Route path="/client/chats" element={<ClientChats />} />

         */}


        {/* Provider Routes */}
        <Route path="/provider/CreateProfile" element={<CreateProfile/>}/>
        <Route path="/provider/ProviderProfileView" element={<ProviderProfileView/>}/>
        <Route path="/edit-profile/:id" element={<EditProviderProfile />} />
        <Route path="/provider/ManageBookings" element={<ManageBookings />} />
        <Route path="/provider/ProviderChat/:bookingId" element={<ProviderChat />} />


        {/* <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/provider/profile" element={<ProviderProfileView />} /> */}
        <Route path="/provider/ManageBookings" element={<ManageBookings />} />
        <Route path="/provider/ProviderReviews" element={<ProviderReviews />} />
        {/*<Route path="/provider/chats" element={<ProviderChats />} /> */}
       
        {/* Catch-All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
