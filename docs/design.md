# Design Specification & Style Guide
## Al Madina Restaurant — Brand & Interface Design Constitution

---

## 1. Design Direction & Domain Aesthetics
The interface embodies authentic Pakistani hospitality with warm, understated elegance. It deliberately avoids generic SaaS layouts, cold neon blues, and artificial AI gradients. Instead, it balances warm parchment tones, deep slate architectural surfaces, and refined editorial typography inspired by culinary tradition.

---

## 2. Color Palette & The 60-30-10 Distribution Rule

| Role | Color Name | Hex Code | Purpose & Application |
| :--- | :--- | :--- | :--- |
| **60% Dominant Canvas** | Warm Ecru / Linen | `#FCFBF7` | Clean page canvas, spacious margins, light content cards |
| **30% Structural Surfaces** | Dark Slate / Charcoal | `#141715` / `#181C1A` | Navigation bar, story card ("The Place"), dark testimonials, footer |
| **30% Secondary Neutral** | Muted Sandstone | `#F0EDE3` / `#ECE8DC` | Bento frames, reservation form container, search input backgrounds |
| **10% Intentional Accent** | Amber & Desi Ghee Gold | `#D97706` / `#F59E0B` | Ratings stars, chef tags, WhatsApp notification badge, interactive states |
| **Semantic Indicator** | Fresh Mint Green | `#10B981` | 24/7 Live kitchen pulse, WhatsApp communication triggers |

---

## 3. Typographic Hierarchy & The 2+1 Font Rule

1. **Display & Expressive Heading Face:**  
   - **Font Family:** `Instrument Serif` (Google Fonts), fallback to `Georgia`, `serif`.
   - **Characteristics:** Elegant high-contrast strokes with deliberate italics on emotive words (*Warmly*, *every craving*, *made welcoming*, *Al Madina*, *meal together?*).
   - **Scale:**
     - Hero Headline: `text-5xl sm:text-6xl lg:text-7xl` (`leading-[1.08]`, `text-balance`)
     - Section Titles: `text-3xl sm:text-4xl lg:text-5xl`
     - Card Headings: `text-lg sm:text-xl`

2. **Body & Interface Text Face:**  
   - **Font Family:** `Plus Jakarta Sans`, fallback to system UI sans-serif.
   - **Characteristics:** Clean geometric structure, optimized x-height for readability on mobile and high-density screens.
   - **Weights:** Regular 400, Medium 500, SemiBold 600, Bold 700.

3. **Numeric & Monospace Outlier:**  
   - Tabular numerals (`tabular-nums`) applied to all dish prices (`Rs. 1,800`), reservation IDs (`#RES-8921`), timestamps, and table guest counters to prevent layout jank.

---

## 4. Top Bar Contract (3 Zones)

```
[ AL MADINA RESTAURANT ] ──── [ Menu · Our Story · Reviews · Gallery · Reserve · Contact ] ──── [ Dashboard · Order Now ]
```
- **Zone 1 (Brand Wordmark):** Single wordmark with square culinary brand badge.
- **Zone 2 (Navigation Links):** Clean text links with subtle hover transitions.
- **Zone 3 (Actions):** Staff Management Portal button and primary `Order Now` pill with active order badge.

---

## 5. Media Placeholder System Guidelines for the Design Team

Per project requirements, **no hardcoded external images are used**. All media slots are rendered using the reactive `MediaPlaceholder` component.

### Master Image Specification Registry

| Slot ID | Section | Target Dimensions | Aspect Ratio | Art Direction & Framing Brief |
| :--- | :--- | :--- | :--- | :--- |
| `hero-biryani` | Hero | `600 x 800` | 3:4 (Portrait) | High-angle overhead shot of Karachi Chicken Biryani in brass tray, saffron basmati, garnished with mint. |
| `hero-chef` | Hero | `600 x 800` | 3:4 (Portrait) | Chef in crisp white uniform carving Sajji roasted chicken under warm kitchen pendant lighting. |
| `dish-sajji` | Menu | `800 x 600` | 4:3 (Landscape) | Whole roasted chicken on bed of spiced rice with sliced lemons and green chilies. |
| `dish-biryani` | Menu | `800 x 600` | 4:3 (Landscape) | Steaming double-masala biryani with tender chicken drumstick and cucumber raita bowl. |
| `dish-karahi` | Menu | `800 x 600` | 4:3 (Landscape) | Authentic round iron/copper wok filled with tomato gravy, julienned ginger, and coriander. |
| `dish-bbq-platter` | Menu | `800 x 600` | 4:3 (Landscape) | Charcoal-grilled seekh kababs, creamy chicken malai boti, and spicy tikka skewers. |
| `dish-zinger` | Menu | `800 x 600` | 4:3 (Landscape) | Golden crispy fried chicken fillet burger with shredded lettuce and mayonnaise in sesame bun. |
| `dish-lassi` | Menu | `800 x 600` | 4:3 (Landscape) | Chilled sweet mango yogurt lassi in tall ribbed glass with crushed pistachios. |
| `story-dining` | The Place | `800 x 450` | 16:9 (Wide) | Warm ambient restaurant dining room with timber tables, soft amber lighting, and family booths. |
| `story-bread` | The Place | `400 x 400` | 1:1 (Square) | Fresh blistering Roghni Naan being retrieved from clay tandoor oven. |
| `location-map` | Contact | `800 x 500` | 16:10 | Clean neighborhood street map showing Police Lines Quarters with highlighted landmark. |

### How the Design Team Replaces Placeholders:
1. Export images in **WebP or JPEG format** matching the exact target dimensions.
2. Place files into `/public/assets/{slot-id}.jpg` or upload them directly via the **Design Team Media Slots Portal** in the Staff Dashboard for live preview.
3. The component automatically switches from placeholder mode to full-fidelity photography without touching layout or styles!
