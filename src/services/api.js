import { toast } from 'react-toastify';

import Amul from "../assets/Amul.avif";
import Amul2 from "../assets/Amul2.avif";
import potato from "../assets/potato.avif";
import potato2 from "../assets/potato2.avif";
import ginger from "../assets/ginger.avif";
import carrot from "../assets/carrot.avif";
import cucumber from "../assets/cucumber.avif";
import cauliflower from "../assets/cauliflower.avif";
import onion from "../assets/onion.avif";
import tomato from "../assets/tomato.avif";
import shimla from "../assets/shimla.avif";
import papaya from "../assets/papaya.avif";
import cabbage from "../assets/cabbage.avif";
import beas from "../assets/beas.avif";
import banana from "../assets/banana.avif";
import coconut from "../assets/coconut.avif";
import pomegranate from "../assets/pomegranate.avif";
import apple from "../assets/apple.avif";
import orange from "../assets/orange.avif";
import mango from "../assets/mango.avif";
import Lime from "../assets/Lime.avif";
import fish from "../assets/fish.avif";
import mutton from "../assets/mutton.avif";
import bread from "../assets/bread.avif";
import bread2 from "../assets/bread2.avif";
import bread3 from "../assets/bread3.avif";

const BASE_PRODUCTS = [
    { id: 1, name: "Amul Taaza Toned Fresh Milk", category: "Dairy", price: 28, image: Amul, quantity: "500ml", unit: 1 },
    { id: 2, name: "Amul Taaza Homogenised Toned Milk", category: "Dairy", price: 74, image: Amul2, quantity: "1ltr", unit: 1 },
    { id: 3, name: "Chandramukhi Potato - New Crop (Alu)", category: "Vegetables", price: 31, image: potato, quantity: "1kg", unit: 1 },
    { id: 4, name: "Ginger (Adrak)", category: "Vegetables", price: 25, image: ginger, quantity: "200gm", unit: 1 },
    { id: 5, name: "Orange Carrot (Gajor)", category: "Vegetables", price: 22, image: carrot, quantity: "500g", unit: 1 },
    { id: 6, name: "Green Cucumber (Shosha)", category: "Vegetables", price: 27, image: cucumber, quantity: "(500-700g)", unit: 1 },
    { id: 7, name: "Cauliflower (Phoolkobi)", category: "Vegetables", price: 33, image: cauliflower, quantity: "1 piece (300-500 g)", unit: 1 },
    { id: 8, name: "Onion (Peyaj)", category: "Vegetables", price: 36, image: onion, quantity: "(0.95-1.05) kg", unit: 1 },
    { id: 9, name: "Desi Tomato (Tamatar)", category: "Vegetables", price: 15, image: tomato, quantity: "500g", unit: 1 },
    { id: 10, name: "Jyoti Potato - New Crop (Alu)", category: "Vegetables", price: 29, image: potato2, quantity: "(0.95-1.05) kg", unit: 1 },
    { id: 11, name: "Green Capsicum (Shimla Mircha)", category: "Vegetables", price: 23, image: shimla, quantity: "(250-280) g", unit: 1 },
    { id: 12, name: "Raw Papaya (Kacha Pepe)", category: "Vegetables", price: 48, image: papaya, quantity: "1 piece (400-600 g)", unit: 1 },
    { id: 13, name: "Cabbage (Bandhakopi)", category: "Vegetables", price: 17, image: cabbage, quantity: "1 piece (400-600 g)", unit: 1 },
    { id: 14, name: "French Beans - 250 g (Same)", category: "Vegetables", price: 24, image: beas, quantity: "250g", unit: 1 },
    { id: 15, name: "Baby Banana (Kola)", category: "Fruits", price: 32, image: banana, quantity: "4 pieces", unit: 1 },
    { id: 16, name: "Brown Coconut (Narkel)", category: "Fruits", price: 55, image: coconut, quantity: "1 piece", unit: 1 },
    { id: 17, name: "Pomegranate - Medium (500g - 700 g) (Anar)", category: "Fruits", price: 148, image: pomegranate, quantity: "(500-700) g", unit: 1 },
    { id: 18, name: "Small Shimla Apple (Appl)", category: "Fruits", price: 150, image: apple, quantity: "500g", unit: 1 },
    { id: 19, name: "Valencia Navel Orange (Imported) (Naranga)", category: "Fruits", price: 85, image: orange, quantity: "(350-450) g", unit: 1 },
    { id: 20, name: "Safeda / Banganapalli Mango (Saphede ama)", category: "Fruits", price: 170, image: mango, quantity: "2 pieces (550-700 g)", unit: 1 },
    { id: 21, name: "Sweet Lime (Mosambi) (Mitha Lebu)", category: "Fruits", price: 65, image: Lime, quantity: "1 kg (9-10 pieces)", unit: 1 },
    { id: 22, name: "Kolkata Meat Bengali Cut Basa", category: "Meat", price: 369, image: fish, quantity: "500g", unit: 1 },
    { id: 24, name: "Licious Mutton Curry Cut (Mini Pack)", category: "Meat", price: 369, image: mutton, quantity: "300g", unit: 1 },
    { id: 25, name: "Modern Family Special White Bread", category: "Bakery", price: 36, image: bread, quantity: "400g", unit: 1 },
    { id: 26, name: "The Health Factory Zero Maida Bombay Pav", category: "Bakery", price: 37, image: bread2, quantity: "156g", unit: 1 },
    { id: 27, name: "Country Harvest Seeded Burger Bun", category: "Bakery", price: 32, image: bread3, quantity: "200 g (4 pieces)", unit: 1 },
];

