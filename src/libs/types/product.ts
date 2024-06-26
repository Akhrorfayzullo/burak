import { ObjectId } from "mongoose";
import {
	ProductCollection,
	ProductSize,
	ProductStatus,
	ProductVolume,
} from "../enums/product.enums";

export interface Product {
	_id: ObjectId;
	productStatus: ProductStatus;
	productCollection: ProductCollection;
	productName: string;
	productPrice: number;
	productLefCount: number;
	productSize: ProductSize;
	productVolume: number;
	productDesc?: string;
	productImages: string[];
	productViews: number;
}

export interface ProductInput {
	productStatus?: ProductStatus;
	productCollection: ProductCollection;
	productName: string;
	productPrice: number;
	productLefCount: number;
	productSize?: ProductSize;
	productVolume?: number;
	productDesc?: string;
	productImages?: string[];
	productViews?: number;
}

export interface ProductInputUpdateInput {
  _id: ObjectId;
	productStatus?: ProductStatus;
	productCollection?: ProductCollection;
	productName?: string;
	productPrice?: number;
	productLefCount?: number;
	productSize?: ProductSize;
	productVolume?: number;
	productDesc?: string;
	productImages?: string[];
	productViews?: number;
}