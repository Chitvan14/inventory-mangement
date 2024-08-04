// src/interfaces/Item.ts
export interface Item {
  id?: number;
  item_name: string;
  mrp: string;
  net_rate: string;
  customer_rate: string;
  doctor_rate: string;
  party: string;
}

// src/interfaces/Party.ts
export interface Party {
  id?: number;
  name: string;
}
export interface User {
  name: string; email: string;
  _json: any;
}
