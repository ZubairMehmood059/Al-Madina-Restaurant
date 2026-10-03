import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  Search,
  Clock,
  MapPin,
  CheckCircle2,
  ChefHat,
  Bike,
  Package,
  PhoneCall,
  Sparkles,
  AlertCircle,
  Compass,
} from 'lucide-react';
import { OrderItem, TrackedOrder, OrderStatus } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearOrder: () => void;
  trackedOrders: TrackedOrder[];
  onAddNewOrder: (order: TrackedOrder) => void;
  initialTab?: 'tray' | 'track';
  activeTrackingId?: string;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  trackedOrders,
  onAddNewOrder,
  initialTab = 'tray',
  activeTrackingId,
}) => {
  const [activeTab, setActiveTab] = useState<'tray' | 'track'>(initialTab);
  const [searchOrderId, setSearchOrderId] = useState(activeTrackingId || '');
  const [selectedOrder, setSelectedOrder] = useState<TrackedOrder | null>(() => {
    if (activeTrackingId) {
      return trackedOrders.find((o) => o.id === activeTrackingId) || trackedOrders[0] || null;
    }
    return trackedOrders[0] || null;
  });
  const [searchError, setSearchError] = useState(false);

  // Checkout form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [specialNote, setSpecialNote] = useState('');

  // Synchronize when activeTrackingId changes externally
  React.useEffect(() => {
    if (activeTrackingId) {
      const found = trackedOrders.find((o) => o.id === activeTrackingId);
      if (found) {
        setSelectedOrder(found);
        setSearchOrderId(found.id);
        setActiveTab('track');
      }
    }
  }, [activeTrackingId, trackedOrders]);

  if (!isOpen) return null;

  const totalAmount = orderItems.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (orderItems.length === 0) return;

    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTrackedOrder: TrackedOrder = {
      id: newOrderId,
      customerName: customerName.trim() || 'Valued Guest',
      phone: customerPhone.trim() || undefined,
      orderType,
      address: orderType === 'delivery' ? customerAddress.trim() || 'Karachi' : undefined,
      status: 'confirmed',
      estimatedMinutesRemaining: orderType === 'delivery' ? 35 : 20,
      items: orderItems.map((entry) => ({
        name: entry.item.name,
        quantity: entry.quantity,
        price: entry.item.price,
      })),
      totalAmount,
      createdAt: 'Just now',
      notes: specialNote.trim() || undefined,
      riderName: orderType === 'delivery' ? 'Kitchen Assigning Rider...' : undefined,
    };

    onAddNewOrder(newTrackedOrder);
    setSelectedOrder(newTrackedOrder);
    setSearchOrderId(newOrderId);
    setActiveTab('track');
    onClearOrder();

    // Prepare WhatsApp notification message
    let itemsText = orderItems
      .map(
        (entry, idx) =>
          `${idx + 1}. ${entry.item.name} x${entry.quantity} - Rs. ${(
            entry.item.price * entry.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    let msg = `*NEW ORDER #${newOrderId} - AL MADINA RESTAURANT*\n`;
    msg += `Order Type: ${orderType.toUpperCase()}\n`;
    if (customerName) msg += `Name: ${customerName}\n`;
    if (customerPhone) msg += `Phone: ${customerPhone}\n`;
    if (orderType === 'delivery' && customerAddress) msg += `Address: ${customerAddress}\n`;
    if (specialNote) msg += `Special Note: ${specialNote}\n`;
    msg += `\n*Items Ordered:*\n${itemsText}\n`;
    msg += `\n*Total Bill: Rs. ${totalAmount.toLocaleString()}*\n`;
    msg += `\nPlease confirm cooking time. Tracking ID: ${newOrderId}`;

    const url = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleSearchOrder = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchOrderId.trim().toUpperCase();
    if (!query) return;

    const found = trackedOrders.find(
      (o) => o.id.toUpperCase() === query || o.id.replace(/[^0-9]/g, '') === query
    );

    if (found) {
      setSelectedOrder(found);
      setSearchError(false);
    } else {
      setSearchError(true);
    }
  };

  const getStatusStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return 0;
      case 'preparing':
        return 1;
      case 'packaging':
        return 2;
      case 'out_for_delivery':
      case 'ready_for_pickup':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  const steps = [
    { label: 'Order Confirmed', sub: 'Received in kitchen', icon: CheckCircle2 },
    { label: 'Cooking & Grill', sub: 'Firing karahi / BBQ', icon: ChefHat },
    { label: 'Quality Packaging', sub: 'Fresh naans sealed', icon: Package },
    {
      label: selectedOrder?.orderType === 'takeaway' ? 'Ready for Pickup' : 'Out for Delivery',
      sub: selectedOrder?.orderType === 'takeaway' ? 'At counter #1' : 'Rider on route',
      icon: selectedOrder?.orderType === 'takeaway' ? Package : Bike,
    },
    { label: 'Delivered / Completed', sub: 'Enjoy your meal!', icon: Sparkles },
  ];

  const currentStep = selectedOrder ? getStatusStepIndex(selectedOrder.status) : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order tray and tracking drawer"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300"
    >
      <div className="bg-[#fcfbf8] w-full max-w-lg h-full flex flex-col justify-between shadow-2xl border-l border-[#ded8c8] animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header with Dual Tabs */}
        <div className="p-4 sm:p-5 border-b border-[#ece7d9] bg-[#f7f5ed]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono tracking-widest text-[#454c46] font-semibold uppercase">
              AL MADINA KITCHEN DISPATCH
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#eae5d7] text-[#424943] transition-colors focus-visible:ring-2 focus-visible:ring-[#181c1a]"
              aria-label="Close drawer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div role="tablist" aria-label="Order drawer tabs" className="grid grid-cols-2 gap-1.5 bg-[#ede8dc] p-1 rounded-2xl border border-[#ded8c7]">
            <button
              role="tab"
              aria-selected={activeTab === 'tray'}
              onClick={() => setActiveTab('tray')}
              className={`py-2 px-3 min-h-[42px] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-[#181c1a] ${
                activeTab === 'tray'
                  ? 'bg-[#181c1a] text-white shadow-sm'
                  : 'text-[#474f46] hover:text-[#181c1a]'
              }`}
            >
              <ShoppingBag size={14} aria-hidden="true" />
              <span>Order Tray</span>
              {orderItems.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {orderItems.reduce((acc, c) => acc + c.quantity, 0)}
                </span>
              )}
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'track'}
              onClick={() => setActiveTab('track')}
              className={`py-2 px-3 min-h-[42px] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all focus-visible:ring-2 focus-visible:ring-[#181c1a] ${
                activeTab === 'track'
                  ? 'bg-[#181c1a] text-white shadow-sm'
                  : 'text-[#474f46] hover:text-[#181c1a]'
              }`}
            >
              <Compass size={14} className={activeTab === 'track' ? 'animate-spin' : ''} style={{ animationDuration: '6s' }} aria-hidden="true" />
              <span>Track Order</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Content Body: TRAY or TRACKING */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* TAB 1: ORDER TRAY */}
          {activeTab === 'tray' && (
            <>
              {orderItems.length === 0 ? (
                <div className="py-14 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#ece7da] text-[#5b635a] flex items-center justify-center mx-auto">
                    <ShoppingBag size={24} aria-hidden="true" />
                  </div>
                  <h4 className="text-base font-serif text-[#181c1a]">Your order tray is empty</h4>
                  <p className="text-xs text-[#525a51] max-w-xs mx-auto">
                    Select dishes like Chef's Sajji, Biryani, or Karahi from the menu and add them to your order tray.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setActiveTab('track')}
                      className="inline-flex items-center gap-1.5 text-xs text-[#181c1a] font-semibold underline focus-visible:ring-2"
                    >
                      <span>Already ordered? Track your live status</span>
                      <ArrowRight size={12} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Items List */}
                  <div className="divide-y divide-[#ece7da]">
                    {orderItems.map((entry) => (
                      <div key={entry.item.id} className="py-3 flex items-center justify-between gap-3 group">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#181c1a] truncate group-hover:text-amber-900 transition-colors">
                            {entry.item.name}
                          </h4>
                          <span className="text-xs text-[#525a51] tabular-nums">
                            Rs. {entry.item.price} each
                          </span>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2 bg-[#f0ecdf] px-2 py-1 rounded-full border border-[#ded8c7]">
                          <button
                            onClick={() => onUpdateQuantity(entry.item.id, -1)}
                            aria-label={`Decrease quantity of ${entry.item.name}`}
                            className="p-1.5 hover:text-black transition-transform active:scale-90 focus-visible:ring-1"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold tabular-nums w-4 text-center">
                            {entry.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(entry.item.id, 1)}
                            aria-label={`Increase quantity of ${entry.item.name}`}
                            className="p-1.5 hover:text-black transition-transform active:scale-90 focus-visible:ring-1"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-bold text-[#181c1a] tabular-nums block">
                            Rs. {(entry.item.price * entry.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => onRemoveItem(entry.item.id)}
                            className="text-[11px] font-semibold text-red-700 hover:underline flex items-center gap-0.5 justify-end"
                          >
                            <Trash2 size={11} /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Checkout Details */}
                  <div className="pt-2 border-t border-[#ece7da] space-y-3.5">
                    <div>
                      <span className="block text-xs font-semibold text-[#282f28] mb-1">
                        Service Option
                      </span>
                      <div className="grid grid-cols-2 gap-2 bg-[#f0ecdf] p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setOrderType('delivery')}
                          className={`py-2 text-xs font-semibold rounded-lg transition-colors min-h-[40px] ${
                            orderType === 'delivery'
                              ? 'bg-[#181c1a] text-white shadow-sm'
                              : 'text-[#485047] hover:text-[#181c1a]'
                          }`}
                        >
                          Delivery (Karachi)
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrderType('takeaway')}
                          className={`py-2 text-xs font-semibold rounded-lg transition-colors min-h-[40px] ${
                            orderType === 'takeaway'
                              ? 'bg-[#181c1a] text-white shadow-sm'
                              : 'text-[#485047] hover:text-[#181c1a]'
                          }`}
                        >
                          Takeaway / Pickup
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="drawer-name-input" className="block text-xs font-semibold text-[#282f28] mb-1">
                          Your Name
                        </label>
                        <input
                          id="drawer-name-input"
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Asad Khan"
                          className="w-full bg-[#f4f1e7] text-xs px-3.5 py-3 min-h-[44px] rounded-xl border border-[#d2cbba] placeholder-[#626a61] text-[#181c1a] focus:outline-none focus:ring-2 focus:ring-[#181c1a]"
                        />
                      </div>
                      <div>
                        <label htmlFor="drawer-phone-input" className="block text-xs font-semibold text-[#282f28] mb-1">
                          Phone Number
                        </label>
                        <input
                          id="drawer-phone-input"
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="+92 3..."
                          className="w-full bg-[#f4f1e7] text-xs px-3.5 py-3 min-h-[44px] rounded-xl border border-[#d2cbba] placeholder-[#626a61] text-[#181c1a] focus:outline-none focus:ring-2 focus:ring-[#181c1a]"
                        />
                      </div>
                    </div>

                    {orderType === 'delivery' && (
                      <div>
                        <label htmlFor="drawer-address-input" className="block text-xs font-semibold text-[#282f28] mb-1">
                          Delivery Address in Karachi
                        </label>
                        <input
                          id="drawer-address-input"
                          type="text"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="House/Apartment, Street, Area"
                          className="w-full bg-[#f4f1e7] text-xs px-3.5 py-3 min-h-[44px] rounded-xl border border-[#d2cbba] placeholder-[#626a61] text-[#181c1a] focus:outline-none focus:ring-2 focus:ring-[#181c1a]"
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="drawer-notes-input" className="block text-xs font-semibold text-[#282f28] mb-1">
                        Kitchen Instructions (Optional)
                      </label>
                      <input
                        id="drawer-notes-input"
                        type="text"
                        value={specialNote}
                        onChange={(e) => setSpecialNote(e.target.value)}
                        placeholder="e.g. Extra raita, mild spice, hot naan"
                        className="w-full bg-[#f4f1e7] text-xs px-3.5 py-3 min-h-[44px] rounded-xl border border-[#d2cbba] placeholder-[#626a61] text-[#181c1a] focus:outline-none focus:ring-2 focus:ring-[#181c1a]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: LIVE ORDER TRACKING UI */}
          {activeTab === 'track' && (
            <div className="space-y-6">
              
              {/* Order ID Lookup Input */}
              <form onSubmit={handleSearchOrder} className="space-y-2">
                <label htmlFor="track-order-search-input" className="block text-xs font-bold text-[#282f28] uppercase tracking-wider">
                  Track Your Food Preparation & Delivery
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#565e55]" aria-hidden="true" />
                    <input
                      id="track-order-search-input"
                      type="text"
                      value={searchOrderId}
                      onChange={(e) => {
                        setSearchOrderId(e.target.value);
                        setSearchError(false);
                      }}
                      placeholder="Enter Order ID (e.g. ORD-8821)"
                      className="w-full bg-[#f4f1e7] text-xs font-mono uppercase pl-9 pr-3.5 py-3 min-h-[44px] rounded-xl border border-[#d2cbba] placeholder-[#626a61] text-[#181c1a] focus:outline-none focus:ring-2 focus:ring-[#181c1a]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-3 min-h-[44px] bg-[#181c1a] hover:bg-[#2b332f] text-white text-xs font-bold rounded-xl transition-all active:scale-95 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#181c1a]"
                  >
                    Track
                  </button>
                </div>

                {searchError && (
                  <p className="text-xs text-red-600 flex items-center gap-1 pt-1">
                    <AlertCircle size={13} />
                    <span>Order ID not found. Please verify the ID or choose one below.</span>
                  </p>
                )}

                {/* Quick Demo Order Chips */}
                <div className="pt-2">
                  <span className="text-[10px] text-[#71786f] block mb-1.5 font-medium">
                    Quick demo orders to test:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {trackedOrders.map((ord) => (
                      <button
                        type="button"
                        key={ord.id}
                        onClick={() => {
                          setSelectedOrder(ord);
                          setSearchOrderId(ord.id);
                          setSearchError(false);
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono transition-all ${
                          selectedOrder?.id === ord.id
                            ? 'bg-[#181c1a] text-white border-[#181c1a] shadow-xs'
                            : 'bg-[#f0ecdf] text-[#555c53] border-[#ded8c7] hover:bg-[#e4ddce]'
                        }`}
                      >
                        {ord.id} ({ord.status.replace('_', ' ')})
                      </button>
                    ))}
                  </div>
                </div>
              </form>

              {/* Selected Order Display */}
              {selectedOrder ? (
                <div className="space-y-5 animate-in fade-in zoom-in-98 duration-300">
                  
                  {/* Status Banner Card */}
                  <div className="bg-[#181c1a] text-white rounded-3xl p-5 sm:p-6 shadow-md border border-[#2b332e] relative overflow-hidden">
                    {/* Glowing background gradient */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-start justify-between gap-3 relative z-10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-amber-200">
                            #{selectedOrder.id}
                          </span>
                          <span className="text-[11px] uppercase tracking-wider text-gray-400">
                            {selectedOrder.orderType.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-xl font-serif text-white mt-1.5 capitalize">
                          {selectedOrder.status.replace(/_/g, ' ')}
                        </h3>
                        <p className="text-xs text-[#9dab9f] mt-0.5">
                          Order for {selectedOrder.customerName}
                        </p>
                      </div>

                      {/* Estimated Time Remaining Pill */}
                      <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 text-right">
                        <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold justify-end">
                          <Clock size={13} className="animate-spin" style={{ animationDuration: '8s' }} />
                          <span className="tabular-nums">
                            {selectedOrder.estimatedMinutesRemaining > 0
                              ? `${selectedOrder.estimatedMinutesRemaining} mins`
                              : 'Ready!'}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-300 block">Est. Remaining</span>
                      </div>
                    </div>

                    {/* Animated Progress Meter */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="flex justify-between text-[11px] text-[#adb7b0] mb-2 font-medium">
                        <span>Preparation Progress</span>
                        <span className="text-amber-300">
                          {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/15 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: `${((currentStep + 1) / steps.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Timeline */}
                  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#dfd9c8] shadow-sm space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6b736a]">
                      Live Kitchen Timeline
                    </h4>

                    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#ece6d7]">
                      {steps.map((st, idx) => {
                        const Icon = st.icon;
                        const isDone = idx <= currentStep;
                        const isCurrent = idx === currentStep;

                        return (
                          <div key={idx} className="relative flex items-start gap-3">
                            {/* Dot / Beacon */}
                            <div
                              className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                isDone
                                  ? 'bg-[#181c1a] text-amber-200'
                                  : 'bg-[#ece8dc] text-[#8e968b]'
                              } ${isCurrent ? 'ring-4 ring-amber-400/30 ring-offset-1 scale-110' : ''}`}
                            >
                              <Icon size={11} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h5
                                  className={`text-xs font-semibold leading-tight ${
                                    isDone ? 'text-[#181c1a]' : 'text-[#848c82]'
                                  }`}
                                >
                                  {st.label}
                                </h5>
                                {isCurrent && (
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                )}
                              </div>
                              <p className="text-[11px] text-[#6e756c]">{st.sub}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Delivery / Rider / Location Card */}
                  {selectedOrder.orderType === 'delivery' && (
                    <div className="bg-[#f2eee3] rounded-2xl p-4 border border-[#ddd6c5] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#181c1a] flex items-center gap-1.5">
                          <Bike size={14} className="text-emerald-700" />
                          <span>Delivery Personnel</span>
                        </span>
                        {selectedOrder.riderPhone && (
                          <a
                            href={`tel:${selectedOrder.riderPhone}`}
                            className="inline-flex items-center gap-1 text-[11px] text-[#181c1a] font-semibold underline"
                          >
                            <PhoneCall size={11} /> Call Rider
                          </a>
                        )}
                      </div>
                      <p className="text-[#596157]">
                        {selectedOrder.riderName || 'Rider being assigned from Police Lines branch.'}
                      </p>
                      {selectedOrder.address && (
                        <div className="flex items-start gap-1.5 pt-1 text-[11px] text-[#697167]">
                          <MapPin size={12} className="shrink-0 mt-0.5 text-amber-800" />
                          <span>Delivering to: {selectedOrder.address}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Order Items Breakdown */}
                  <div className="bg-white rounded-2xl p-4 border border-[#dfd9c8] space-y-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737a71] block">
                      Dishes in this order:
                    </span>
                    <div className="divide-y divide-[#f2efe4] text-xs">
                      {selectedOrder.items.map((it, idx) => (
                        <div key={idx} className="py-2 flex justify-between items-center">
                          <span className="text-[#181c1a] font-medium">
                            {it.name} <span className="text-[#727a71]">x{it.quantity}</span>
                          </span>
                          <span className="font-semibold tabular-nums text-[#181c1a]">
                            Rs. {(it.price * it.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#dfd9c8] flex justify-between items-center font-semibold text-xs sm:text-sm text-[#181c1a]">
                      <span>Total Amount:</span>
                      <span className="tabular-nums">
                        Rs. {selectedOrder.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Direct Contact with Dispatcher */}
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Salam! I am tracking Order #${selectedOrder.id} (${selectedOrder.customerName}). Please update me on the latest status.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#181c1a] hover:bg-[#2b332f] text-white text-xs font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
                  >
                    <MessageCircle size={15} className="text-emerald-400" />
                    <span>Inquire about this order on WhatsApp</span>
                  </a>

                </div>
              ) : (
                <div className="text-center py-10 text-xs text-[#6e756c]">
                  Select an order ID or search above to view real-time preparation status.
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Subtotal & Action (When on Tray Tab) */}
        {activeTab === 'tray' && orderItems.length > 0 && (
          <div className="p-5 border-t border-[#ece7d9] bg-[#f8f6ed] space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-[#6a7167] block">Subtotal</span>
                <span className="text-[11px] text-emerald-700 font-medium">
                  {orderType === 'delivery' ? 'Free Delivery in Police Lines area' : 'Takeaway Packaging Included'}
                </span>
              </div>
              <span className="text-lg font-bold text-[#181c1a] tabular-nums">
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3.5 px-4 bg-[#181c1a] hover:bg-[#2c332e] text-white text-xs sm:text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <MessageCircle size={16} className="text-emerald-400" />
              <span>Place Order & Start Tracking</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={onClearOrder}
              className="w-full text-center text-[11px] text-[#7e857c] hover:text-red-700"
            >
              Clear Order Tray
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