const NEW_PRODUCTS = [
    { id: 101, name: "Amul Gold Full Cream Milk", category: "Dairy", price: 34, image: Amul, quantity: "500ml", unit: 1 },
    { id: 102, name: "Amul Masti Spiced Buttermilk", category: "Dairy", price: 15, image: Amul2, quantity: "200ml", unit: 1 },
    { id: 103, name: "Sweet Potato (Shakarkand)", category: "Vegetables", price: 45, image: potato, quantity: "1kg", unit: 1 },
    { id: 104, name: "Baby Potatoes (Dum Aloo)", category: "Vegetables", price: 38, image: potato2, quantity: "1kg", unit: 1 },
    { id: 105, name: "Red Carrots (Desi Gajor)", category: "Vegetables", price: 40, image: carrot, quantity: "500g", unit: 1 },
    { id: 106, name: "English Cucumber", category: "Vegetables", price: 45, image: cucumber, quantity: "1 piece", unit: 1 },
    { id: 107, name: "Broccoli - Fresh", category: "Vegetables", price: 89, image: cauliflower, quantity: "1 piece", unit: 1 },
    { id: 108, name: "Red Onion (Nashik)", category: "Vegetables", price: 42, image: onion, quantity: "1kg", unit: 1 },
    { id: 109, name: "Spring Onion", category: "Vegetables", price: 20, image: onion, quantity: "1 bunch", unit: 1 },
    { id: 110, name: "Hybrid Tomato", category: "Vegetables", price: 25, image: tomato, quantity: "500g", unit: 1 },
    { id: 111, name: "Cherry Tomatoes", category: "Vegetables", price: 60, image: tomato, quantity: "250g", unit: 1 },
    { id: 112, name: "Yellow Bell Pepper", category: "Vegetables", price: 120, image: shimla, quantity: "1 piece", unit: 1 },
    { id: 113, name: "Red Bell Pepper", category: "Vegetables", price: 130, image: shimla, quantity: "1 piece", unit: 1 },
    { id: 114, name: "Ripe Papaya", category: "Fruits", price: 65, image: papaya, quantity: "1 piece", unit: 1 },
    { id: 115, name: "Iceberg Lettuce", category: "Vegetables", price: 85, image: cabbage, quantity: "1 piece", unit: 1 },
    { id: 116, name: "Long Beans (Borboti)", category: "Vegetables", price: 35, image: beas, quantity: "250g", unit: 1 },
    { id: 117, name: "Robusta Banana", category: "Fruits", price: 45, image: banana, quantity: "6 pieces", unit: 1 },
    { id: 118, name: "Tender Coconut Water", category: "Fruits", price: 60, image: coconut, quantity: "1 piece", unit: 1 },
    { id: 119, name: "Kashmiri Apple", category: "Fruits", price: 180, image: apple, quantity: "4 pieces", unit: 1 },
    { id: 120, name: "Green Apple", category: "Fruits", price: 210, image: apple, quantity: "4 pieces", unit: 1 },
    { id: 121, name: "Kinnow Orange", category: "Fruits", price: 95, image: orange, quantity: "1kg", unit: 1 },
    { id: 122, name: "Alphonso Mango", category: "Fruits", price: 450, image: mango, quantity: "1 dozen", unit: 1 },
    { id: 123, name: "Lemon (Nimbu)", category: "Vegetables", price: 10, image: Lime, quantity: "3 pieces", unit: 1 },
    { id: 124, name: "Rohu Fish Steaks", category: "Meat", price: 320, image: fish, quantity: "500g", unit: 1 },
    { id: 125, name: "Chicken Curry Cut", category: "Meat", price: 220, image: mutton, quantity: "500g", unit: 1 },
    { id: 126, name: "Sandwich Bread (Large)", category: "Bakery", price: 45, image: bread, quantity: "1 packet", unit: 1 },
    { id: 127, name: "Multigrain Bread", category: "Bakery", price: 55, image: bread, quantity: "1 packet", unit: 1 },
    { id: 128, name: "Whole Wheat Pav", category: "Bakery", price: 40, image: bread2, quantity: "6 pieces", unit: 1 },
    { id: 129, name: "Hot Dog Buns", category: "Bakery", price: 35, image: bread3, quantity: "4 pieces", unit: 1 },
];

const MOCK_PRODUCTS = [...BASE_PRODUCTS, ...NEW_PRODUCTS];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
    getProducts: async () => {
        await delay(600 + Math.random() * 400);

        if (Math.random() < 0.01) {
            throw new Error("Failed to fetch products. Please try again.");
        }

        return MOCK_PRODUCTS;
    },

    searchProducts: async (query) => {
        await delay(300);
        if (!query) return [];

        const lowerQuery = query.toLowerCase();
        return MOCK_PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
        );
    },

    getTrending: async () => {
        await delay(400);

        return [...MOCK_PRODUCTS].sort(() => 0.5 - Math.random()).slice(0, 3);
    }
};

export default api;
