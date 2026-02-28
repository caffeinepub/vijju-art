import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GalleryItem {
    id: bigint;
    title: string;
    description: string;
    imageUrl: string;
    category: Category;
}
export type Time = bigint;
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export enum Category {
    customOrders = "customOrders",
    portraitArt = "portraitArt",
    pencilSketch = "pencilSketch"
}
export interface backendInterface {
    addGalleryItem(title: string, category: Category, description: string, imageUrl: string): Promise<void>;
    claimOwner(): Promise<string>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllGalleryItems(): Promise<Array<GalleryItem>>;
    getGalleryItemsByCategory(category: Category): Promise<Array<GalleryItem>>;
    getOwner(): Promise<string>;
    seedInitialGalleryItems(): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
}
