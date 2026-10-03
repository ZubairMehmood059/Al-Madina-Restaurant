/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { MenuSection } from './components/MenuSection';
import { PlaceStory } from './components/PlaceStory';
import { ReviewsSection } from './components/ReviewsSection';
import { AtmosphereGallery } from './components/AtmosphereGallery';
import { ReservationSection } from './components/ReservationSection';
import { FindUsSection } from './components/FindUsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Code-split heavy interactive modals to reduce initial load bundle
const OrderDrawer = React.lazy(() =>
  import('./components/OrderDrawer').then((mod) => ({ default: mod.OrderDrawer }))
);
const StaffDashboard = React.lazy(() =>
  import('./components/StaffDashboard').then((mod) => ({ default: mod.StaffDashboard }))
);

import {
  INITIAL_MENU_ITEMS,
  REVIEWS_DATA,
  INITIAL_MEDIA_SLOTS,
  INITIAL_TRACKED_ORDERS,
} from './data/restaurantData';
import { MenuItem, Reservation, Review, OrderItem, MediaSlot, TrackedOrder, OrderStatus } from './types';

const APP_STORAGE_VERSION = 'almadina-v2026-10-03';

export default function App() {
  // Menu items state
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('almadina_menu_items');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  // Tracked Orders state (live orders)
  const [trackedOrders, setTrackedOrders] = useState<TrackedOrder[]>(() => {
    const saved = localStorage.getItem('almadina_tracked_orders');
    return saved ? JSON.parse(saved) : INITIAL_TRACKED_ORDERS;
  });

  // Reservations state
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('almadina_reservations');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'RES-8921',
        name: 'Tariq Siddiqui',
        phone: '+92 321 4455667',
        date: '2026-10-02',
        time: '20:30',
        guests: 4,
        note: 'Family seating required, quiet corner',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'RES-8922',
        name: 'Hamza Khan',
        phone: '+92 333 9988112',
        date: '2026-10-02',
        time: '21:00',
        guests: 6,
        note: 'Birthday celebration dinner',
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    ];
  });

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(() => {
    const savedVersion = localStorage.getItem('almadina_data_version');
    const saved = localStorage.getItem('almadina_reviews');

    if (savedVersion !== APP_STORAGE_VERSION && saved) {
      localStorage.removeItem('almadina_reviews');
      localStorage.setItem('almadina_data_version', APP_STORAGE_VERSION);
      return REVIEWS_DATA;
    }

    if (savedVersion !== APP_STORAGE_VERSION && !saved) {
      localStorage.setItem('almadina_data_version', APP_STORAGE_VERSION);
    }

    return saved ? JSON.parse(saved) : REVIEWS_DATA;
  });

  // Media Slots registry state (for the design team)
  const [mediaSlots, setMediaSlots] = useState<MediaSlot[]>(INITIAL_MEDIA_SLOTS);

  // Cart / Order Items state
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'tray' | 'track'>('tray');
  const [activeTrackingId, setActiveTrackingId] = useState<string | undefined>(undefined);

  // Staff / Design Management Dashboard modal
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Persist modifications
  useEffect(() => {
    localStorage.setItem('almadina_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('almadina_tracked_orders', JSON.stringify(trackedOrders));
  }, [trackedOrders]);

  useEffect(() => {
    localStorage.setItem('almadina_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('almadina_reviews', JSON.stringify(reviews));
    localStorage.setItem('almadina_data_version', APP_STORAGE_VERSION);
  }, [reviews]);

  // Order Handlers
  const handleAddToCart = (dish: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((entry) => entry.item.id === dish.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === dish.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [...prev, { item: dish, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((entry) => {
          if (entry.item.id === dishId) {
            const newQ = entry.quantity + delta;
            return newQ > 0 ? { ...entry, quantity: newQ } : null;
          }
          return entry;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const handleRemoveItem = (dishId: string) => {
    setOrderItems((prev) => prev.filter((entry) => entry.item.id !== dishId));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const handleAddNewOrder = (order: TrackedOrder) => {
    setTrackedOrders((prev) => [order, ...prev]);
    setActiveTrackingId(order.id);
  };

  const handleOpenOrderDrawer = (tab: 'tray' | 'track' = 'tray', orderId?: string) => {
    setDrawerTab(tab);
    if (orderId) setActiveTrackingId(orderId);
    setIsOrderDrawerOpen(true);
  };

  // Reservation Handlers
  const handleAddReservation = (
    newResData: Omit<Reservation, 'id' | 'createdAt' | 'status'>
  ): Reservation => {
    const newReservation: Reservation = {
      ...newResData,
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [newReservation, ...prev]);
    return newReservation;
  };

  const handleUpdateReservationStatus = (
    id: string,
    status: Reservation['status']
  ) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  // Menu Management Handlers
  const handleToggleDishAvailability = (dishId: string) => {
    setMenuItems((prev) =>
      prev.map((d) => (d.id === dishId ? { ...d, available: !d.available } : d))
    );
  };

  const handleUpdateDishPrice = (dishId: string, newPrice: number) => {
    setMenuItems((prev) =>
      prev.map((d) => (d.id === dishId ? { ...d, price: newPrice } : d))
    );
  };

  // Reviews Handlers
  const handleAddReview = (newRev: Omit<Review, 'id' | 'dateAgo' | 'source'>) => {
    const review: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      dateAgo: 'Google review · Just now',
      source: 'Verified Customer',
      isDark: false,
    };
    setReviews((prev) => [review, ...prev]);
  };

  // Media preview handler for design team
  const handleUploadMediaSlotPreview = (slotId: string, imageSrc: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.placeholderId === slotId ? { ...item, imageSrc } : item
      )
    );
    setMediaSlots((prev) =>
      prev.map((slot) =>
        slot.id === slotId ? { ...slot, customImage: imageSrc } : slot
      )
    );
  };

  const handleUpdateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    minutes?: number
  ) => {
    setTrackedOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              estimatedMinutesRemaining:
                minutes !== undefined ? minutes : o.estimatedMinutesRemaining,
            }
          : o
      )
    );
  };

  const totalCartCount = orderItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fcfbf7] text-[#1c1f1d] flex flex-col font-sans">
      {/* Top Navigation Bar with Hover Animations & Track Order CTA */}
      <Navbar
        onOpenOrderModal={() => handleOpenOrderDrawer('tray')}
        onOpenTrackModal={() => handleOpenOrderDrawer('track')}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section (Page 1) */}
        <Hero onOrderClick={() => handleOpenOrderDrawer('tray')} />

        {/* Marquee Ticker (Page 1) */}
        <Marquee />

        {/* The Menu Section with Interactive Dish Cards & Animations */}
        <MenuSection items={menuItems} onAddToCart={handleAddToCart} />

        {/* The Place / Story Section (Page 2) */}
        <PlaceStory />

        {/* From Our Guests / Reviews Section (Page 2) */}
        <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />

        {/* Atmosphere Gallery (Page 3) */}
        <AtmosphereGallery />

        {/* Table Reservation Section (Page 3) */}
        <ReservationSection onAddReservation={handleAddReservation} />

        {/* Find Us & Contact Section (Page 3) */}
        <FindUsSection />

        {/* FAQ Accordion Section (Page 4) */}
        <FaqSection />
      </main>

      {/* Dark Footer (Page 4) */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Slide-over Order Drawer with Live Order Tracking UI */}
      {isOrderDrawerOpen && (
        <React.Suspense fallback={null}>
          <OrderDrawer
            isOpen={isOrderDrawerOpen}
            onClose={() => setIsOrderDrawerOpen(false)}
            orderItems={orderItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearOrder={handleClearOrder}
            trackedOrders={trackedOrders}
            onAddNewOrder={handleAddNewOrder}
            initialTab={drawerTab}
            activeTrackingId={activeTrackingId}
          />
        </React.Suspense>
      )}

      {/* Staff Management & Design Team Media Slot Inspector */}
      {isDashboardOpen && (
        <React.Suspense fallback={null}>
          <StaffDashboard
            isOpen={isDashboardOpen}
            onClose={() => setIsDashboardOpen(false)}
            reservations={reservations}
            onUpdateReservationStatus={handleUpdateReservationStatus}
            menuItems={menuItems}
            onToggleDishAvailability={handleToggleDishAvailability}
            onUpdateDishPrice={handleUpdateDishPrice}
            mediaSlots={mediaSlots}
            onUploadMediaSlotPreview={handleUploadMediaSlotPreview}
            trackedOrders={trackedOrders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        </React.Suspense>
      )}
    </div>
  );
}
