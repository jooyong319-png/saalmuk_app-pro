export interface CouponCode {
  code: string;
  issueDate: string;
  expireDate: string;
  event: string;
  author?: string;
}

export interface DiscountItem {
  id: number;
  name: string;
  description: string;
  type: "UID" | "PIN";
  discount: number;
  originalPrice: number;
}

export interface ProductInfo {
  checkMethod: string;
  registerSteps: string[];
  note: string;
}

export interface Coupon {
  id: number;
  name: string;
  description: string;
  image: string;
  bannerImages?: string[];
  codes: CouponCode[];
  genre: string;
  discountItems?: DiscountItem[];
  productInfo?: ProductInfo;
}
