import React, { useState, useEffect } from 'react';
import { Search, Plus, Star, Phone, Mail, MapPin, Shield, Filter, Heart, AlertCircle, CheckCircle, X, MessageCircle, Send, Bot, User, LogOut, Menu, Bell, TrendingUp, Eye, DollarSign, Users, Calendar, BarChart3, Clock } from 'lucide-react';

const NjaLinksApp = () => {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showSellerProfile, setShowSellerProfile] = useState(null);
  const [showProductDetail, setShowProductDetail] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Services', 'Automobiles', 'Food & Drinks'];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      // Find the latest favorites array from the users state
      const userFavs = users.find(u => u.id === currentUser.id)?.favorites || [];
      setFavorites(userFavs);
    }
  }, [currentUser, users]);

  const loadData = () => {
    const sampleUsers = [
      {
        id: 1,
        email: 'buyer@demo.com',
        password: 'demo123',
        name: 'John Buyer',
        type: 'buyer',
        favorites: [2],
        preferences: { categories: ['Electronics', 'Fashion'] }
      },
      {
        id: 2,
        email: 'seller@demo.com',
        password: 'demo123',
        name: 'Ada Fashion Hub',
        type: 'seller',
        phone: '+234 805 987 6543',
        location: 'Abuja, Nigeria',
        verified: true,
        rating: 4.9,
        totalSales: 203,
        joinedDate: '2023-11',
        description: 'Premium fashion and accessories',
        favorites: [1],
        preferences: {}
      }
    ];

    const sampleSellers = [
      {
        id: 1,
        userId: 2,
        name: 'Ada Fashion Hub',
        phone: '+234 805 987 6543',
        email: 'seller@demo.com',
        location: 'Abuja, Nigeria',
        verified: true,
        rating: 4.9,
        totalSales: 203,
        joinedDate: '2023-11',
        description: 'Premium fashion and accessories'
      }
    ];

    const sampleProducts = [
      {
        id: 1,
        sellerId: 1,
        title: 'iPhone 13 Pro Max - 256GB',
        description: 'Brand new, sealed with warranty. Original from authorized dealer.',
        price: 850000,
        priceDisplay: '₦850,000',
        category: 'Electronics',
        image: '📱',
        views: 234,
        datePosted: '2024-11-20'
      },
      {
        id: 2,
        sellerId: 1,
        title: 'Designer Ankara Dress',
        description: 'Handmade with premium ankara fabric. Custom sizes available.',
        price: 35000,
        priceDisplay: '₦35,000',
        category: 'Fashion',
        image: '👗',
        views: 189,
        datePosted: '2024-11-22'
      },
      {
        id: 3,
        sellerId: 1,
        title: 'MacBook Pro M2 - 16GB RAM',
        description: 'Latest model, perfect condition. Ideal for developers and creators.',
        price: 1200000,
        priceDisplay: '₦1,200,000',
        category: 'Electronics',
        image: '💻',
        views: 456,
        datePosted: '2024-11-19'
      },
      {
        id: 4,
        sellerId: 1,
        title: 'Nike Air Max Sneakers',
        description: 'Authentic Nike sneakers. Size 42. Brand new in box.',
        price: 45000,
        priceDisplay: '₦45,000',
        category: 'Fashion',
        image: '👟',
        views: 178,
        datePosted: '2024-11-21'
      }
    ];

    const sampleComments = [
      {
        id: 1,
        productId: 1,
        userId: 1,
        userName: 'John Buyer',
        comment: 'Is this still available? Does it come with original accessories?',
        timestamp: '2024-11-23T10:30:00',
        replies: [
          {
            id: 2,
            userId: 2,
            userName: 'Ada Fashion Hub',
            comment: 'Yes, still available! Comes with everything in the box.',
            timestamp: '2024-11-23T11:00:00'
          }
        ]
      }
    ];

    const sampleNotifications = [
      {
        id: 1,
        userId: 2,
        type: 'comment',
        message: 'John Buyer commented on your iPhone 13 Pro Max',
        timestamp: '2024-11-23T10:30:00',
        read: false,
        productId: 1
      },
      {
        id: 2,
        userId: 2,
        type: 'view',
        message: 'Your Designer Ankara Dress got 15 new views today',
        timestamp: '2024-11-23T09:00:00',
        read: false,
        productId: 2
      }
    ];

    setUsers(sampleUsers);
    setSellers(sampleSellers);
    setProducts(sampleProducts);
    setComments(sampleComments);
    setNotifications(sampleNotifications);
  };

  const addNotification = (userId, type, message, productId = null) => {
    const newNotif = {
      id: notifications.length + 1,
      userId,
      type,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      productId
    };
    setNotifications([newNotif, ...notifications]);
  };

  const markNotificationRead = (notifId) => {
    setNotifications(notifications.map(n => 
      n.id === notifId ? { ...n, read: true } : n
    ));
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setCurrentView('marketplace');
      setChatMessages([{
        type: 'bot',
        text: `Welcome back, ${user.name}! I'm your AI assistant. I can help you find products, answer questions about sellers, or assist with your listings. How can I help you today?`
      }]);
    }
    return user;
  };

  const handleRegister = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      favorites: [],
      preferences: {}
    };
    setUsers([...users, newUser]);

    if (userData.type === 'seller') {
      const newSeller = {
        id: sellers.length + 1,
        userId: newUser.id,
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        location: userData.location,
        description: userData.description || '',
        verified: false,
        rating: 0,
        totalSales: 0,
        joinedDate: new Date().toISOString().split('T')[0].substring(0, 7)
      };
      setSellers([...sellers, newSeller]);
    }

    setCurrentUser(newUser);
    setCurrentView('marketplace');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setFavorites([]);
    setChatMessages([]);
    setShowNotifications(false);
  };

  const handleAddProduct = (productData) => {
    const seller = sellers.find(s => s.userId === currentUser.id);
    const price = parseFloat(productData.price.replace(/[^\d]/g, ''));
    const newProduct = {
      id: products.length + 1,
      sellerId: seller.id,
      ...productData,
      price: price,
      priceDisplay: productData.price,
      views: 0,
      datePosted: new Date().toISOString().split('T')[0]
    };
    setProducts([...products, newProduct]);
    setShowAddProduct(false);
    
    addNotification(currentUser.id, 'success', `Your product "${productData.title}" has been listed successfully!`);
  };

  const toggleFavorite = (productId) => {
    const updatedUsers = users.map(u => {
      if (u.id === currentUser.id) {
        const newFavorites = u.favorites.includes(productId)
          ? u.favorites.filter(id => id !== productId)
          : [...u.favorites, productId];
        return { ...u, favorites: newFavorites };
      }
      return u;
    });
    setUsers(updatedUsers);
    const updatedUser = updatedUsers.find(u => u.id === currentUser.id);
    setCurrentUser(updatedUser);
  };

  const handleAddComment = (productId, commentText) => {
    const newComment = {
      id: comments.length + 1,
      productId,
      userId: currentUser.id,
      userName: currentUser.name,
      comment: commentText,
      timestamp: new Date().toISOString(),
      replies: []
    };
    setComments([...comments, newComment]);

    // Notify seller
    const product = products.find(p => p.id === productId);
    const seller = sellers.find(s => s.id === product.sellerId);
    if (seller && seller.userId !== currentUser.id) {
      addNotification(seller.userId, 'comment', `${currentUser.name} commented on your ${product.title}`, productId);
    }
  };

  const handleReplyComment = (commentId, replyText) => {
    const updatedComments = comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...c.replies, {
            id: Date.now(),
            userId: currentUser.id,
            userName: currentUser.name,
            comment: replyText,
            timestamp: new Date().toISOString()
          }]
        };
      }
      return c;
    });
    setComments(updatedComments);

    // Notify original commenter
    const originalComment = comments.find(c => c.id === commentId);
    if (originalComment && originalComment.userId !== currentUser.id) {
      const product = products.find(p => p.id === originalComment.productId);
      addNotification(originalComment.userId, 'reply', `${currentUser.name} replied to your comment on ${product.title}`, product.id);
    }
  };

  const handleChatbotMessage = (message) => {
    setChatMessages([...chatMessages, { type: 'user', text: message }]);
    
    setTimeout(() => {
      let response = '';
      const lowerMsg = message.toLowerCase();

      if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        response = `Hi ${currentUser.name}! How can I assist you today? I can help you find products, check seller ratings, or answer questions about listings.`;
      } else if (lowerMsg.includes('find') || lowerMsg.includes('search') || lowerMsg.includes('looking for')) {
        response = 'I can help you find products! What are you looking for? You can tell me the category (Electronics, Fashion, etc.) or specific product name. You can also use the advanced filters to narrow down by price range!';
      } else if (lowerMsg.includes('seller') || lowerMsg.includes('trust') || lowerMsg.includes('verified')) {
        response = 'All our sellers display verification badges and ratings. Look for the green checkmark shield icon. You can also view seller profiles to see their total sales, ratings, and contact information before making a purchase.';
      } else if (lowerMsg.includes('contact') || lowerMsg.includes('reach') || lowerMsg.includes('phone')) {
        response = 'To contact a seller, click on any product and then click "Contact Seller". You\'ll see their phone number, email, and location. You can call or message them directly!';
      } else if (lowerMsg.includes('notification')) {
        const unreadCount = notifications.filter(n => n.userId === currentUser.id && !n.read).length;
        response = `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}. Click the bell icon in the top navigation to view them. You'll get notified about comments, replies, and product views!`;
      } else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('expensive') || lowerMsg.includes('cheap')) {
        response = 'Prices are set by individual sellers. You can use the advanced filters to set a price range and sort products by price (low to high or high to low). Feel free to contact sellers directly to negotiate!';
      } else if (lowerMsg.includes('filter') || lowerMsg.includes('sort')) {
        response = 'Use the filter options to refine your search! You can filter by category, set a minimum and maximum price, and sort products by newest, price (low/high), or most popular. Try it out!';
      } else if (lowerMsg.includes('analytics') || lowerMsg.includes('stats') || lowerMsg.includes('dashboard')) {
        if (currentUser.type === 'seller') {
          response = 'Your dashboard shows key metrics like total products, views, revenue estimates, and engagement trends. You can see which products are performing best and track your growth over time!';
        } else {
          response = 'Analytics and detailed statistics are available for sellers in their dashboard. As a buyer, you can see product popularity through view counts and ratings!';
        }
      } else if (lowerMsg.includes('how to sell') || lowerMsg.includes('become seller') || lowerMsg.includes('start selling')) {
        if (currentUser.type === 'seller') {
          response = 'You\'re already registered as a seller! Go to "My Dashboard" to add products. Click "Add Product", fill in the details, and your product will be visible to all buyers on 9jaLinks.';
        } else {
          response = 'To become a seller, you\'ll need to register a seller account with your business details. Would you like me to guide you through the registration process?';
        }
      } else if (lowerMsg.includes('safe') || lowerMsg.includes('scam') || lowerMsg.includes('secure')) {
        response = '9jaLinks prioritizes safety! We verify sellers, display ratings, and provide transparent contact information. Always check seller ratings and reviews before purchasing. Meet in safe public locations for exchanges when possible.';
      } else if (lowerMsg.includes('electronics')) {
        const electronicsCount = products.filter(p => p.category === 'Electronics').length;
        response = `We currently have ${electronicsCount} electronics products available. Check out the Electronics category to see phones, laptops, and more!`;
      } else if (lowerMsg.includes('fashion')) {
        const fashionCount = products.filter(p => p.category === 'Fashion').length;
        response = `We have ${fashionCount} fashion items available. Browse the Fashion category to see clothing, accessories, and more!`;
      } else {
        response = 'I\'m here to help! You can ask me about:\n• Finding products & using filters\n• Seller verification and ratings\n• How to contact sellers\n• Notifications & alerts\n• Becoming a seller\n• Analytics & dashboard features\n• Safety tips\n\nWhat would you like to know?';
      }

      setChatMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 500);
  };

  const getFilteredAndSortedProducts = () => {
    let filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                             product.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
      const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch(sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    }

    return filtered;
  };

  const getSellerById = (id) => sellers.find(s => s.id === id);
  const getProductComments = (productId) => comments.filter(c => c.productId === productId);
  const getUserNotifications = () => notifications.filter(n => n.userId === currentUser?.id);
  const getUnreadCount = () => notifications.filter(n => n.userId === currentUser?.id && !n.read).length;

  // Analytics for sellers
  const getSellerAnalytics = (sellerId) => {
    const sellerProducts = products.filter(p => p.sellerId === sellerId);
    const totalViews = sellerProducts.reduce((sum, p) => sum + p.views, 0);
    // Mock revenue as the sum of all product prices (for demonstration)
    const totalRevenue = sellerProducts.reduce((sum, p) => sum + p.price, 0); 
    const avgViews = sellerProducts.length > 0 ? Math.round(totalViews / sellerProducts.length) : 0;
    const totalComments = sellerProducts.reduce((sum, p) => sum + getProductComments(p.id).length, 0);
    
    return {
      totalProducts: sellerProducts.length,
      totalViews,
      totalRevenue,
      avgViews,
      totalComments,
      // Top product based on views
      topProduct: sellerProducts.length > 0 ? sellerProducts.sort((a, b) => b.views - a.views)[0] : null
    };
  };

  // Login View
  const LoginView = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      name: '',
      type: 'buyer',
      phone: '',
      location: '',
      description: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = () => {
      setError('');
      if (isLogin) {
        const user = handleLogin(formData.email, formData.password);
        if (!user) {
          setError('Invalid email or password. Try demo accounts: buyer@demo.com or seller@demo.com (password: demo123)');
        }
      } else {
        if (!formData.email || !formData.password || !formData.name) {
          setError('Please fill in all required fields (Name, Email, Password).');
          return;
        }
        if (formData.type === 'seller' && (!formData.phone || !formData.location)) {
          setError('Sellers must provide phone and location for verification.');
          return;
        }
        handleRegister(formData);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-2">🇳🇬</div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">9jaLinks</h1>
            <p className="text-gray-600">Nigeria's Trusted Marketplace</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              <AlertCircle size={18} className="inline mr-2" />
              {error}
            </div>
          )}

          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-2 rounded-lg font-semibold transition ${isLogin ? 'bg-green-600 text-white shadow-md' : 'bg-transparent text-gray-700 hover:bg-white'}`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-2 rounded-lg font-semibold transition ${!isLogin ? 'bg-green-600 text-white shadow-md' : 'bg-transparent text-gray-700 hover:bg-white'}`}
            >
              Register
            </button>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="E.g., John Doe"
                  />
                </div>
              </>
            )}

            {/* Email and Password - always present */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Password *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Minimum 6 characters"
              />
            </div>

            {/* Account Type (only for Registration) */}
            {!isLogin && (
              <div className="pt-2">
                <label className="block text-sm font-semibold mb-2">Account Type *</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                      name="accountType"
                      value="buyer"
                      checked={formData.type === 'buyer'}
                      onChange={() => setFormData({ ...formData, type: 'buyer' })}
                    />
                    <span className="ml-2 text-gray-700">Buyer (Just Browsing)</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                      name="accountType"
                      value="seller"
                      checked={formData.type === 'seller'}
                      onChange={() => setFormData({ ...formData, type: 'seller' })}
                    />
                    <span className="ml-2 text-gray-700">Seller (Listing Products)</span>
                  </label>
                </div>
              </div>
            )}

            {/* Seller Specific Fields (only for Seller Registration) */}
            {!isLogin && formData.type === 'seller' && (
              <>
                <h3 className="text-lg font-semibold mt-4 mb-2 text-green-700 border-t pt-4">Seller Details</h3>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="E.g., +234 801 234 5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Location (City, State) *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="E.g., Lagos, Lekki"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Business Description (Optional)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="Tell us about your products or services..."
                  />
                </div>
              </>
            )}
            
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition duration-200 shadow-lg mt-4"
            >
              {isLogin ? 'Sign In to 9jaLinks' : 'Create Account'}
            </button>
            
            {isLogin && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Demo accounts: Buyer (buyer@demo.com) | Seller (seller@demo.com) <br/>
                Password: demo123
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };
  // End of LoginView

  // --- Helper Components ---

  const ProductCard = ({ product }) => {
    const isFavorite = favorites.includes(product.id);
    const seller = getSellerById(product.sellerId);

    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col cursor-pointer" onClick={() => setShowProductDetail(product)}>
        <div className="relative p-4 flex flex-col items-center justify-center bg-green-50 h-36">
          <div className="text-6xl mb-2">{product.image}</div>
          <div className="absolute top-2 right-2">
            <button
              onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
              className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-red-500 bg-white shadow' : 'text-gray-400 bg-white/80 hover:text-red-500'}`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart fill={isFavorite ? 'currentColor' : 'none'} size={20} />
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">{product.title}</h3>
          <p className="text-xl font-bold text-green-700 mb-2">{product.priceDisplay}</p>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="truncate">{seller?.name}</span>
            {seller?.verified && <Shield size={16} className="text-blue-500 ml-1 flex-shrink-0" title="Verified Seller" />}
          </div>
          
          <div className="mt-auto flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-50">
            <span className="flex items-center">
              <Eye size={14} className="mr-1 text-green-500" />
              {product.views} Views
            </span>
            <span className="text-right">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const FilterSidebar = ({ isMobile, toggleFilter }) => {
    const sortOptions = [
      { value: 'newest', label: 'Newest Listings' },
      { value: 'popular', label: 'Most Popular (Views)' },
      { value: 'price-low', label: 'Price: Low to High' },
      { value: 'price-high', label: 'Price: High to Low' },
    ];

    const Content = () => (
      <div className="p-4 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Filter size={24} className="mr-2 text-green-600" />
          Filter & Sort
        </h2>

        {isMobile && (
          <button onClick={toggleFilter} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        )}

        {/* Category Filter */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700 border-b pb-1">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat.toLowerCase() === 'all' ? 'all' : cat)}
                className={`px-3 py-1 text-sm rounded-full transition ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-green-600 text-white font-medium shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700 border-b pb-1">Price Range (₦)</h3>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700 border-b pb-1">Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-green-500 focus:border-green-500 appearance-none"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    );

    if (isMobile) {
      return (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={toggleFilter}>
          <div 
            className="absolute left-0 top-0 h-full w-3/4 bg-white shadow-2xl overflow-y-auto transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Content />
          </div>
        </div>
      );
    }

    return <Content />;
  };

  // --- Main Views ---

  const DashboardView = () => {
    const seller = sellers.find(s => s.userId === currentUser.id);
    const analytics = getSellerAnalytics(seller?.id);

    if (!seller) {
      return (
        <div className="p-8 text-center bg-white m-4 rounded-xl shadow-lg max-w-xl mx-auto">
          <AlertCircle size={32} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold">Access Denied</h2>
          <p className="text-gray-600">You must be a registered seller to access the Dashboard.</p>
          <button 
            onClick={() => setCurrentView('marketplace')} 
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Go to Marketplace
          </button>
        </div>
      );
    }

    const formatCurrency = (amount) => {
      return `₦${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount)}`;
    };

    return (
      <div className="p-4 sm:p-8 space-y-8 bg-gray-50 min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-green-700 flex items-center">
            <BarChart3 size={30} className="mr-2" />
            Seller Dashboard
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatCard icon={<Users size={24} />} title="Total Products" value={analytics.totalProducts} color="blue" />
            <StatCard icon={<Eye size={24} />} title="Total Views" value={analytics.totalViews} color="yellow" />
            <StatCard icon={<DollarSign size={24} />} title="Estimated Revenue" value={formatCurrency(analytics.totalRevenue)} color="green" />
            <StatCard icon={<MessageCircle size={24} />} title="Total Comments" value={analytics.totalComments} color="red" />
            </div>

            {/* Performance & Top Product */}
            <div className="lg:flex gap-8 mt-8">
            <div className="lg:w-2/3 bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8 lg:mb-0">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><TrendingUp size={20} className="mr-2 text-green-600" /> Performance Overview</h2>
                <div className="text-gray-600 space-y-3">
                <p>Average Views per Product: <span className="font-bold text-green-600">{analytics.avgViews}</span></p>
                <p>Joined Since: <span className="font-bold">{seller.joinedDate}</span></p>
                <p className="flex items-center">Seller Rating: <Star size={18} className="text-yellow-400 ml-1 mr-1" fill="currentColor" /> <span className="font-bold">{seller.rating.toFixed(1)}</span></p>
                <p>Total Sales (Mock): <span className="font-bold">{seller.totalSales}</span></p>
                </div>
                
                <button 
                    onClick={() => setShowAddProduct(true)}
                    className="mt-6 flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition shadow-md"
                >
                    <Plus size={20} className="mr-2" /> Add New Product
                </button>
            </div>

            <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center"><Star size={20} className="mr-2 text-yellow-500" fill="currentColor" /> Top Performing Product</h2>
                {analytics.topProduct ? (
                <div className="space-y-3">
                    <div className="text-4xl text-center">{analytics.topProduct.image}</div>
                    <h3 className="text-lg font-semibold text-green-700 truncate">{analytics.topProduct.title}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                    <Eye size={16} className="mr-1 text-green-500" />
                    {analytics.topProduct.views} Total Views
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                    <Calendar size={16} className="mr-1 text-gray-500" />
                    Posted: {analytics.topProduct.datePosted}
                    </p>
                    <button 
                    onClick={() => setShowProductDetail(analytics.topProduct)}
                    className="w-full mt-2 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition text-sm font-medium"
                    >
                    View Details
                    </button>
                </div>
                ) : (
                <p className="text-gray-500">No products listed yet. Start by adding one!</p>
                )}
            </div>
            </div>
        </div>
      </div>
    );
  };

  const StatCard = ({ icon, title, value, color }) => (
    <div className={`bg-white p-4 rounded-xl shadow border border-gray-100 flex flex-col items-start transition-transform hover:scale-[1.02] duration-300`}>
      <div className={`p-2 rounded-lg bg-${color}-100 text-${color}-600 mb-2`}>
        {icon}
      </div>
      <p className="text-sm text-gray-500 font-medium uppercase">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );

  const MarketplaceView = () => {
    const filteredProducts = getFilteredAndSortedProducts();
    const [showFilterModal, setShowFilterModal] = useState(false);

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="lg:flex max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:w-1/4 sticky top-20 h-full">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <FilterSidebar isMobile={false} />
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="fixed bottom-4 right-4 z-20 lg:hidden">
            <button
              onClick={() => setShowFilterModal(true)}
              className="p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition flex items-center"
              aria-label="Filter products"
            >
              <Filter size={24} />
            </button>
          </div>

          {/* Mobile Filter Modal */}
          {showFilterModal && (
            <FilterSidebar isMobile={true} toggleFilter={() => setShowFilterModal(false)} />
          )}

          {/* Product Listing */}
          <div className="lg:w-3/4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {filteredProducts.length} Results {searchQuery && `for "${searchQuery}"`} in {selectedCategory.toUpperCase()}
            </h2>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="p-10 text-center bg-white rounded-xl shadow-md border border-gray-100">
                <AlertCircle size={32} className="text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">No Products Found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ProductDetailView = ({ product }) => {
    const seller = getSellerById(product.sellerId);
    const productComments = getProductComments(product.id);
    const [commentInput, setCommentInput] = useState('');
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const [replyInput, setReplyInput] = useState('');
    const isFavorite = favorites.includes(product.id);

    // Mock increasing view count on load
    useEffect(() => {
      // Only increment views if the current user isn't the seller
      if (seller && seller.userId !== currentUser.id) {
          setProducts(prev => prev.map(p => 
            p.id === product.id ? { ...p, views: p.views + 1 } : p
          ));
          // Notify seller of the view
          addNotification(seller.userId, 'view', `${currentUser.name} viewed your ${product.title}`, product.id);
      }
    }, [product.id]);

    const handlePostComment = () => {
      if (commentInput.trim()) {
        handleAddComment(product.id, commentInput.trim());
        setCommentInput('');
      }
    };

    const handlePostReply = (commentId) => {
      if (replyInput.trim()) {
        handleReplyComment(commentId, replyInput.trim());
        setReplyInput('');
        setReplyToCommentId(null);
      }
    };

    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <button 
            onClick={() => setShowProductDetail(null)} 
            className="flex items-center text-green-600 hover:text-green-700 font-semibold mb-6"
          >
            <X size={20} className="mr-1 transform rotate-45" /> Back to Marketplace
          </button>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-100">
          
          {/* Product Header */}
          <div className="flex flex-col sm:flex-row gap-6 border-b pb-6 mb-6">
            <div className="flex-shrink-0 text-7xl flex items-center justify-center w-full sm:w-1/3 bg-green-50 rounded-lg p-4 h-48 sm:h-auto">
              {product.image}
            </div>
            
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                  className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-red-500 bg-red-50 shadow' : 'text-gray-400 bg-gray-100 hover:text-red-500'}`}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart fill={isFavorite ? 'currentColor' : 'none'} size={24} />
                </button>
              </div>
              <p className="text-3xl font-extrabold text-green-700 mb-4">{product.priceDisplay}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <span className="flex items-center"><Eye size={16} className="mr-1" /> {product.views} Views</span>
                <span className="flex items-center"><Calendar size={16} className="mr-1" /> Posted: {product.datePosted}</span>
                <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{product.category}</span>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
            </div>
          </div>
          
          {/* Seller Info & Contact */}
          <div className="mb-8 border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><User size={24} className="mr-2 text-green-600" /> Seller Information</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold text-gray-900 mr-2">{seller?.name}</h3>
                  {seller?.verified && <Shield size={20} className="text-blue-500" title="Verified Seller" />}
                </div>
                <div className="flex items-center text-yellow-500 text-sm">
                  <Star size={16} fill="currentColor" className="mr-1" /> {seller?.rating?.toFixed(1) || 'N/A'} Rating
                </div>
                <p className="text-sm text-gray-600 mt-1">Total Sales (Mock): {seller?.totalSales || 0}</p>
              </div>
              
              <button 
                onClick={() => setShowSellerProfile(seller)}
                className="text-sm text-green-600 font-semibold hover:underline mt-2 sm:mt-0"
              >
                View Profile &gt;
              </button>
            </div>
            
            <div className="mt-4 space-y-2">
              <h4 className="text-lg font-semibold text-green-700">Contact Seller</h4>
              <p className="flex items-center text-gray-700"><Phone size={18} className="mr-2 text-green-500" /> {seller?.phone || 'N/A'}</p>
              <p className="flex items-center text-gray-700"><Mail size={18} className="mr-2 text-green-500" /> {seller?.email || 'N/A'}</p>
              <p className="flex items-center text-gray-700"><MapPin size={18} className="mr-2 text-green-500" /> {seller?.location || 'N/A'}</p>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><MessageCircle size={24} className="mr-2 text-green-600" /> Questions & Comments ({productComments.length})</h2>
            
            {/* New Comment Input */}
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
                placeholder="Ask a question about this product..."
              />
              <button
                onClick={handlePostComment}
                disabled={!commentInput.trim()}
                className="mt-2 flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition text-sm font-medium"
              >
                <Send size={18} className="mr-1" /> Post Comment
              </button>
            </div>

            {/* Existing Comments */}
            <div className="space-y-6">
              {productComments.slice().reverse().map(comment => (
                <div key={comment.id} className="border-b pb-4">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="font-semibold text-gray-800 flex items-center">
                      {comment.userName}
                      {getSellerById(product.sellerId)?.userId === comment.userId && <span className="ml-2 text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">Seller</span>}
                    </span>
                    <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.comment}</p>
                  
                  {/* Reply Button */}
                  {currentUser && (
                    <button 
                      onClick={() => setReplyToCommentId(comment.id)}
                      className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center"
                    >
                      <MessageCircle size={14} className="mr-1" /> Reply
                    </button>
                  )}

                  {/* Reply Input */}
                  {replyToCommentId === comment.id && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <textarea
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                        rows="2"
                        className="w-full p-2 border border-gray-300 rounded-lg text-xs focus:ring-green-500 focus:border-green-500"
                        placeholder="Type your reply..."
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => setReplyToCommentId(null)}
                          className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handlePostReply(comment.id)}
                          disabled={!replyInput.trim()}
                          className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
                        >
                          Post Reply
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  <div className="ml-6 mt-3 space-y-3 border-l border-gray-200 pl-4">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="pt-1">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="font-semibold text-gray-700 flex items-center">
                            {reply.userName}
                            {getSellerById(product.sellerId)?.userId === reply.userId && <span className="ml-2 text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">Seller</span>}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(reply.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-600">{reply.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SellerProfileView = ({ seller }) => {
    const sellerProducts = products.filter(p => p.sellerId === seller.id);

    return (
      <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => setShowSellerProfile(null)} 
            className="flex items-center text-green-600 hover:text-green-700 font-semibold mb-6"
          >
            <X size={20} className="mr-1 transform rotate-45" /> Back
          </button>
          
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 sm:p-8">
            {/* Header */}
            <div className="pb-6 mb-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold text-gray-900 mr-3">{seller.name}</h1>
                  {seller.verified && <Shield size={24} className="text-blue-500" title="Verified Seller" />}
                </div>
                <div className="flex items-center text-lg text-yellow-500 font-bold">
                  <Star size={20} fill="currentColor" className="mr-1" /> {seller.rating.toFixed(1)}
                </div>
              </div>
              <p className="text-gray-600 mt-2">{seller.description || 'No description provided.'}</p>
            </div>
            
            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <DetailItem icon={<Phone />} label="Phone" value={seller.phone} />
              <DetailItem icon={<Mail />} label="Email" value={seller.email} />
              <DetailItem icon={<MapPin />} label="Location" value={seller.location} />
              <DetailItem icon={<Calendar />} label="Joined" value={`Since ${seller.joinedDate}`} />
              <DetailItem icon={<DollarSign />} label="Total Sales (Mock)" value={seller.totalSales} />
            </div>

            {/* Listings */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center border-t pt-6"><Users size={24} className="mr-2 text-green-600" /> {seller.name}'s Listings ({sellerProducts.length})</h2>
            
            {sellerProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sellerProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">This seller currently has no active listings.</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="text-green-600 mr-3">{icon}</div>
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );

  const AddProductModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      price: '',
      category: categories[1], // Default to first non-All category
      image: '✨' // Default placeholder emoji
    });
    const [error, setError] = useState('');

    const handleSubmit = () => {
      setError('');
      if (!formData.title || !formData.description || !formData.price || !formData.category) {
        setError('Please fill in all fields.');
        return;
      }
      if (!/^₦[\d,]+$/.test(formData.price)) {
        setError('Price must be in the format ₦100,000 (include ₦ and comma separators).');
        return;
      }

      handleAddProduct(formData);
      setShowAddProduct(false);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowAddProduct(false)}>
        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-green-700 flex items-center"><Plus size={24} className="mr-2" /> List a New Product</h2>
            <button onClick={() => setShowAddProduct(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
          </div>
          
          {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium flex items-center"><AlertCircle size={18} className="inline mr-2" />{error}</div>}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Product Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="E.g., Samsung Galaxy S21 Ultra"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-green-500 focus:border-green-500"
              >
                {categories.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Detailed description, condition, warranty info..."
              />
            </div>
            
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-1">Price * (E.g., ₦100,000)</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="₦35,000"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-1">Display Emoji/Image Placeholder</label>
                <input
                  type="text"
                  maxLength={5}
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg text-center focus:ring-green-500 focus:border-green-500"
                  placeholder="✨"
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full mt-6 flex items-center justify-center py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-lg"
          >
            <CheckCircle size={20} className="mr-2" /> List Product Now
          </button>
        </div>
      </div>
    );
  };

  const NotificationsOverlay = () => {
    const userNotifications = getUserNotifications();
    
    if (!showNotifications) return null;

    return (
      <div className="fixed top-0 right-0 z-50 h-full w-full sm:w-96 bg-white shadow-2xl overflow-y-auto transform transition-transform duration-300 border-l border-gray-200" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center"><Bell size={24} className="mr-2 text-green-600" /> Notifications</h2>
          <div className="flex gap-2">
            <button 
                onClick={markAllNotificationsRead} 
                className="text-xs text-green-600 hover:underline disabled:opacity-50 font-medium"
                disabled={getUnreadCount() === 0}
            >
                Mark All Read
            </button>
            <button onClick={() => setShowNotifications(false)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
        </div>
        
        {userNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <CheckCircle size={32} className="mx-auto mb-4 text-green-500" />
            <p className="font-medium">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {userNotifications.map(n => (
              <div 
                key={n.id} 
                className={`p-4 transition hover:bg-gray-50 cursor-pointer ${!n.read ? 'bg-green-50/70' : ''}`}
                onClick={() => {
                  markNotificationRead(n.id);
                  if (n.productId) {
                    const product = products.find(p => p.id === n.productId);
                    if (product) {
                      setShowProductDetail(product);
                      setShowNotifications(false);
                    }
                  }
                }}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 mr-3 ${!n.read ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                  <div className="flex-grow">
                    <p className={`text-sm ${!n.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{n.message}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <Clock size={12} className="mr-1" /> {new Date(n.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const ChatbotOverlay = () => {
    
    if (!showChatbot) return null;
    
    const ChatMessage = ({ message }) => (
      <div className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'}`}>
        <div 
          className={`max-w-xs sm:max-w-sm p-3 rounded-xl shadow-md ${
            message.type === 'bot' 
              ? 'bg-green-100 text-gray-800 rounded-tl-none flex items-start' 
              : 'bg-green-600 text-white rounded-tr-none'
          }`}
        >
          {message.type === 'bot' && <Bot size={18} className="flex-shrink-0 mr-2 mt-1 text-green-700" />}
          <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
        </div>
      </div>
    );

    const handleSend = () => {
      if (chatInput.trim()) {
        handleChatbotMessage(chatInput.trim());
        setChatInput('');
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };
    
    // Auto-scroll messages to bottom
    const messagesEndRef = React.useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(scrollToBottom, [chatMessages]);

    return (
      <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col h-[70vh] sm:h-96" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b bg-green-600 text-white rounded-t-xl flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center"><Bot size={20} className="mr-2" /> 9jaLinks Assistant</h2>
          <button onClick={() => setShowChatbot(false)} className="text-white hover:text-gray-200"><X size={20} /></button>
        </div>
        
        {/* Chat History */}
        <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50">
          {chatMessages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:ring-green-500 focus:border-green-500 text-sm"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              disabled={!chatInput.trim()}
              className="p-3 bg-green-600 text-white rounded-r-full hover:bg-green-700 disabled:opacity-50 transition"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- Main Application Components ---

  const Header = () => {
    const unreadCount = getUnreadCount();

    return (
      <header className="sticky top-0 z-30 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          
          {/* Logo & Navigation */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-extrabold text-green-700 cursor-pointer" onClick={() => {setCurrentView('marketplace'); setShowProductDetail(null); setShowSellerProfile(null);}}>🇳🇬 9jaLinks</h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden sm:flex space-x-4 text-gray-600 text-sm font-medium">
              <a href="#" onClick={() => setCurrentView('marketplace')} className={`hover:text-green-600 ${currentView === 'marketplace' ? 'text-green-600 font-bold' : ''}`}>Marketplace</a>
              {currentUser?.type === 'seller' && (
                <a href="#" onClick={() => setCurrentView('dashboard')} className={`hover:text-green-600 ${currentView === 'dashboard' ? 'text-green-600 font-bold' : ''}`}>Dashboard</a>
              )}
              <a href="#" onClick={() => setCurrentView('favorites')} className={`hover:text-green-600 ${currentView === 'favorites' ? 'text-green-600 font-bold' : ''}`}>Favorites ({favorites.length})</a>
            </nav>
          </div>

          {/* Search Bar (Mobile/Tablet) */}
          <div className="flex-grow mx-4 sm:hidden">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setCurrentView('marketplace')}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:ring-green-500 focus:border-green-500 text-sm"
                placeholder="Search products..."
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Desktop Search Bar */}
            <div className="hidden sm:block">
              <div className="relative w-72">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && setCurrentView('marketplace')}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:ring-green-500 focus:border-green-500 text-sm"
                  placeholder="Search products..."
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            {/* Seller Action */}
            {currentUser?.type === 'seller' && (
              <button 
                onClick={() => setShowAddProduct(true)}
                className="hidden md:flex items-center px-3 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition text-sm font-medium shadow-md"
              >
                <Plus size={18} className="mr-1" /> Sell
              </button>
            )}

            {/* Notification Button */}
            <button 
              onClick={() => setShowNotifications(prev => !prev)}
              className="p-2 text-gray-600 hover:text-green-600 relative"
              aria-label="Notifications"
            >
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Chatbot Button */}
            <button 
              onClick={() => setShowChatbot(prev => !prev)}
              className="p-2 text-gray-600 hover:text-green-600 hidden sm:block"
              aria-label="Chatbot"
            >
              <Bot size={24} />
            </button>

            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-500 hidden sm:flex items-center space-x-1"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={24} />
            </button>
            
            {/* Mobile Menu (Simplified for brevity) */}
            <button 
              onClick={() => alert(`Mobile Menu:\n- Marketplace\n- ${currentUser?.type === 'seller' ? 'Dashboard\n- ' : ''}Favorites (${favorites.length})\n- Logout`)}
              className="sm:hidden p-2 text-gray-600 hover:text-green-600"
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
    );
  };
  
  const FavoritesView = () => {
    const favoriteProducts = products.filter(p => favorites.includes(p.id));

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-8 flex items-center">
            <Heart size={30} className="mr-2" fill="currentColor" />
            My Favorites ({favorites.length})
          </h1>
          
          {favorites.length === 0 ? (
            <div className="p-10 text-center bg-white rounded-xl shadow-md border border-gray-100">
              <AlertCircle size={32} className="text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">No Favorites Yet</h3>
              <p className="text-gray-600">Click the heart icon on any product to save it here!</p>
              <button 
                onClick={() => setCurrentView('marketplace')} 
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-md"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };


  // --- Main Render Function ---
  
  const renderView = () => {
    if (currentView === 'login') {
      return <LoginView />;
    }

    if (showProductDetail) {
      return <ProductDetailView product={showProductDetail} />;
    }

    if (showSellerProfile) {
      return <SellerProfileView seller={showSellerProfile} />;
    }

    if (currentView === 'dashboard') {
      return <DashboardView />;
    }
    
    if (currentView === 'favorites') {
      return <FavoritesView />;
    }

    return <MarketplaceView />;
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Main Content */}
      {renderView()}

      {/* Overlays */}
      {showAddProduct && <AddProductModal />}
      {showNotifications && <NotificationsOverlay />}
      {currentUser && (
        <>
          {/* Floating Chatbot Button (Mobile) */}
          <button 
            onClick={() => setShowChatbot(prev => !prev)}
            className="fixed bottom-4 left-4 z-40 p-3 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition sm:hidden"
            aria-label="Chatbot"
          >
            <Bot size={24} />
          </button>
          <ChatbotOverlay />
        </>
      )}
    </div>
  );
};

export default NjaLinksApp;

