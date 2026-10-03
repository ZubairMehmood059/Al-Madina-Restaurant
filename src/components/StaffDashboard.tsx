import React, { useState } from 'react';
import {
  X,
  Calendar,
  UtensilsCrossed,
  Image as ImageIcon,
  CheckCircle,
  Clock,
  Phone,
  MessageCircle,
  Sliders,
  Sparkles,
  ShoppingBag,
  Bike,
} from 'lucide-react';
import { Reservation, MenuItem, MediaSlot, TrackedOrder, OrderStatus } from '../types';

interface StaffDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onUpdateReservationStatus: (id: string, status: Reservation['status']) => void;
  menuItems: MenuItem[];
  onToggleDishAvailability: (dishId: string) => void;
  onUpdateDishPrice: (dishId: string, newPrice: number) => void;
  mediaSlots: MediaSlot[];
  onUploadMediaSlotPreview?: (slotId: string, imageSrc: string) => void;
  trackedOrders?: TrackedOrder[];
  onUpdateOrderStatus?: (orderId: string, status: OrderStatus, minutes?: number) => void;
}

export const StaffDashboard: React.FC<StaffDashboardProps> = ({
  isOpen,
  onClose,
  reservations,
  onUpdateReservationStatus,
  menuItems,
  onToggleDishAvailability,
  onUpdateDishPrice,
  mediaSlots,
  onUploadMediaSlotPreview,
  trackedOrders = [],
  onUpdateOrderStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'menu' | 'media'>('orders');
  const [filterResStatus, setFilterResStatus] = useState<string>('all');
  const [filterOrderStatus, setFilterOrderStatus] = useState<string>('all');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  if (!isOpen) return null;

  const filteredReservations = reservations.filter((r) => {
    if (filterResStatus === 'all') return true;
    return r.status === filterResStatus;
  });

  const filteredOrders = trackedOrders.filter((o) => {
    if (filterOrderStatus === 'all') return true;
    return o.status === filterOrderStatus;
  });

  const handleFileUpload = (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadMediaSlotPreview) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUploadMediaSlotPreview(slotId, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#fcfbf8] text-[#181c1a] border border-[#dcd6c5] rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Dashboard Header */}
        <div className="px-6 py-5 border-b border-[#ece7d9] flex items-center justify-between bg-[#f6f3ea]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#181c1a] text-amber-200 flex items-center justify-center shadow-sm">
              <Sliders size={18} />
            </div>
            <div>
              <h2 className="text-lg font-serif font-normal text-[#161a18]">
                Al Madina Operations & Design Portal
              </h2>
              <p className="text-xs text-[#6e756c]">
                Live kitchen orders, table bookings, menu stock & media slots
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#ede7da] text-[#5e655c] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-[#ece7d9] bg-[#fcfbf8] flex items-center gap-2 overflow-x-auto">
          {/* Active Orders Tab */}
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'orders'
                ? 'border-[#181c1a] text-[#181c1a] bg-[#f4efe4]'
                : 'border-transparent text-[#6d746b] hover:text-[#181c1a]'
            }`}
          >
            <ShoppingBag size={15} />
            <span>Kitchen Orders</span>
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">
              {trackedOrders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'reservations'
                ? 'border-[#181c1a] text-[#181c1a] bg-[#f4efe4]'
                : 'border-transparent text-[#6d746b] hover:text-[#181c1a]'
            }`}
          >
            <Calendar size={15} />
            <span>Table Reservations</span>
            <span className="w-5 h-5 rounded-full bg-[#181c1a] text-white text-[10px] flex items-center justify-center">
              {reservations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'menu'
                ? 'border-[#181c1a] text-[#181c1a] bg-[#f4efe4]'
                : 'border-transparent text-[#6d746b] hover:text-[#181c1a]'
            }`}
          >
            <UtensilsCrossed size={15} />
            <span>Menu & Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all border-b-2 ${
              activeTab === 'media'
                ? 'border-[#181c1a] text-[#181c1a] bg-[#f4efe4]'
                : 'border-transparent text-[#6d746b] hover:text-[#181c1a]'
            }`}
          >
            <ImageIcon size={15} />
            <span>Design Team Media Slots</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-900 border border-amber-300">
              Placeholders ({mediaSlots.length})
            </span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#fbf9f4]">
          
          {/* TAB 0: KITCHEN ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f2ede1] p-3 rounded-2xl border border-[#ded8c7]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['all', 'confirmed', 'preparing', 'packaging', 'out_for_delivery', 'ready_for_pickup', 'delivered'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterOrderStatus(st)}
                      className={`px-3 py-1 rounded-lg text-xs capitalize font-medium transition-colors ${
                        filterOrderStatus === st
                          ? 'bg-[#181c1a] text-white shadow-sm'
                          : 'text-[#5f655d] hover:text-[#181c1a]'
                      }`}
                    >
                      {st.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>

                <span className="text-xs text-[#6e746c]">
                  Showing {filteredOrders.length} orders
                </span>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="py-16 text-center bg-[#f6f2e8] rounded-3xl border border-[#ded8c7]">
                  <ShoppingBag size={28} className="text-[#848a81] mx-auto mb-2" />
                  <p className="text-sm text-[#61675e]">No orders in this state.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-[#dfd9c8] shadow-sm space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f0ece1] pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#181c1a] text-white">
                            #{ord.id}
                          </span>
                          <h4 className="text-sm font-semibold text-[#181c1a]">{ord.customerName}</h4>
                          <span className="text-[11px] uppercase tracking-wider text-[#697067] bg-[#f2eee3] px-2 py-0.5 rounded">
                            {ord.orderType}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#686f66] flex items-center gap-1">
                            <Clock size={12} /> {ord.createdAt}
                          </span>
                          <span className="font-semibold text-xs text-[#181c1a] tabular-nums">
                            Total: Rs. {ord.totalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Order items list */}
                      <div className="text-xs text-[#525950] bg-[#faf8f2] p-3 rounded-xl border border-[#ece7d9] flex flex-wrap gap-x-4 gap-y-1">
                        {ord.items.map((it, idx) => (
                          <span key={idx}>
                            • {it.name} <strong className="text-black">x{it.quantity}</strong>
                          </span>
                        ))}
                      </div>

                      {ord.address && (
                        <p className="text-xs text-[#626960]">
                          <strong>Delivery Address:</strong> {ord.address}
                        </p>
                      )}

                      {/* Status Management Row */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <label className="text-xs font-medium text-[#464c44]">
                            Update Status:
                          </label>
                          <select
                            value={ord.status}
                            onChange={(e) => {
                              if (onUpdateOrderStatus) {
                                const newSt = e.target.value as OrderStatus;
                                const remainingMins =
                                  newSt === 'delivered' || newSt === 'ready_for_pickup'
                                    ? 0
                                    : newSt === 'out_for_delivery'
                                    ? 10
                                    : newSt === 'packaging'
                                    ? 15
                                    : newSt === 'preparing'
                                    ? 22
                                    : 30;
                                onUpdateOrderStatus(ord.id, newSt, remainingMins);
                              }
                            }}
                            className="text-xs bg-[#f4f1e7] border border-[#ded8c9] rounded-xl px-3 py-1.5 font-medium text-[#181c1a] focus:outline-none"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="preparing">Preparing in Kitchen</option>
                            <option value="packaging">Packaging & Quality Check</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="ready_for_pickup">Ready for Pickup</option>
                            <option value="delivered">Delivered / Completed</option>
                          </select>
                        </div>

                        {ord.phone && (
                          <a
                            href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Salam ${ord.customerName}, your Al Madina Restaurant order #${ord.id} status is now: ${ord.status.replace(/_/g, ' ')}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-semibold flex items-center gap-1 border border-emerald-200"
                          >
                            <MessageCircle size={13} />
                            <span>Notify Customer</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 1: RESERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f2ede1] p-3 rounded-2xl border border-[#ded8c7]">
                <div className="flex items-center gap-1.5">
                  {['all', 'pending', 'confirmed', 'seated', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterResStatus(status)}
                      className={`px-3 py-1 rounded-lg text-xs capitalize font-medium transition-colors ${
                        filterResStatus === status
                          ? 'bg-[#181c1a] text-white shadow-sm'
                          : 'text-[#5f655d] hover:text-[#181c1a]'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <span className="text-xs text-[#6e746c]">
                  Showing {filteredReservations.length} requests
                </span>
              </div>

              {filteredReservations.length === 0 ? (
                <div className="py-16 text-center bg-[#f6f2e8] rounded-3xl border border-[#ded8c7]">
                  <Calendar size={28} className="text-[#848a81] mx-auto mb-2" />
                  <p className="text-sm text-[#61675e]">No reservations under this status.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredReservations.map((res) => (
                    <div
                      key={res.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-[#dfd9c8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#f2eee3] text-[#555b53]">
                            #{res.id}
                          </span>
                          <h4 className="text-base font-semibold text-[#181c1a]">{res.name}</h4>
                          <span
                            className={`text-[11px] px-2.5 py-0.5 rounded-full capitalize font-semibold ${
                              res.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : res.status === 'seated'
                                ? 'bg-blue-100 text-blue-800'
                                : res.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {res.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-[#616860]">
                          <span className="flex items-center gap-1 font-medium">
                            <Clock size={13} /> {res.date} at {res.time}
                          </span>
                          <span>·</span>
                          <span className="font-semibold text-[#181c1a]">{res.guests} Guests</span>
                          <span>·</span>
                          <a
                            href={`tel:${res.phone}`}
                            className="flex items-center gap-1 hover:text-black underline"
                          >
                            <Phone size={12} /> {res.phone}
                          </a>
                        </div>

                        {res.note && (
                          <p className="text-xs text-[#70776d] italic bg-[#faf8f2] p-2 rounded-lg border border-[#ece7d9]">
                            "{res.note}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${res.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Salam ${res.name}, this is Al Madina Restaurant confirming your table request for ${res.guests} guests on ${res.date} at ${res.time}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-semibold flex items-center gap-1 border border-emerald-200"
                        >
                          <MessageCircle size={14} />
                          <span>WhatsApp</span>
                        </a>

                        <select
                          value={res.status}
                          onChange={(e) =>
                            onUpdateReservationStatus(
                              res.id,
                              e.target.value as Reservation['status']
                            )
                          }
                          className="text-xs bg-[#f4f1e7] border border-[#ded8c9] rounded-xl px-3 py-2 text-[#181c1a] focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="seated">Seated</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: MENU & DISHES */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              <div className="bg-[#f0ebe0] p-4 rounded-2xl border border-[#ddd6c5] flex justify-between items-center text-xs text-[#555c54]">
                <span>Manage active dishes, prices, and stock availability for real-time customer ordering.</span>
                <span className="font-semibold">{menuItems.length} Dishes</span>
              </div>

              <div className="bg-white rounded-2xl border border-[#dfd9c8] overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f5f2e8] text-[#5a6158] border-b border-[#ece7da]">
                    <tr>
                      <th className="py-3 px-4">Dish</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Tag</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Stock Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ece7da]">
                    {menuItems.map((dish) => (
                      <tr key={dish.id} className="hover:bg-[#fbf9f4]">
                        <td className="py-3 px-4">
                          <span className="font-semibold text-sm text-[#181c1a] block">
                            {dish.name}
                          </span>
                          <span className="text-[11px] text-[#6d746b]">
                            Media Slot: {dish.placeholderId} ({dish.dimensions})
                          </span>
                        </td>
                        <td className="py-3 px-4">{dish.category}</td>
                        <td className="py-3 px-4">
                          {dish.tag ? (
                            <span className="px-2 py-0.5 rounded bg-[#f0ebd9] text-[#181c1a] font-medium text-[11px]">
                              {dish.tag}
                            </span>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="py-3 px-4 font-semibold tabular-nums">
                          {editingPriceId === dish.id ? (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                value={tempPrice}
                                onChange={(e) => setTempPrice(Number(e.target.value))}
                                className="w-20 px-2 py-1 border rounded bg-white"
                              />
                              <button
                                onClick={() => {
                                  onUpdateDishPrice(dish.id, tempPrice);
                                  setEditingPriceId(null);
                                }}
                                className="px-2 py-1 bg-[#181c1a] text-white rounded text-[10px]"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span>Rs. {dish.price.toLocaleString()}</span>
                              <button
                                onClick={() => {
                                  setEditingPriceId(dish.id);
                                  setTempPrice(dish.price);
                                }}
                                className="text-[10px] text-[#71786f] hover:underline"
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => onToggleDishAvailability(dish.id)}
                            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                              dish.available
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {dish.available ? 'In Stock ✓' : 'Sold Out ✕'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: DESIGN TEAM MEDIA SLOTS */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="bg-[#f0ebe0] p-5 rounded-2xl border border-[#ded8c7] space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#181c1a]">
                  <Sparkles size={16} className="text-amber-700" />
                  <span>Design Team Media Integration Hub</span>
                </div>
                <p className="text-xs text-[#525a51] leading-relaxed">
                  Per project brief, all photography is configured with pixel-perfect responsive placeholders so the design team can finalize visual branding. Below is the master registry of all media slots. You can view target specifications and test-upload previews.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mediaSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className="bg-white rounded-2xl p-5 border border-[#dfd9c8] shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#f3efe4] text-[#636b62]">
                          {slot.section} · {slot.id}
                        </span>
                        <h4 className="text-sm font-bold text-[#181c1a] mt-1.5">{slot.label}</h4>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-semibold text-[#181c1a] block">
                          {slot.dimensions}
                        </span>
                        <span className="text-[11px] text-[#71786f]">{slot.aspectRatio} Ratio</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#636a61] bg-[#faf8f2] p-2.5 rounded-xl border border-[#ece7d9]">
                      <span className="font-semibold text-[#181c1a]">Art Direction: </span>
                      {slot.recommendedSubject}
                    </p>

                    <div className="pt-2 flex items-center justify-between gap-3 text-xs border-t border-[#f0ece1]">
                      <span className="text-[11px] font-mono text-[#787f76]">
                        Target file: <code className="bg-[#f4efe4] px-1 py-0.5 rounded">/assets/{slot.id}.jpg</code>
                      </span>

                      <label className="cursor-pointer px-3 py-1.5 bg-[#f0ebd9] hover:bg-[#e4ddc8] text-[#181c1a] text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5">
                        <ImageIcon size={13} />
                        <span>Test Preview</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(slot.id, e)}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Dashboard Footer */}
        <div className="px-6 py-4 border-t border-[#ece7d9] bg-[#f6f3ea] flex items-center justify-between text-xs text-[#6e756c]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Al Madina Operations Center · Police Lines Quarters, Karachi</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#181c1a] text-white rounded-xl text-xs font-semibold hover:bg-[#2e3531]"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
