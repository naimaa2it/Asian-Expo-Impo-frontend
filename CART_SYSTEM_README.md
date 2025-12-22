# Shopping Cart System - Implementation Guide

## Overview
This document describes the complete shopping cart system implemented for Asian Import Export Co website.

## Features Implemented

### 1. **Cart Context & State Management**
- Global cart state using React Context API
- Persistent cart storage using localStorage
- Auto-save/load functionality

**Location:** `src/context/CartContext.jsx`

**Key Functions:**
- `addToCart(product)` - Add/update items in cart
- `removeFromCart(productId)` - Remove item from cart
- `updateQuantity(productId, quantity)` - Update item quantity
- `clearCart()` - Empty the cart
- `getCartTotal()` - Calculate total amount
- `getCartItemCount()` - Get total items count
- `canProceedToCheckout()` - Validate cart before checkout

### 2. **Floating Cart Button**
- Fixed position on left middle of screen
- Shows item count and total amount
- Only visible when cart has items
- Animated badge for item count

**Location:** `src/components/Cart/FloatingCartButton.jsx`

### 3. **Cart Sidebar Drawer**
- Full-screen on mobile, 1/4 screen on desktop
- Displays all cart items with:
  - Product image
  - Product name
  - Price
  - Quantity controls (editable)
  - Delete button
- Shows subtotal
- "Proceed to Checkout" button with validation
- Opens from right side

**Location:** `src/components/Cart/CartSidebar.jsx`

### 4. **Navbar Cart Badge**
- Cart button in navbar with item count badge
- Clicking opens the cart sidebar

**Location:** Updated in `src/components/Navbar/Navbar.jsx`

### 5. **Product Details - Add to Cart**
- Quantity selector on product page
- "Add to Cart" button
- Automatically extracts price and product info

**Location:** Updated in `src/components/DynamicProductCatalog/ProductDetails.jsx`

### 6. **Checkout Page**
- Two-column layout (form + order summary)
- Customer information form:
  - Full Name
  - Phone Number
  - Email Address
  - Street Address
  - City, State, Zip Code
  - Additional Notes (optional)
- Payment method selection:
  - Pay with Credit Card
  - Pay with Bank Transfer
- Order summary with all items
- Total amount in USD
- "Place Order" button

**Location:** `src/PageComponents/CheckoutPage.jsx`
**Route:** `app/checkout/page.jsx`

### 7. **Order Success Page**
- Confirmation message
- Email notification reminder
- Navigation buttons (Home, Continue Shopping)
- Order ID display

**Location:** `app/order-success/page.jsx`

### 8. **Cart Validation Rules**

#### Minimum Tyre Quantity (50 units)
```javascript
// For truck/tyre category only
if (categories.includes('truck')) {
  const tyreCount = getTotalTyreQuantity();
  if (tyreCount < 50) {
    // Show error message
    return false;
  }
}
```

#### Single Category Restriction
```javascript
// Check if multiple categories exist
if (categories.length > 1) {
  // Show WhatsApp contact option
  // User must contact for custom orders
  return false;
}
```

**Validation Messages:**
- "Minimum order for tyres is 50 units. You have X tyres in cart."
- "Multiple categories detected. For custom orders with mixed categories, please contact us through WhatsApp."

### 9. **Backend Email System**
- Nodemailer integration for sending invoices
- Two emails sent per order:
  1. **Customer Email** - Order confirmation with full details
  2. **Admin Email** - New order notification

**Location:** `Asian_Import_Export_Co_Backend/index.js`

**Endpoint:** `POST /api/send-invoice`

**Email includes:**
- Order ID (auto-generated)
- Order date & time
- Customer information
- Shipping address
- All items with quantities and prices
- Subtotal and total amount
- Payment method selected
- Customer notes

## Usage Instructions

### For Users

1. **Browse Products:**
   - Navigate to any product page
   - Select quantity using +/- buttons
   - Click "Add to Cart"

