/* eslint-disable @typescript-eslint/no-empty-interface */

export interface User {
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  favoriteFlavor?: string | null;
  cart?: Cart[];
  paymentInfo?: {
    firstName: string;
    lastName: string;
    shippingAddress: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    creditCardNumber: string;
    creditCardCVV: string;
    creditCardExpire: string;
    creditCardType: string;
    creditCardNameOnCard: string;
  };
}
export interface Brand {
  name: string;
  countryOfOrigin: string;
  contactNumber: string;
  contactEmail: string;
}
export interface Product {
  type: string;
  brand: Brand;
  flavors: string[];
  colors: string[];
  sizes: string[];
  prices: string[];
  inStock: boolean;
  internationalShipping: boolean;
  isDeal: boolean;
  id: string;
}
export interface Cart {
  item: Product | undefined;
  quantity: number | undefined;
  size: string | undefined;
  flavor: string | undefined;
  color: string | undefined;
  price: number | 0;
  id: string | undefined;
}
export interface Order {
  cart: Cart[] | undefined;
  totalPrice: number | undefined;
  confirmation: string | undefined;
  user: User | undefined;
  date: string;
  id: string | undefined;
}
