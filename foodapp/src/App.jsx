import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtecredRoute';

import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';

import Home from './components/Home';
import Product from './components/Product';
import Featuress from './components/Featuress';
import About from './components/About';
import BookTable from './components/BookTable';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Carouselss from './components/Carouselss';
import TrackOrder from './components/TrackOrder';
import Cart from './components/Cart';
import Counter from './components/Counter';
import Checkout from './components/CheckOut';
import PaymentSuccessPage from './components/PaymentSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages without nav/footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* All protected + layout-wrapped pages */}
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Menu"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Product />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/features"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Featuress />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/About"
          element={
            <ProtectedRoute>
              <MainLayout>
                <About />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Book Table"
          element={
            <ProtectedRoute>
              <MainLayout>
                <BookTable />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/testimonials"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Testimonials />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Contact />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/carousel"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Carouselss />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/trackorder"
          element={
            <ProtectedRoute>
              <MainLayout>
                <TrackOrder />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Cart />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/counter"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Counter />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Checkout />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/paymentsuccess"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PaymentSuccessPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