2. **View Cart:**
   - Click the floating cart button (left middle of screen)
   - OR click "Cart" in navbar
   - Cart sidebar opens showing all items

3. **Manage Cart:**
   - Adjust quantities using +/- buttons or direct input
   - Remove items with trash icon
   - View running subtotal

4. **Checkout:**
   - Click "Proceed to Checkout" in cart sidebar
   - Cart validates automatically:
     - ✓ Minimum 50 tyres if buying tyres
     - ✓ Single category only
   - If validation fails, appropriate message shown

5. **Complete Order:**
   - Fill in shipping information
   - Select payment method
   - Review order summary on right
   - Click "Place Order"
   - Receive confirmation email

### For Developers

#### Adding Cart Functionality to New Components

```javascript
import { useCart } from '@/context/CartContext';

function YourComponent() {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: 29.99,
      quantity: 1,
      image: product.image,
      category: 'Truck', // Important for validation
    });
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
}
```

#### Customizing Validation Rules

Edit `src/context/CartContext.jsx`:

```javascript
const canProceedToCheckout = () => {
  // Add your custom validation logic here
  
  // Example: Minimum order value
  const total = getCartTotal();
  if (total < 100) {
    return {
      canProceed: false,
      message: 'Minimum order value is $100',
    };
  }
  
  return { canProceed: true };
};
```

#### Updating Email Templates

Edit `Asian_Import_Export_Co_Backend/index.js`:

Search for the `/api/send-invoice` endpoint and modify the HTML templates in `customerEmailHTML` and `adminEmailHTML` variables.

## Environment Variables

### Backend (.env)

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=your-email@domain.com
SMTP_PASSWORD=your-password
OWNER_EMAIL=admin@asianimportexport.com
PORT=5000
```

## Testing Checklist

- [ ] Add item to cart from product page
- [ ] Cart persists after page refresh
- [ ] Cart count shows in navbar and floating button
- [ ] Sidebar opens/closes properly
- [ ] Quantity can be updated
- [ ] Items can be deleted
- [ ] Subtotal calculates correctly
- [ ] Tyre minimum quantity validation (50 units)
- [ ] Multiple category validation
- [ ] WhatsApp redirect for mixed categories
- [ ] Checkout form validation
- [ ] Order placement successful
- [ ] Customer receives email
- [ ] Admin receives email
- [ ] Order success page displays
- [ ] Cart clears after successful order

## API Endpoints

### Frontend → Backend

**Send Invoice Email**
```
POST http://localhost:5000/api/send-invoice

Body: {
  customer: {
    name: string,
    phone: string,
    email: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    notes: string
  },
  items: [{
    id: string,
    name: string,
    price: number,
    quantity: number,
    image: string
  }],
  subtotal: number,
  total: number,
  orderDate: string,
  paymentMethod: string ('credit-card' | 'bank')
}

Response: {
  success: boolean,
  orderId: string,
  message: string
}
```

## Troubleshooting

### Cart not persisting
- Check browser's localStorage is enabled
- Clear localStorage and try again: `localStorage.clear()`

### Emails not sending
- Verify SMTP credentials in backend `.env`
- Check backend console for error messages
- Test SMTP connection separately

### Validation not working
- Check product category is set correctly
- Verify cart context is properly wrapped in app layout
- Console.log validation results for debugging

### Floating button not showing
- Ensure CartProvider wraps the app in layout.js
- Check cart has items: `localStorage.getItem('asian-cart')`

## Future Enhancements

- [ ] Apply coupon codes
- [ ] Shipping cost calculator
- [ ] Tax calculation
- [ ] Order tracking
- [ ] User accounts & order history
- [ ] Wishlists
- [ ] Product recommendations in cart
- [ ] Multi-currency support
- [ ] PDF invoice generation
- [ ] SMS notifications

## Contact

For questions or issues, contact the development team or refer to the main project README.
