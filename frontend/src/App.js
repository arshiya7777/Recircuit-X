import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currentRole, setCurrentRole] = useState('end-user');
  const [showCoinsModal, setShowCoinsModal] = useState(false);
  const [showCertPreview, setShowCertPreview] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
const [upiId, setUpiId] = useState('');
const [showChatbot, setShowChatbot] = useState(false);
const [chatMessages, setChatMessages] = useState([
  { sender: 'bot', text: 'Namaste! Main ReCircuit AI Assistant hoon. E-waste recycling, data wiping ya NGO routing ke baare mein kuch bhi pooch sakte ho!' }
]);
const [radarModalData, setRadarModalData] = useState(null);
const [chatInput, setChatInput] = useState('');
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Smartphones',
    brand: 'Apple',
    modelName: 'iPhone 17 Pro Max',
    condition: 'Like New',
    age: 0,
    actionType: 'Sell',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    photoUploaded: false,
    photoName: ''
  });
  
  // All 52+ Original Verified Marketplace Inventory Items
  const [listings, setListings] = useState([
    { _id: '1', title: 'Apple iPhone 15 Pro Max', category: 'Smartphones', brand: 'Apple', condition: 'Like New', age: 0, actionType: 'Sell', estimatedValue: 85000, imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 300, logisticsPartner: 'EcoRecycle India Tech Park' },
    { _id: '2', title: 'Apple iPhone 14 Pro', category: 'Smartphones', brand: 'Apple', condition: 'Good', age: 1, actionType: 'Sell', estimatedValue: 58000, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 250, logisticsPartner: 'Goonj E-Waste Initiative' },
    { _id: '3', title: 'Samsung Galaxy S23 Ultra', category: 'Smartphones', brand: 'Samsung', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 65000, imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 250, logisticsPartner: 'Vidya Rural Education Foundation' },
    { _id: '4', title: 'MacBook Pro M2 16-inch', category: 'Laptops', brand: 'Apple', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 125000, imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 400, logisticsPartner: 'Attero Certified E-Waste Plant' },
    { _id: '5', title: 'Dell XPS 15 OLED', category: 'Laptops', brand: 'Dell', condition: 'Good', age: 2, actionType: 'Recycle', estimatedValue: 52000, imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80', status: 'Eco-Processing', greenCoins: 300, logisticsPartner: 'EcoRecycle India Tech Park' },
    { _id: '6', title: 'Sony Bravia 55" 4K TV', category: 'Televisions', brand: 'Sony', condition: 'Fair', age: 3, actionType: 'Donate', estimatedValue: 18000, imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80', status: 'NGO Assigned', greenCoins: 350, logisticsPartner: 'Vidya Rural Education Foundation' },
    { _id: '7', title: 'OnePlus 11 5G', category: 'Smartphones', brand: 'OnePlus', condition: 'Good', age: 1, actionType: 'Sell', estimatedValue: 32000, imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 200, logisticsPartner: 'Goonj E-Waste Initiative' },
    { _id: '8', title: 'HP Spectre x360', category: 'Laptops', brand: 'HP', condition: 'Fair', age: 3, actionType: 'Recycle', estimatedValue: 28000, imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', status: 'Eco-Processing', greenCoins: 250, logisticsPartner: 'CleanEarth Solutions (Navi Mumbai)' },
    { _id: '9', title: 'Apple iPad Air 5th Gen', category: 'Smartphones', brand: 'Apple', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 39000, imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 200, logisticsPartner: 'Attero Certified E-Waste Plant' },
    { _id: '10', title: 'Samsung Galaxy Z Fold5', category: 'Smartphones', brand: 'Samsung', condition: 'Good', age: 1, actionType: 'Sell', estimatedValue: 75000, imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 300, logisticsPartner: 'EcoRecycle India Tech Park' },
    { _id: '11', title: 'Lenovo ThinkPad X1 Carbon', category: 'Laptops', brand: 'Dell', condition: 'Good', age: 2, actionType: 'Recycle', estimatedValue: 45000, imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80', status: 'Eco-Processing', greenCoins: 300, logisticsPartner: 'EcoRecycle India Tech Park' },
    { _id: '12', title: 'LG OLED 48" Smart TV', category: 'Televisions', brand: 'Sony', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 42000, imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 350, logisticsPartner: 'EcoExpress Fleet' },
    { _id: '13', title: 'Apple iPhone 13', category: 'Smartphones', brand: 'Apple', condition: 'Good', age: 2, actionType: 'Sell', estimatedValue: 35000, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 180, logisticsPartner: 'Apple TradeEco' },
    { _id: '14', title: 'Samsung Galaxy S22', category: 'Smartphones', brand: 'Samsung', condition: 'Fair', age: 3, actionType: 'Donate', estimatedValue: 22000, imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80', status: 'NGO Assigned', greenCoins: 200, logisticsPartner: 'Goonj E-Waste Initiative' },
    { _id: '15', title: 'MacBook Air M1', category: 'Laptops', brand: 'Apple', condition: 'Good', age: 2, actionType: 'Sell', estimatedValue: 55000, imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 300, logisticsPartner: 'Apple TradeEco' },
    { _id: '16', title: 'OnePlus Nord CE 3', category: 'Smartphones', brand: 'OnePlus', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 18000, imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 150, logisticsPartner: 'EcoExpress Fleet' },
    { _id: '17', title: 'Dell Inspiron 14', category: 'Laptops', brand: 'Dell', condition: 'Fair', age: 4, actionType: 'Recycle', estimatedValue: 15000, imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80', status: 'Eco-Processing', greenCoins: 200, logisticsPartner: 'EcoRecycle India Tech Park' },
    { _id: '18', title: 'Xiaomi Smart TV 50"', category: 'Televisions', brand: 'Sony', condition: 'Good', age: 2, actionType: 'Sell', estimatedValue: 20000, imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 220, logisticsPartner: 'Delhivery Green' },
    { _id: '19', title: 'Apple iPhone 12 Pro', category: 'Smartphones', brand: 'Apple', condition: 'Good', age: 3, actionType: 'Sell', estimatedValue: 29000, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 170, logisticsPartner: 'Apple TradeEco' },
    { _id: '20', title: 'Samsung Galaxy A54', category: 'Smartphones', brand: 'Samsung', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 21000, imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 160, logisticsPartner: 'EcoExpress Fleet' },
    { _id: '21', title: 'HP Pavilion Gaming Laptop', category: 'Laptops', brand: 'HP', condition: 'Good', age: 2, actionType: 'Sell', estimatedValue: 40000, imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 280, logisticsPartner: 'BlueDart Eco' },
    { _id: '22', title: 'Apple iPhone 11', category: 'Smartphones', brand: 'Apple', condition: 'Fair', age: 4, actionType: 'Recycle', estimatedValue: 16000, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', status: 'Eco-Processing', greenCoins: 200, logisticsPartner: 'EcoRecycle India Tech Park' },
    { _id: '23', title: 'Samsung Crystal 4K UHD TV', category: 'Televisions', brand: 'Sony', condition: 'Good', age: 2, actionType: 'Donate', estimatedValue: 24000, imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80', status: 'NGO Assigned', greenCoins: 300, logisticsPartner: 'Vidya Rural Education Foundation' },
    { _id: '24', title: 'OnePlus 10R 5G', category: 'Smartphones', brand: 'OnePlus', condition: 'Good', age: 2, actionType: 'Sell', estimatedValue: 25000, imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 190, logisticsPartner: 'EcoExpress Fleet' },
    { _id: '25', title: 'MacBook Pro 14 M1 Pro', category: 'Laptops', brand: 'Apple', condition: 'Like New', age: 2, actionType: 'Sell', estimatedValue: 98000, imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 350, logisticsPartner: 'Apple TradeEco' },
    { _id: '26', title: 'Dell Latitude 7420', category: 'Laptops', brand: 'Dell', condition: 'Good', age: 2, actionType: 'Recycle', estimatedValue: 32000, imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80', status: 'Eco-Processing', greenCoins: 250, logisticsPartner: 'CleanEarth Solutions (Navi Mumbai)' },
    { _id: '27', title: 'Apple iPhone SE (2022)', category: 'Smartphones', brand: 'Apple', condition: 'Good', age: 2, actionType: 'Sell', estimatedValue: 19000, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 150, logisticsPartner: 'EcoExpress Fleet' },
    { _id: '28', title: 'Samsung Galaxy Watch 6', category: 'Smartphones', brand: 'Samsung', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 14000, imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 120, logisticsPartner: 'Samsung Care+ Green' },
    { _id: '29', title: 'HP Envy x360 Convertible', category: 'Laptops', brand: 'HP', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 62000, imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 300, logisticsPartner: 'BlueDart Eco' },
    { _id: '30', title: 'Sony Alpha ZV-E10 Camera', category: 'Smartphones', brand: 'Sony', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 48000, imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 280, logisticsPartner: 'EcoExpress Fleet' },
    { _id: '31', title: 'Apple iPhone 14 Plus', category: 'Smartphones', brand: 'Apple', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 52000, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 240, logisticsPartner: 'Apple TradeEco' },
    { _id: '32', title: 'Samsung Galaxy Tab S8', category: 'Laptops', brand: 'Samsung', condition: 'Good', age: 2, actionType: 'Sell', estimatedValue: 38000, imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 220, logisticsPartner: 'Delhivery Green' },
    { _id: '33', title: 'OnePlus Nord 3 5G', category: 'Smartphones', brand: 'OnePlus', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 22000, imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 160, logisticsPartner: 'EcoExpress Fleet' },
    { _id: '34', title: 'Dell G15 Gaming Laptop', category: 'Laptops', brand: 'Dell', condition: 'Good', age: 2, actionType: 'Recycle', estimatedValue: 54000, imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80', status: 'Eco-Processing', greenCoins: 320, logisticsPartner: 'EcoRecycle India Tech Park' },
    { _id: '35', title: 'Toshiba 43" Smart LED TV', category: 'Televisions', brand: 'Sony', condition: 'Fair', age: 4, actionType: 'Donate', estimatedValue: 11000, imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80', status: 'NGO Assigned', greenCoins: 250, logisticsPartner: 'Goonj E-Waste Initiative' },
    { _id: '36', title: 'Apple iPhone 13 Mini', category: 'Smartphones', brand: 'Apple', condition: 'Good', age: 2, actionType: 'Sell', estimatedValue: 31000, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 170, logisticsPartner: 'Apple TradeEco' },
    { _id: '37', title: 'Samsung Galaxy M34', category: 'Smartphones', brand: 'Samsung', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 15000, imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 130, logisticsPartner: 'EcoExpress Fleet' },
    { _id: '38', title: 'HP Chromebook 14', category: 'Laptops', brand: 'HP', condition: 'Fair', age: 3, actionType: 'Recycle', estimatedValue: 12000, imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', status: 'Eco-Processing', greenCoins: 180, logisticsPartner: 'CleanEarth Solutions (Navi Mumbai)' },
    { _id: '39', title: 'Apple iPad Pro 11"', category: 'Smartphones', brand: 'Apple', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 68000, imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 290, logisticsPartner: 'Apple TradeEco' },
    { _id: '40', title: 'OnePlus 9 Pro', category: 'Smartphones', brand: 'OnePlus', condition: 'Fair', age: 3, actionType: 'Recycle', estimatedValue: 20000, imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80', status: 'Eco-Processing', greenCoins: 210, logisticsPartner: 'EcoRecycle India Tech Park' },
    { _id: '41', title: 'Samsung Galaxy S21 FE', category: 'Smartphones', brand: 'Samsung', condition: 'Good', age: 2, actionType: 'Sell', estimatedValue: 24000, imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 180, logisticsPartner: 'EcoExpress Fleet' },
    { _id: '42', title: 'Dell Inspiron 15 3000', category: 'Laptops', brand: 'Dell', condition: 'Fair', age: 3, actionType: 'Donate', estimatedValue: 18000, imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80', status: 'NGO Assigned', greenCoins: 250, logisticsPartner: 'Vidya Rural Education Foundation' },
    { _id: '43', title: 'Apple Watch Series 8', category: 'Smartphones', brand: 'Apple', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 26000, imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 190, logisticsPartner: 'Apple TradeEco' },
    { _id: '44', title: 'Sony WH-1000XM4 Headphones', category: 'Smartphones', brand: 'Sony', condition: 'Good', age: 2, actionType: 'Sell', estimatedValue: 12000, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 110, logisticsPartner: 'EcoExpress Fleet' },
    { _id: '45', title: 'HP Pavilion x360', category: 'Laptops', brand: 'HP', condition: 'Good', age: 2, actionType: 'Sell', estimatedValue: 34000, imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 230, logisticsPartner: 'BlueDart Eco' },
    { _id: '46', title: 'Apple iPhone X', category: 'Smartphones', brand: 'Apple', condition: 'Non-Working', age: 6, actionType: 'Recycle', estimatedValue: 4500, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', status: 'Eco-Processing', greenCoins: 150, logisticsPartner: 'EcoRecycle India Tech Park' },
    { _id: '47', title: 'Samsung Galaxy Note 20', category: 'Smartphones', brand: 'Samsung', condition: 'Fair', age: 4, actionType: 'Recycle', estimatedValue: 17000, imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80', status: 'Eco-Processing', greenCoins: 200, logisticsPartner: 'CleanEarth Solutions (Navi Mumbai)' },
    { _id: '48', title: 'MacBook Pro 13 M2', category: 'Laptops', brand: 'Apple', condition: 'Like New', age: 1, actionType: 'Sell', estimatedValue: 88000, imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 350, logisticsPartner: 'Apple TradeEco' },
    { _id: '49', title: 'OnePlus Nord CE 2', category: 'Smartphones', brand: 'OnePlus', condition: 'Fair', age: 3, actionType: 'Donate', estimatedValue: 11000, imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80', status: 'NGO Assigned', greenCoins: 180, logisticsPartner: 'Goonj E-Waste Initiative' },
    { _id: '50', title: 'Dell Alienware m15 R6', category: 'Laptops', brand: 'Dell', condition: 'Good', age: 2, actionType: 'Sell', estimatedValue: 85000, imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80', status: 'Verified & Listed', greenCoins: 400, logisticsPartner: 'BlueDart Eco' },
    { _id: '51', title: 'Panasonic 32" LED TV', category: 'Televisions', brand: 'Sony', condition: 'Fair', age: 5, actionType: 'Recycle', estimatedValue: 6500, imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80', status: 'Eco-Processing', greenCoins: 150, logisticsPartner: 'EcoRecycle India Tech Park' },
    { _id: '52', title: 'Apple iPhone 8 Plus', category: 'Smartphones', brand: 'Apple', condition: 'Non-Working', age: 6, actionType: 'Recycle', estimatedValue: 3500, imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', status: 'Eco-Processing', greenCoins: 120, logisticsPartner: 'EcoRecycle India Tech Park' }
  ]);

  const [userCoins, setUserCoins] = useState(850);
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState(null);
  const [filters, setFilters] = useState({ category: 'All', action: 'All', search: '' });

  // 50+ Real Phone & TV Models Catalog
  const brandModels = {
    Apple: [
      'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17', 'iPhone 16 Pro Max', 'iPhone 16 Pro', 
      'iPhone 16 Plus', 'iPhone 16', 'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 
      'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 13', 'iPhone 12 Pro', 'MacBook Pro M3', 'MacBook Air M2'
    ],
    Samsung: [
      'Galaxy S26 Ultra', 'Galaxy S26+', 'Galaxy S26', 'Galaxy S25 Ultra', 'Galaxy S25+', 
      'Galaxy S24 Ultra', 'Galaxy S23', 'Galaxy Z Fold8', 'Galaxy Z Flip8', 'Galaxy A55', 
      'Crystal 4K UHD 55"', 'Vision AI M2EH 55"', 'Neo QLED QN70F 55"', 'Crystal 43" UE84AH'
    ],
    Sony: [
      'Bravia 7 II 55" Mini LED', 'Bravia 3 II 55"', 'Bravia 2 II 43"', 'Alpha ZV-E10 Camera',
      'Bravia XR 65" OLED', 'Bravia 55" 4K TV', 'Bravia 43" Smart LED'
    ],
    Xiaomi: [
      'Redmi Note 17 Pro 5M', 'Xiaomi 14', 'Redmi Note 17 5G', 'FX Series 55" QD-Mini LED', 
      'FX Series 43" Mini LED', 'MagiQ S 75" Mini LED', 'Smart TV 50" X Series'
    ],
    OnePlus: [
      'OnePlus 13', 'OnePlus 12', 'OnePlus 11R', 'OnePlus Nord 4', 'OnePlus Nord 3'
    ],
    Dell: [
      'Dell XPS 15 OLED', 'Dell Inspiron 14', 'Dell Latitude 7420', 'Dell G15 Gaming', 'Alienware m15 R6'
    ]
  };

  const modelsList = brandModels[formData.brand] || ['Standard Model'];

  const trustedNGOs = [
    { name: 'Vidya Rural Education Foundation (Mumbai)', rating: '4.9 ⭐ (Trusted Partner)', badge: 'Govt Registered • 100% Tax Exempt', desc: 'Distributes refurbished laptops & phones to underprivileged students in Maharashtra.' },
    { name: 'Goonj E-Waste & Cloth Initiative (Andheri)', rating: '4.8 ⭐ (Highly Recommended)', badge: 'Zero Landfill Certified', desc: 'Converts old electronics into educational kits and community tech labs.' }
  ];

  const trustedRecyclers = [
    { name: 'EcoRecycle India Tech Park (Thane)', rating: '4.9 ⭐ (AI Top Pick)', badge: 'CPCB Authorized • Zero Toxic Leakage', desc: 'State-of-the-art e-waste dismantling facility with 99.8% material recovery rate.' },
    { name: 'CleanEarth Solutions (Navi Mumbai)', rating: '4.8 ⭐', badge: 'ISO 14001 Certified', desc: 'Secure data destruction and precious metal extraction plant near Vashi.' }
  ];

  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Mumbai',
    pincode: '',
    selectedPartner: trustedNGOs[0].name,
    pickupDate: 'Tomorrow (10:00 AM - 02:00 PM)'
  });

  const [orders, setOrders] = useState([
    { 
      orderId: 'ORD-50912', 
      itemTitle: 'Samsung Galaxy S22', 
      type: 'Donate', 
      ngoOrRecycler: trustedNGOs[1].name, 
      address: 'Andheri West, Mumbai - 400053', 
      status: 'In Transit 🚚', 
      date: 'Oct 21, 2026',
      executiveName: 'Ramesh Shinde',
      executivePhone: '+91 98214-55670',
      vehicleNo: 'MH-02-CV-8891',
      warehouse: 'Andheri Sorting Hub, Mumbai',
      diagnosticAdvice: '⚠️ Smartphone Data Risk Advisory: Active Google account tokens detected. Please ensure remote factory reset is executed before doorstep handover. Battery health is at ~74%.',
      timeline: [
        { title: 'Order Placed & Verified', time: 'Oct 21, 10:30 AM', done: true, desc: 'User selected Goonj NGO & generated secure order ID.' },
        { title: 'Logistics Agent Assigned', time: 'Oct 21, 12:00 PM', done: true, desc: 'Driver Ramesh Shinde assigned for doorstep collection.' },
        { title: 'Item Picked Up & Scanned', time: 'Oct 21, 03:15 PM', done: true, desc: 'Device sanitized securely.' }
      ]
    },
    { 
      orderId: 'ORD-50913', 
      itemTitle: 'Dell Inspiron 14', 
      type: 'Recycle', 
      ngoOrRecycler: trustedRecyclers[0].name, 
      address: 'Thane West, Mumbai - 400601', 
      status: 'Processing at Facility ⚡', 
      date: 'Oct 20, 2026',
      executiveName: 'Ajit Patil',
      executivePhone: '+91 99302-11450',
      vehicleNo: 'MH-04-ER-4012',
      warehouse: 'Thane Central Recycling Unit',
      diagnosticAdvice: '♻️ Laptop Hardware & Shredding Notice: NVMe SSD storage identified. NIST SP 800-88 cryptographic overwrite mandatory prior to mechanical shredding.',
      timeline: [
        { title: 'Order Placed & Verified', time: 'Oct 20, 09:00 AM', done: true, desc: 'Recycling request registered successfully.' },
        { title: 'Reached Recycling Plant', time: 'Oct 20, 04:00 PM', done: true, desc: 'Arrived at EcoRecycle India Tech Park, Thane.' }
      ]
    }
  ]);

  const [estValue, setEstValue] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/listings')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setListings(prev => [...data, ...prev]);
        }
      })
      .catch(err => console.log('Using robust inventory:', err));
  }, []);

  // Precise Valuation Formula
  useEffect(() => {
    let base = 30000;
    if (formData.category === 'Smartphones') {
      if (formData.modelName.includes('17') || formData.modelName.includes('S26')) base = 95000;
      else if (formData.modelName.includes('16') || formData.modelName.includes('S25')) base = 75000;
      else base = 45000;
    } else if (formData.category === 'Televisions') {
      if (formData.modelName.includes('Mini LED') || formData.modelName.includes('OLED')) base = 120000;
      else base = 40000;
    } else {
      base = 90000;
    }

    let brandMultiplier = 1.0;
    if (formData.brand === 'Apple') brandMultiplier = 1.5;
    else if (formData.brand === 'Samsung') brandMultiplier = 1.3;
    else if (formData.brand === 'Sony') brandMultiplier = 1.4;
    else brandMultiplier = 0.9;

    let conditionFactor = 0.9;
    if (formData.condition === 'Like New') conditionFactor = 0.95;
    else if (formData.condition === 'Good') conditionFactor = 0.75;
    else if (formData.condition === 'Fair') conditionFactor = 0.5;
    else conditionFactor = 0.25;

    const ageDeduction = formData.age * 2000;
    const finalVal = Math.round((base * brandMultiplier * conditionFactor) - ageDeduction);
    setEstValue(Math.max(1500, finalVal));
  }, [formData]);

  const handlePostAd = async (e) => {
    e.preventDefault();
    const coins = formData.actionType === 'Recycle' ? 300 : formData.actionType === 'Donate' ? 350 : 200;
    const newAd = {
      title: `${formData.brand} ${formData.modelName}`,
      category: formData.category,
      brand: formData.brand,
      condition: formData.condition,
      age: formData.age,
      actionType: formData.actionType,
      estimatedValue: estValue,
      imageUrl: formData.photoUploaded ? 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80' : formData.imageUrl,
      status: 'Verified & Listed',
      greenCoins: coins,
      logisticsPartner: formData.actionType === 'Donate' ? trustedNGOs[0].name : formData.actionType === 'Recycle' ? trustedRecyclers[0].name : 'EcoExpress Fleet'
    };

    try {
      const response = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAd)
      });
      const savedListing = await response.json();
      setListings([savedListing, ...listings]);
      setUserCoins(prev => prev + coins);
      alert(`Success! Listing published & +${coins} GreenCoins credited.`);
      setActiveTab('marketplace');
    } catch (err) {
      setListings([newAd, ...listings]);
      setUserCoins(prev => prev + coins);
      alert(`Listing published locally! +${coins} GreenCoins credited.`);
      setActiveTab('marketplace');
    }
  };

  const handleConfirmShipping = (e) => {
    e.preventDefault();
    if (!shippingForm.fullName || !shippingForm.address || !shippingForm.pincode) {
      alert('Please fill out all address fields!');
      return;
    }

    const adviceText = selectedListing.actionType === 'Donate' 
      ? '🤝 Donation Device Advisory: Recommended for student digital literacy. Please unlink personal iCloud/Google accounts.'
      : selectedListing.actionType === 'Recycle'
      ? '♻️ Certified Recycler Scrap Advisory: Hardware scheduled for secure shredding. NIST cryptographic data wipe will be certified.'
      : '🛍️ Direct Sale Advisory: Escrow verified. Ensure device screen and charging ports are cleaned for higher buyer retention.';

    const newOrder = {
      orderId: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      itemTitle: selectedListing.title,
      type: selectedListing.actionType,
      ngoOrRecycler: shippingForm.selectedPartner,
      address: `${shippingForm.address}, ${shippingForm.city} - ${shippingForm.pincode}`,
      status: 'Pickup Scheduled 🚚',
      date: new Date().toLocaleDateString(),
      executiveName: 'Sanjay Verma (Lead Fleet)',
      executivePhone: '+91 97011-88230',
      vehicleNo: 'MH-03-AX-1092',
      warehouse: 'Navi Mumbai Central Dispatch Hub',
      diagnosticAdvice: adviceText,
      timeline: [
        { title: 'Order Placed & Verified', time: 'Just Now', done: true, desc: 'Selected trusted partner registered in cloud database.' },
        { title: 'Agent Assignment', time: 'In 30 mins', done: false, desc: 'Assigning nearest zero-emission delivery executive.' }
      ]
    };

    setOrders([newOrder, ...orders]);
    alert(`Logistics Booked Successfully! Order ID: ${newOrder.orderId}`);
    setSelectedListing(null);
    setActiveTab('orders');
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'}`}>
      <header className={`${darkMode ? 'bg-slate-900 border-b border-slate-800' : 'bg-slate-900'} text-white shadow-md sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('marketplace')}>
            <div className="bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 p-2.5 rounded-xl font-black text-xl tracking-wider shadow">
              RX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-wide text-white">ReCircuit <span className="text-amber-400">X</span></h1>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">ENTERPRISE LOGISTICS PRO</span>
              </div>
              <p className="text-xs text-slate-400">AI-Powered Circular E-Commerce & Verified Partner Hub</p>
            </div>
          </div>

          <div className="flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search across 52+ devices, certified recyclers, trusted NGOs..." 
                className="w-full bg-slate-800 text-white text-sm rounded-xl pl-4 pr-10 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-400 transition shadow-inner"
                onChange={e => setFilters({...filters, search: e.target.value})}
              />
              <span className="absolute right-3 top-2.5 text-slate-400 text-sm">🔍</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div 
              onClick={() => setShowCoinsModal(true)}
              className="bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-sm cursor-pointer hover:border-amber-400 transition"
              title="Click to view GreenCoins Ledger"
            >
              <span className="text-amber-400 font-bold text-base">🪙</span>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">GreenCoins</p>
                <p className="text-xs font-black text-amber-300">{userCoins}</p>
              </div>
            </div>

            <button 
              onClick={() => setShowSettingsModal(true)}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl border border-slate-700 transition shadow"
              title="Settings & Multi-Role Profile Switcher"
            >
              ⚙️
            </button>
          </div>
        </div>

        <nav className="bg-slate-800/90 backdrop-blur border-t border-slate-700 px-6 flex gap-6 overflow-x-auto text-sm">
          {[
            { id: 'marketplace', label: `🛍️ Live Marketplace (${listings.length})` },
            { id: 'post', label: '⚡ Post & Valuation Engine' },
            { id: 'orders', label: '🚚 Enterprise Logistics & Tracking' },
            { id: 'dashboard', label: '📊 Impact Dashboard' },
            { id: 'erasure', label: '🛡️ Data Sanitation Cert' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 font-semibold transition whitespace-nowrap border-b-2 ${activeTab === tab.id ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-300 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full">
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className={`p-4 rounded-2xl shadow-sm border flex flex-wrap gap-4 items-center justify-between ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <h2 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-slate-800'}`}>Verified Inventory & Circular Routing</h2>
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-black">{listings.length} Items Available</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <select className={`border rounded-xl px-3 py-2 text-xs font-medium ${darkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-50 text-slate-700 border-slate-200'}`} onChange={e => setFilters({...filters, category: e.target.value})}>
                  <option value="All">All Categories</option>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Televisions">Televisions</option>
                </select>
                <select className={`border rounded-xl px-3 py-2 text-xs font-medium ${darkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-50 text-slate-700 border-slate-200'}`} onChange={e => setFilters({...filters, action: e.target.value})}>
                  <option value="All">All Actions (Sell/Donate/Recycle)</option>
                  <option value="Sell">Sell</option>
                  <option value="Donate">Donate</option>
                  <option value="Recycle">Recycle</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings
                .filter(l => (filters.category === 'All' || l.category === filters.category) && 
                             (filters.action === 'All' || l.actionType === filters.action) &&
                             (l.title.toLowerCase().includes(filters.search.toLowerCase()) || l.brand?.toLowerCase().includes(filters.search.toLowerCase())))
                .map((item, index) => (
                <div key={item._id || index} className={`rounded-2xl shadow-sm border overflow-hidden flex flex-col transition group ${darkMode ? 'bg-slate-900 border-slate-800 hover:border-amber-400' : 'bg-white border-slate-200 hover:shadow-xl hover:border-amber-400'}`}>
                  <div className="relative h-52 bg-slate-100 overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase">
                      {item.actionType}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur text-white text-[11px] px-3 py-1 rounded-lg">
                      Partner: {item.logisticsPartner || 'EcoExpress'}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className={`font-bold text-base line-clamp-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                        <span className="text-emerald-700 font-black text-lg">₹{item.estimatedValue}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 font-medium">{item.brand} • {item.condition} • {item.age} yrs old</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/10 flex justify-between items-center">
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                        🪙 +{item.greenCoins} Coins
                      </span>
                      <button onClick={() => setSelectedListing(item)} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-400 hover:text-slate-950 transition shadow">
                        Book Pickup / Route 🚚
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enterprise Logistics & Tracking Tab */}
        {activeTab === 'orders' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className={`p-6 rounded-3xl shadow-sm border flex justify-between items-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div>
                <h2 className={`text-2xl font-black mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Enterprise Logistics & Live Dispatch Center</h2>
                <p className="text-sm text-slate-500">Real-time tracking, executive dispatch details, and query helpline integration.</p>
              </div>
              <div className="bg-slate-900 text-white px-4 py-2 rounded-2xl text-xs font-mono">
                📞 Helpline: <span className="text-amber-400 font-bold">1800-RE-CIRCUIT</span>
              </div>
            </div>

            <div className="space-y-4">
              {orders
                .filter(ord => {
                  if (currentRole === 'ngo') return ord.type === 'Donate';
                  if (currentRole === 'recycler') return ord.type === 'Recycle';
                  return true;
                })
                .map((ord, idx) => (
                <div key={idx} className={`p-6 rounded-3xl shadow-sm border flex flex-wrap justify-between items-center gap-6 transition ${darkMode ? 'bg-slate-900 border-slate-800 hover:border-amber-400' : 'bg-white border-slate-200 hover:border-amber-400'}`}>
                  <div className="space-y-2 flex-1 min-w-[280px]">
                    <div className="flex items-center gap-3">
                      <span className="bg-slate-900 text-white text-xs font-mono px-2.5 py-1 rounded-lg">{ord.orderId}</span>
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">{ord.type} Route</span>
                      <span className="text-xs text-slate-400 font-medium">Vehicle: {ord.vehicleNo}</span>
                    </div>
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{ord.itemTitle}</h3>
                    <p className="text-xs text-slate-500">Partner Facility: <span className="font-semibold text-slate-700">{ord.ngoOrRecycler}</span></p>
                    <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-1 border-t border-slate-800/10">
                      <span>👤 Executive: <strong className={darkMode ? 'text-white' : 'text-slate-900'}>{ord.executiveName}</strong></span>
                      <span>📞 Contact: <strong className="text-emerald-700">{ord.executivePhone}</strong></span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl">
                      {ord.status}
                    </span>
                    <button 
                      onClick={() => setSelectedOrderForTracking(ord)}
                      className="bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black hover:bg-amber-300 transition shadow"
                    >
                      Open Live Tracking 🔍
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={`p-6 rounded-3xl space-y-2 border ${darkMode ? 'bg-slate-900 text-slate-300 border-slate-800' : 'bg-slate-900 text-slate-300 border-slate-800'}`}>
              <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider">📜 Regulatory & Reversal Policy</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                All donations and recycling dispatches are governed under the <strong>7-Day Zero-Carbon Reversal & Data Recall Guarantee</strong>. Users retain the right to cancel or recall device processing within 7 business days prior to physical facility shredding or NGO distribution handover.
              </p>
            </div>
          </div>
        )}
        

        {/* Post & Valuation Engine with Photo Upload & Instructions */}
        {activeTab === 'post' && (
          <div className={`max-w-3xl mx-auto p-8 rounded-3xl shadow-md border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="border-b border-slate-800/10 pb-4 mb-6">
              <h2 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>Post Device & AI Valuation Engine</h2>
              <p className="text-sm text-slate-500 mt-1">Configure brand specs, check condition guidelines, and upload device photos for accurate valuation.</p>
            </div>
            
            <form onSubmit={handlePostAd} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Category</label>
                  <select className={`w-full border rounded-xl px-4 py-3 text-sm font-semibold ${darkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-50 text-slate-900 border-slate-300'}`} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Smartphones">📱 Smartphones</option>
                    <option value="Laptops">💻 Laptops</option>
                    <option value="Televisions">📺 Televisions</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Brand</label>
                  <select className={`w-full border rounded-xl px-4 py-3 text-sm font-semibold ${darkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-50 text-slate-900 border-slate-300'}`} value={formData.brand} onChange={e => {
                    const newBrand = e.target.value;
                    setFormData({...formData, brand: newBrand, modelName: brandModels[newBrand]?.[0] || 'Standard'});
                  }}>
                    <option value="Apple"> Apple</option>
                    <option value="Samsung">📱 Samsung</option>
                    <option value="Sony">📺 Sony</option>
                    <option value="Xiaomi">📱 Xiaomi</option>
                    <option value="OnePlus">⚡ OnePlus</option>
                    <option value="Dell">💻 Dell</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Model Name</label>
                <select className={`w-full border rounded-xl px-4 py-3 text-sm font-semibold ${darkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-50 text-slate-900 border-slate-300'}`} value={formData.modelName} onChange={e => setFormData({...formData, modelName: e.target.value})}>
                  {modelsList.map((m, i) => <option key={i} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Physical Condition</label>
                  <select className={`w-full border rounded-xl px-4 py-3 text-sm font-semibold ${darkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-50 text-slate-900 border-slate-300'}`} onChange={e => setFormData({...formData, condition: e.target.value})}>
                    <option value="Like New">✨ Like New (No scratches, 95% value)</option>
                    <option value="Good">👍 Good (Minor wear, 75% value)</option>
                    <option value="Fair">⚠️ Fair (Visible dents/cracks, 50% value)</option>
                    <option value="Non-Working">♻️ Non-Working / Dead (Scrap base)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Action Route</label>
                  <select className={`w-full border rounded-xl px-4 py-3 text-sm font-semibold ${darkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-50 text-slate-900 border-slate-300'}`} onChange={e => setFormData({...formData, actionType: e.target.value})}>
                    <option value="Sell">🛍️ Sell on Marketplace</option>
                    <option value="Donate">🤝 Donate to Partner NGO</option>
                    <option value="Recycle">♻️ Send to Certified Recycler</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload & Condition Guide Box */}
              <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-amber-400 text-xs uppercase tracking-wider">📸 Upload Device Photo & Condition Guide</h4>
                  <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded">AI Verified</span>
                </div>
                <p className="text-xs text-slate-300">Please upload a clear picture of the device screen and back panel. Ensure good lighting to verify scratches or dents accurately.</p>
                
                <div className="flex items-center gap-4 pt-1">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      if(e.target.files && e.target.files[0]) {
                        setFormData({...formData, photoUploaded: true, photoName: e.target.files[0].name});
                      }
                    }}
                    className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-slate-950 hover:file:bg-amber-300 cursor-pointer"
                  />
                  {formData.photoUploaded && (
                    <span className="text-xs text-emerald-400 font-bold">✓ {formData.photoName} Attached</span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase text-slate-400">Device Age: {formData.age} Years</label>
                  <span className="text-sm font-black text-amber-600 bg-amber-50 px-3 py-0.5 rounded-lg border border-amber-200">₹2000/yr drop</span>
                </div>
                <input type="range" min="0" max="8" value={formData.age} className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer" onChange={e => setFormData({...formData, age: Number(e.target.value)})} />
              </div>

              <div className="bg-slate-950 text-white p-6 rounded-2xl flex items-center justify-between shadow-lg border border-slate-800">
                <div>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded uppercase">Automated Residual Valuation</span>
                  <h4 className="text-sm text-slate-300 mt-2 font-medium">Estimated Value</h4>
                </div>
                <div className="text-3xl font-black text-amber-400">₹{estValue}</div>
              </div>

              <button type="submit" className="w-full bg-amber-400 text-slate-950 py-4 rounded-xl font-black hover:bg-amber-300 transition shadow-md text-base">
                Publish Listing & Generate Logistics Order 🚀
              </button>
            </form>
          </div>
        )}
{/* Live Regional Eco-Radar & Community Requests */}
            <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">MUMBAI & NAVI MUMBAI REGION</span>
                  <h3 className={`text-lg font-black mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>📡 Live Regional Eco-Radar & Community Requests</h3>
                </div>
                <span className="text-xs text-emerald-400 font-semibold animate-pulse">● Live Dispatch Active</span>
              </div>
              <p className="text-xs text-slate-400">Real-time incoming requests from nearby households, verified NGOs, and scrap collection hubs.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">NEARBY DONATION</span>
                    <span className="text-[10px] text-slate-400">Andheri West</span>
                  </div>
                  <h4 className="font-bold text-sm">Sony Bravia 43" TV</h4>
                  <p className="text-xs text-slate-400 mt-1">Requested by: Vidya Rural Foundation for student tech lab.</p>
                  <button 
                    onClick={() => setRadarModalData({ title: 'Sony Bravia 43" TV - Donation Dispatch', details: 'NGO: Vidya Rural Foundation, Andheri. Target: Underprivileged Student Community Center. Status: Route verified, volunteer assigned for weekend pickup.' })} 
                    className="mt-3 w-full bg-slate-800 text-amber-400 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-700"
                  >
                    Support Request 🤝
                  </button>
                </div>

                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-bold">BULK RECYCLING</span>
                    <span className="text-[10px] text-slate-400">Thane Tech Park</span>
                  </div>
                  <h4 className="font-bold text-sm">15x Corporate Laptops</h4>
                  <p className="text-xs text-slate-400 mt-1">Scheduled for secure NIST shredding & gold extraction.</p>
                  <button 
                    onClick={() => setRadarModalData({ title: 'Thane Tech Park - Bulk Processing Queue', details: 'Facility: EcoRecycle India Tech Park, Thane. Units: 15 Laptops. Queue Position: #1 Priority. Estimated Gold & Copper Recovery: 4.2g Gold, 12kg Copper.' })} 
                    className="mt-3 w-full bg-slate-800 text-sky-400 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-700"
                  >
                    View Facility Status ⚡
                  </button>
                </div>

                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">COMMUNITY PICKUP</span>
                    <span className="text-[10px] text-slate-400">Panvel Hub</span>
                  </div>
                  <h4 className="font-bold text-sm">iPhone 13 (Battery Scrap)</h4>
                  <p className="text-xs text-slate-400 mt-1">Assigned to Lead Fleet Driver: Sanjay Verma.</p>
                  <button 
                    onClick={() => setRadarModalData({ title: 'Live Fleet Tracking - Panvel Hub', details: 'Vehicle No: MH-03-AX-1092. Driver: Sanjay Verma (+91 97011-88230). Current Location: Near Orion Mall, Panvel. ETA to Hub: 15 mins.' })} 
                    className="mt-3 w-full bg-slate-800 text-emerald-400 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-700"
                  >
                    Track Fleet 🚚
                  </button>
                </div>
              </div>
            </div>

      {/* Eco-Radar Dummy Data Modal */}
      {radarModalData && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-slate-800">
            <h3 className="font-black text-lg text-amber-400">{radarModalData.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">{radarModalData.details}</p>
            <button onClick={() => setRadarModalData(null)} className="w-full bg-slate-800 text-white py-2.5 rounded-xl text-xs font-bold">Close Details</button>
          </div>
        </div>
      )}
        {/* Enhanced Impact Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Top Stats Overview - Now Fully Clickable & Interactive */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                onClick={() => setShowCoinsModal(true)}
                className={`p-6 rounded-2xl shadow-sm border flex items-center gap-4 cursor-pointer hover:border-amber-400 transition ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                title="Click to view GreenCoins Ledger"
              >
                <div className="p-4 bg-amber-100 text-amber-700 rounded-2xl text-2xl font-black">🪙</div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Total GreenCoins</p>
                  <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{userCoins} Coins</h3>
                </div>
              </div>

              <div 
                onClick={() => setShowCoinsModal(true)}
                className={`p-6 rounded-2xl shadow-sm border flex items-center gap-4 cursor-pointer hover:border-emerald-400 transition ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                title="Click to view Carbon Offset Ledger"
              >
                <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl text-2xl font-black">🌱</div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Carbon Offset</p>
                  <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>214.5 kg CO₂</h3>
                </div>
              </div>

              <div 
                onClick={() => {
                  setActiveTab('orders');
                  setSelectedOrderForTracking(orders[0]); // Opens tracking for the latest active pickup
                }}
                className={`p-6 rounded-2xl shadow-sm border flex items-center gap-4 cursor-pointer hover:border-sky-400 transition ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                title="Click to view Active Pickups & Live Tracking"
              >
                <div className="p-4 bg-sky-100 text-sky-700 rounded-2xl text-2xl font-black">🚚</div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase">Active Pickups</p>
                  <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{orders.length} Orders</h3>
                </div>
              </div>
            </div>
               

            {/* Gamified Green Badge & Tier System */}
            <div className={`p-6 rounded-3xl border shadow-sm flex flex-wrap items-center justify-between gap-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-500 flex items-center justify-center text-3xl shadow-lg">
                  🏆
                </div>
                <div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">ECO-WARRIOR TIER II</span>
                  <h3 className={`text-xl font-black mt-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Gold Circular Champion 🌟</h3>
                  <p className="text-xs text-slate-400 mt-0.5">You are in top 5% recyclers in Mumbai region! Next rank unlocks 20% bonus coins.</p>
                </div>
              </div>
              <div className="w-full md:w-64 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Progress to Platinum Tier</span>
                  <span className="text-amber-400">850 / 1000 Coins</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full w-[85%]"></div>
                </div>
              </div>
            </div>

            {/* Real-World CO₂ Offset Equivalency */}
            <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>🌍 Real-World Environmental Equivalency</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-2xl mb-1">🌳</div>
                  <h4 className="font-bold text-emerald-400 text-sm">11 Full-Grown Trees</h4>
                  <p className="text-xs text-slate-400 mt-1">Equivalent carbon absorbed by urban forestry in 1 year.</p>
                </div>
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-2xl mb-1">🏍️</div>
                  <h4 className="font-bold text-amber-400 text-sm">1,250 km Bike Ride Saved</h4>
                  <p className="text-xs text-slate-400 mt-1">Prevented tailpipe emissions across Mumbai expressways.</p>
                </div>
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-2xl mb-1">⚡</div>
                  <h4 className="font-bold text-sky-400 text-sm">340 kWh Electricity</h4>
                  <p className="text-xs text-slate-400 mt-1">Energy conserved by recycling raw chipsets and displays.</p>
                </div>
              </div>
            </div>

            {/* Resource Recovery & Precious Metals Extraction */}
            <div className={`p-6 rounded-3xl border shadow-sm space-y-5 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex justify-between items-center">
                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>⛏️ Resource Recovery & Precious Metals Extraction</h3>
                <span className="text-xs bg-sky-500/20 text-sky-400 px-3 py-1 rounded-full font-bold">52+ Units Processed</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-300">🥇 Pure Gold Recovery (from circuit boards)</span>
                    <span className="text-amber-400">14.8 grams</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                    <div className="bg-amber-400 h-full rounded-full w-[78%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-300">🥈 Refined Silver (sensors & connectors)</span>
                    <span className="text-slate-300">182.5 grams</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                    <div className="bg-slate-300 h-full rounded-full w-[65%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-300">🥉 Industrial Copper (wiring & heat sinks)</span>
                    <span className="text-orange-400">410.2 kg</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                    <div className="bg-orange-500 h-full rounded-full w-[90%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-300">🔋 Cobalt & Lithium (battery cell recycling)</span>
                    <span className="text-emerald-400">95.4 kg</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                    <div className="bg-emerald-400 h-full rounded-full w-[82%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
            
         {activeTab === 'erasure' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Title */}
            <div className={`p-8 rounded-3xl shadow-md border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex justify-between items-center">
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">NIST SP 800-88 COMPLIANT</span>
                <span className="text-xs text-slate-400 font-mono">SECURE-CERT-ID: #RX-2026-9908</span>
              </div>
              <h2 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>Cryptographic Data Sanitization & Green Impact Certificate</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                ReCircuit X ensures zero data leakage and absolute environmental compliance prior to device redistribution or scrap metal extraction.
              </p>
            </div>

            {/* Why Recycling Matters & Guidelines */}
            <div className={`p-8 rounded-3xl shadow-md border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>🌱 Why E-Waste Recycling & Circularity Matter</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <strong className="text-amber-400 block mb-1 font-bold text-sm">1. Toxic Leachate Prevention</strong>
                  Discarding electronics in landfills causes heavy metals like lead and mercury to seep into groundwater tables. Certified recycling neutralizes these toxins.
                </div>
                <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <strong className="text-amber-400 block mb-1 font-bold text-sm">2. Conservation of Rare Earths</strong>
                  Mining raw cobalt, lithium, and gold destroys ecosystems. Reclaiming them from existing devices reduces mining pressure by 99%.
                </div>
              </div>
            </div>

            {/* How We Erase Data (NIST SP 800-88 Explanation for Viva) */}
            <div className={`p-8 rounded-3xl shadow-md border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>🔒 How User Data Is Securely Erased (NIST Protocol)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When a user hands over a device, standard formatting is never enough. We follow the <strong>NIST SP 800-88 Revision 1 (Media Sanitization Guidelines)</strong>:
              </p>
              <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1">
                <li><strong>Overwriting:</strong> Multi-pass binary data injection across all flash storage sectors.</li>
                <li><strong>Cryptographic Erase (CE):</strong> Destruction of encryption keys rendering data unreadable.</li>
                <li><strong>Physical Shredding:</strong> For scrap units, hard drives undergo mechanical shredding at CPCB plants.</li>
              </ul>
            </div>

            {/* Past Certificates Archive Section */}
            <div className={`p-8 rounded-3xl shadow-md border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex justify-between items-center">
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>📂 Past Earned Certificates Archive</h3>
                <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-bold">2 Issued</span>
              </div>
              <p className="text-xs text-slate-400">Access your historical cryptographic erasure and green impact certificates anytime.</p>

              <div className="space-y-3">
                {[
                  { certId: 'RX-CERT-9081', device: 'Samsung Galaxy S22', type: 'Donation Route', date: 'Oct 21, 2026', co2: '35 kg' },
                  { certId: 'RX-CERT-8842', device: 'Dell Inspiron 14', type: 'Certified Recycling', date: 'Oct 20, 2026', co2: '48 kg' }
                ].map((cert, cIdx) => (
                  <div key={cIdx} className={`p-4 rounded-2xl border flex flex-wrap justify-between items-center gap-4 ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div>
                      <span className="text-[10px] font-mono bg-slate-900 text-amber-400 px-2 py-0.5 rounded">{cert.certId}</span>
                      <h4 className="font-bold text-sm mt-1">{cert.device}</h4>
                      <p className="text-xs text-slate-400">{cert.type} • Date: {cert.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedCert(cert);
                          setShowCertPreview(true);
                        }}
                        className="bg-slate-800 text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-700 transition"
                      >
                        👁️ Preview
                      </button>
                      <button 
                        onClick={() => alert(`📥 Downloading PDF for ${cert.certId}...`)}
                        className="bg-amber-400 text-slate-950 px-3 py-2 rounded-xl text-xs font-black hover:bg-amber-300 transition"
                      >
                        Download PDF 📄
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl border max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="font-black text-xl">⚙️ Settings, RBAC & Customer Care</h3>
              <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">✕</button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-amber-400 tracking-wider">👤 Switch Stakeholder Portal Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'end-user', label: 'End User' },
                    { id: 'ngo', label: 'NGO Org' },
                    { id: 'recycler', label: 'Recycler' }
                  ].map(r => (
                    <button
                      key={r.id}
                      onClick={() => setCurrentRole(r.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${currentRole === r.id ? 'bg-amber-400 text-slate-950 border-amber-400 shadow' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'}`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400">Current Role Active: <strong className="text-amber-400 uppercase">{currentRole}</strong></p>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                <div>
                  <h4 className="font-bold text-sm">Dark Theme Mode</h4>
                  <p className="text-xs text-slate-400">Switch between light & dark interface</p>
                </div>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition ${darkMode ? 'bg-amber-400 justify-end' : 'bg-slate-400 justify-start'}`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Language Mode</label>
                <select 
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-xs font-semibold ${darkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-slate-50 text-slate-900 border-slate-300'}`}
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                >
                  <option value="English">English (Default)</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                  <option value="Marathi">मराठी (Marathi)</option>
                </select>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl space-y-2">
                <h4 className="font-bold text-amber-400 text-xs uppercase">🎧 Customer Care Helpdesk</h4>
                <p className="text-xs text-slate-300">Facing issues with logistics pickup or coin redemption? Connect with our support team 24/7.</p>
                <p className="text-xs font-bold text-amber-400">📞 Toll-Free Helpline: 1800-RE-CIRCUIT</p>
                <button onClick={() => alert('Support ticket raised! Our executive will call you within 15 minutes.')} className="w-full bg-amber-400 text-slate-950 py-2 rounded-xl font-bold text-xs hover:bg-amber-300">
                  Raise Support Ticket 🎫
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <button 
                  onClick={() => {
                    alert('Successfully logged out of ReCircuit X session.');
                    setShowSettingsModal(false);
                  }} 
                  className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  🚪 Log Out of Session
                </button>
              </div>
            </div>

            <button onClick={() => setShowSettingsModal(false)} className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold text-xs hover:bg-slate-700 transition">
              Save Preferences & Close
            </button>
          </div>
        </div>
      )}

      {/* GreenCoins & Carbon Impact History Modal */}
      {showCoinsModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl border max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-black text-xl">🪙 GreenCoins & Carbon Ledger</h3>
                <p className="text-xs text-slate-400">Complete transaction history of your eco-friendly dispatches.</p>
              </div>
              <button onClick={() => setShowCoinsModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl">
                <p className="text-[10px] uppercase font-bold text-amber-400">Total Coins Earned</p>
                <p className="text-2xl font-black text-amber-400 mt-1">🪙 {userCoins}</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl">
                <p className="text-[10px] uppercase font-bold text-emerald-400">Total Carbon Offset</p>
                <p className="text-2xl font-black text-emerald-400 mt-1">🌱 214.5 kg</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Recent Activity & Rewards</h4>
              
              <div className={`p-4 rounded-2xl border flex justify-between items-center ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">DONATION</span>
                  <h5 className="font-bold text-sm mt-1">Samsung Galaxy S22</h5>
                  <p className="text-xs text-slate-400">Partner: Goonj E-Waste Initiative</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-amber-400 text-sm">+350 Coins</span>
                  <p className="text-[10px] text-slate-400">Oct 21, 2026</p>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex justify-between items-center ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div>
                  <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-bold">RECYCLING</span>
                  <h5 className="font-bold text-sm mt-1">Dell Inspiron 14</h5>
                  <p className="text-xs text-slate-400">Partner: EcoRecycle India Tech Park</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-amber-400 text-sm">+300 Coins</span>
                  <p className="text-[10px] text-slate-400">Oct 20, 2026</p>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex justify-between items-center ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">SIGNUP BONUS</span>
                  <h5 className="font-bold text-sm mt-1">ReCircuit X Welcome Reward</h5>
                  <p className="text-xs text-slate-400">Platform Initialization</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-amber-400 text-sm">+200 Coins</span>
                  <p className="text-[10px] text-slate-400">Initial</p>
                </div>
              </div>
            </div>

            <button onClick={() => setShowCoinsModal(false)} className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold text-xs hover:bg-slate-700 transition">
              Close Ledger
            </button>
          </div>
        </div>
      )}

      {/* Deep Tracking Milestone Timeline Modal with Equipment Diagnostic & Data Risk Advisory */}
      {selectedOrderForTracking && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <span className="bg-slate-900 text-white text-xs font-mono px-2 py-0.5 rounded">{selectedOrderForTracking.orderId}</span>
                <h3 className="font-black text-xl mt-1">Live Shipment & Equipment Inspector</h3>
              </div>
              <button onClick={() => setSelectedOrderForTracking(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">✕</button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <h4 className="font-bold text-sm">{selectedOrderForTracking.itemTitle}</h4>
              <p className="text-xs text-slate-400">Facility / Route: <span className="font-semibold text-emerald-400">{selectedOrderForTracking.ngoOrRecycler}</span></p>
              
              <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-xs">
                <span>👤 Driver: <strong>{selectedOrderForTracking.executiveName || 'Sanjay Verma'}</strong></span>
                <span>📞 <strong className="text-emerald-400">{selectedOrderForTracking.executivePhone || '+91 97011-88230'}</strong></span>
              </div>
            </div>

            <div className="bg-sky-500/10 border border-sky-500/30 p-4 rounded-2xl space-y-2 text-xs">
              <h5 className="font-black text-sky-400 uppercase tracking-wide">💡 Equipment Diagnostic & Data Risk Advisory</h5>
              <p className="text-slate-300 leading-relaxed">{selectedOrderForTracking.diagnosticAdvice || 'Standard hardware diagnostic clear.'}</p>
            </div>

            <div className="space-y-4 py-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Milestone Progress</h5>
              <div className="space-y-3 pl-2 border-l-2 border-slate-700 ml-2">
                {selectedOrderForTracking.timeline && selectedOrderForTracking.timeline.map((step, sIdx) => (
                  <div key={sIdx} className="relative pl-6">
                    <div className={`absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2 ${step.done ? 'bg-emerald-500 border-white ring-2 ring-emerald-200' : 'bg-slate-500 border-white'}`}></div>
                    <div>
                      <div className="flex justify-between items-center">
                        <h6 className={`text-xs font-bold ${step.done ? '' : 'text-slate-500'}`}>{step.title}</h6>
                        <span className="text-[10px] text-slate-400 font-mono">{step.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setSelectedOrderForTracking(null)} className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold text-xs hover:bg-slate-700 transition">
              Close Tracker
            </button>
          </div>
        </div>
      )}
{/* Live Certificate Preview Modal */}
      {showCertPreview && selectedCert && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 text-white rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl border border-slate-800">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">OFFICIAL DOCUMENT PREVIEW</span>
                <h3 className="font-black text-xl mt-1">Green Impact & Data Erasure Certificate</h3>
              </div>
              <button onClick={() => setShowCertPreview(false)} className="text-slate-400 hover:text-white font-bold text-xl">✕</button>
            </div>

            <div className="bg-slate-950 border-2 border-amber-500/40 p-6 rounded-2xl space-y-4 text-center relative overflow-hidden shadow-inner">
              <div className="absolute top-2 right-3 text-3xl opacity-20">🛡️</div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400">ReCircuit X Compliance Authority</h4>
              <h2 className="text-lg font-black text-white">Certificate of Cryptographic Sanitization</h2>
              <p className="text-xs text-slate-300">This is to certify that hardware <strong className="text-amber-400">{selectedCert.device}</strong> processed under ID <strong className="text-white">{selectedCert.certId}</strong> has undergone secure NIST SP 800-88 data destruction and circular routing.</p>
              
              <div className="pt-3 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                <span>Carbon Offset: <strong className="text-emerald-400">{selectedCert.co2}</strong></span>
                <span>Issued Date: <strong className="text-white">{selectedCert.date}</strong></span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowCertPreview(false)} className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-bold text-xs hover:bg-slate-700 transition">
                Close Preview
              </button>
              <button onClick={() => alert(`📥 Downloading PDF for ${selectedCert.certId}...`)} className="flex-1 bg-amber-400 text-slate-950 py-3 rounded-xl font-black text-xs hover:bg-amber-300 transition">
                Download PDF 📄
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Floating AI Eco-Chatbot Assistant Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!showChatbot ? (
          <button 
            onClick={() => setShowChatbot(true)}
            className="bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 p-4 rounded-full shadow-2xl hover:scale-110 transition flex items-center gap-2 font-black text-sm border-2 border-white/20"
            title="Ask ReCircuit AI Assistant"
          >
            🤖 AI Eco-Bot
          </button>
        ) : (
          <div className="bg-slate-900 text-white rounded-3xl w-80 shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
            <div className="bg-slate-950 p-4 flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <div>
                  <h4 className="font-bold text-xs">ReCircuit AI Support</h4>
                  <span className="text-[10px] text-emerald-400 font-semibold">● Online • 24/7 Active</span>
                </div>
              </div>
              <button onClick={() => setShowChatbot(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-3 text-xs flex flex-col">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`p-3 rounded-2xl max-w-[85%] ${msg.sender === 'bot' ? 'bg-slate-800 text-slate-200 self-start' : 'bg-amber-400 text-slate-950 self-end font-medium'}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
              <input 
                type="text" 
                placeholder="Ask about data wiping, NGOs..." 
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyPress={e => {
                  if(e.key === 'Enter' && chatInput.trim()) {
                    const userMsg = chatInput;
                    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
                    setChatInput('');
                    setTimeout(() => {
                      let reply = "Humare verified partners NIST SP 800-88 standard ke mutabiq data securely wipe karte hain!";
                      if(userMsg.toLowerCase().includes('ngo')) reply = "Hum Vidya Foundation aur Goonj ke sath partner hain jo 100% tax-exempt dispatches karte hain.";
                      if(userMsg.toLowerCase().includes('coin')) reply = "GreenCoins ko aap future eco-purchases ya partner discounts ke liye redeem kar sakte hain!";
                      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
                    }, 800);
                  }
                }}
              />
              <button 
                onClick={() => {
                  if(chatInput.trim()) {
                    const userMsg = chatInput;
                    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
                    setChatInput('');
                    setTimeout(() => {
                      setChatMessages(prev => [...prev, { sender: 'bot', text: "Aapke query ke liye humara automated system active hai. 1800-RE-CIRCUIT par bhi call kar sakte hain!" }]);
                    }, 800);
                  }
                }}
                className="bg-amber-400 text-slate-950 px-3 py-2 rounded-xl font-bold text-xs"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Escrow Wallet & Instant UPI Payout Simulation Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl border border-slate-800">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">SECURE ESCROW PAYOUT</span>
                <h3 className="font-black text-xl mt-1">Instant Bank & UPI Settlement</h3>
              </div>
              <button onClick={() => setShowWalletModal(false)} className="text-slate-400 hover:text-white font-bold text-xl">✕</button>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <p className="text-xs text-slate-400 uppercase font-bold">Escrow Verified Amount</p>
              <h2 className="text-3xl font-black text-amber-400">₹12,500 <span className="text-xs text-emerald-400 font-normal">● Zero Commission</span></h2>
              <p className="text-[11px] text-slate-400">Funds are held securely in ReCircuit escrow and released instantly upon pickup verification.</p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase text-slate-400">Enter UPI ID / VPA for Instant Payout</label>
              <input 
                type="text" 
                placeholder="e.g. ibrahim@oksbi" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
              />
            </div>

            <button 
              onClick={() => {
                if(!upiId) {
                  alert('Please enter a valid UPI ID!');
                  return;
                }
                alert(`🎉 Payout of ₹12,500 successfully transferred via Escrow to UPI ID: ${upiId}! Transaction ID: TXN-${Math.floor(100000+Math.random()*900000)}`);
                setShowWalletModal(false);
              }}
              className="w-full bg-amber-400 text-slate-950 py-3.5 rounded-xl font-black text-sm hover:bg-amber-300 transition shadow"
            >
              Verify & Transfer Instantly 💸
            </button>
          </div>
        </div>
      )}
      {/* Shipping & Trusted Partner Modal */}
      {selectedListing && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-black text-xl">Verified Pickup & Partner Selection</h3>
                <p className="text-xs text-slate-400">Route Type: <span className="font-bold text-amber-400 uppercase">{selectedListing.actionType}</span></p>
              </div>
              <button onClick={() => setSelectedListing(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">✕</button>
            </div>

            <form onSubmit={handleConfirmShipping} className="space-y-5">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {selectedListing.actionType === 'Donate' ? '🤝 Choose Verified NGO Partner' : selectedListing.actionType === 'Recycle' ? '♻️ Choose Certified Recycler' : '🛍️ Verified Buyer Hub'}
                </label>

                <div className="space-y-2">
                  {selectedListing.actionType === 'Donate' && trustedNGOs.map((ngo, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setShippingForm({...shippingForm, selectedPartner: ngo.name})}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition ${shippingForm.selectedPartner === ngo.name ? 'border-amber-400 bg-amber-400/10' : 'border-slate-700 bg-slate-800/50'}`}
                    >
                      <div className="flex justify-between items-start">
                        <h5 className="font-bold text-xs">{ngo.name}</h5>
                        <span className="text-[10px] text-emerald-400 font-bold">{ngo.rating}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{ngo.desc}</p>
                    </div>
                  ))}

                  {selectedListing.actionType === 'Recycle' && trustedRecyclers.map((rec, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setShippingForm({...shippingForm, selectedPartner: rec.name})}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition ${shippingForm.selectedPartner === rec.name ? 'border-amber-400 bg-amber-400/10' : 'border-slate-700 bg-slate-800/50'}`}
                    >
                      <div className="flex justify-between items-start">
                        <h5 className="font-bold text-xs">{rec.name}</h5>
                        <span className="text-[10px] text-emerald-400 font-bold">{rec.rating}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{rec.desc}</p>
                    </div>
                  ))}

                  {selectedListing.actionType === 'Sell' && (
                    <div className="p-3.5 rounded-2xl border border-amber-400 bg-amber-400/10">
                      <h5 className="font-bold text-xs">ReCircuit X Verified Buyer Direct Hub (Mumbai)</h5>
                      <p className="text-[11px] text-slate-400 mt-1">Instant escrow payment & zero commission secure delivery.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Full Name</label>
                  <input type="text" required placeholder="Mirza Ibrahim" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white" onChange={e => setShippingForm({...shippingForm, fullName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Phone Number</label>
                  <input type="tel" required placeholder="9876543210" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white" onChange={e => setShippingForm({...shippingForm, phone: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Pickup Street Address</label>
                <input type="text" required placeholder="Flat/House No, Building, Area" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white" onChange={e => setShippingForm({...shippingForm, address: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">City</label>
                  <input type="text" required value={shippingForm.city} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white" onChange={e => setShippingForm({...shippingForm, city: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Pincode</label>
                  <input type="text" required placeholder="400706" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white" onChange={e => setShippingForm({...shippingForm, pincode: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="w-full bg-amber-400 text-slate-950 py-3.5 rounded-xl font-black text-sm hover:bg-amber-300 transition shadow">
                Confirm Trusted Logistics & Book Pickup 📦
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}