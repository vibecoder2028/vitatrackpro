import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Package, 
  Users, 
  TrendingUp, 
  Store, 
  MapPin, 
  Search,
  Eye,
  Edit,
  MoreVertical,
  DollarSign,
  UserCheck,
  CheckCircle,
  Clock,
  Plus,
  CreditCard,
  Building2,
  Globe,
  Download,
  Upload,
  RefreshCw,
  Shield,
  Database,
  Activity,
  Target,
  FileText,
  PieChart,
  AlertCircle,
  Zap,
  X
} from 'lucide-react';

// Modal component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};



// Mock data for the application
const mockData = {
  stores: [
    { id: 1, name: 'Guardian Central Park', location: 'Central Jakarta', region: 'Jakarta', spg: 'Sari Dewi', status: 'active', monthlySales: 8500000, lastSettlement: '2025-05-15', achStatus: 'completed', pendingPayout: 0 },
    { id: 2, name: 'Watsons Plaza Indonesia', location: 'Central Jakarta', region: 'Jakarta', spg: 'Maya Sinta', status: 'active', monthlySales: 12300000, lastSettlement: '2025-05-20', achStatus: 'pending', pendingPayout: 2460000 },
    { id: 3, name: 'Century Kelapa Gading', location: 'North Jakarta', region: 'Jakarta', spg: 'Rina Putri', status: 'pending', monthlySales: 6700000, lastSettlement: '2025-05-10', achStatus: 'processing', pendingPayout: 1340000 },
    { id: 4, name: 'Kimia Farma Senayan', location: 'South Jakarta', region: 'Jakarta', spg: 'Lila Sari', status: 'active', monthlySales: 9800000, lastSettlement: '2025-05-18', achStatus: 'completed', pendingPayout: 0 },
    { id: 5, name: 'Guardian Surabaya Plaza', location: 'Surabaya', region: 'East Java', spg: 'Ani Wulan', status: 'active', monthlySales: 7200000, lastSettlement: '2025-05-22', achStatus: 'pending', pendingPayout: 1440000 },
    { id: 6, name: 'Watsons Bandung Supermall', location: 'Bandung', region: 'West Java', spg: 'Devi Sari', status: 'active', monthlySales: 5800000, lastSettlement: '2025-05-19', achStatus: 'completed', pendingPayout: 0 }
  ],
  spgs: [
    { id: 1, name: 'Sari Dewi', territory: 'Central Jakarta', region: 'Jakarta', stores: 12, totalSales: 125000000, performance: 95, commission: 6250000, bankAccount: 'BCA ***1234', achStatus: 'active', lastPayout: '2025-05-30' },
    { id: 2, name: 'Maya Sinta', territory: 'Central Jakarta', region: 'Jakarta', stores: 8, totalSales: 98000000, performance: 88, commission: 4900000, bankAccount: 'Mandiri ***5678', achStatus: 'active', lastPayout: '2025-05-30' },
    { id: 3, name: 'Rina Putri', territory: 'North Jakarta', region: 'Jakarta', stores: 15, totalSales: 89000000, performance: 78, commission: 4450000, bankAccount: 'BNI ***9012', achStatus: 'pending', lastPayout: '2025-05-25' },
    { id: 4, name: 'Lila Sari', territory: 'South Jakarta', region: 'Jakarta', stores: 10, totalSales: 156000000, performance: 92, commission: 7800000, bankAccount: 'BRI ***3456', achStatus: 'active', lastPayout: '2025-05-30' },
    { id: 5, name: 'Ani Wulan', territory: 'Surabaya', region: 'East Java', stores: 18, totalSales: 142000000, performance: 89, commission: 7100000, bankAccount: 'BCA ***7890', achStatus: 'active', lastPayout: '2025-05-30' },
    { id: 6, name: 'Devi Sari', territory: 'Bandung', region: 'West Java', stores: 14, totalSales: 118000000, performance: 85, commission: 5900000, bankAccount: 'Mandiri ***2468', achStatus: 'active', lastPayout: '2025-05-30' }
  ],
  products: [
    { id: 1, name: 'Vitamin C 1000mg', sku: 'VTC1000', stock: 2450, reserved: 180, available: 2270, price: 85000, cost: 45000, category: 'Vitamin C', status: 'in-stock', reorderLevel: 500, supplier: 'PT Kimia Farma' },
    { id: 2, name: 'Multivitamin Complete', sku: 'MVC001', stock: 180, reserved: 45, available: 135, price: 125000, cost: 75000, category: 'Multivitamin', status: 'low-stock', reorderLevel: 200, supplier: 'PT Kalbe Farma' },
    { id: 3, name: 'Omega 3 Fish Oil', sku: 'OMG300', stock: 0, reserved: 0, available: 0, price: 95000, cost: 55000, category: 'Supplements', status: 'out-of-stock', reorderLevel: 300, supplier: 'PT Dexa Medica' },
    { id: 4, name: 'Vitamin D3 2000IU', sku: 'VTD2000', stock: 1250, reserved: 85, available: 1165, price: 75000, cost: 40000, category: 'Vitamin D', status: 'in-stock', reorderLevel: 400, supplier: 'PT Kimia Farma' }
  ],
  payouts: [
    { id: 1, spgName: 'Sari Dewi', amount: 6250000, date: '2025-05-30', status: 'completed', achReference: 'ACH240530001', bankAccount: 'BCA ***1234', processingTime: '2 hours' },
    { id: 2, spgName: 'Maya Sinta', amount: 4900000, date: '2025-05-30', status: 'completed', achReference: 'ACH240530002', bankAccount: 'Mandiri ***5678', processingTime: '1.5 hours' },
    { id: 3, spgName: 'Rina Putri', amount: 4450000, date: '2025-06-14', status: 'pending', achReference: 'ACH240614001', bankAccount: 'BNI ***9012', processingTime: 'Processing...' },
    { id: 4, spgName: 'Lila Sari', amount: 7800000, date: '2025-05-30', status: 'completed', achReference: 'ACH240530003', bankAccount: 'BRI ***3456', processingTime: '3 hours' }
  ],
  regions: [
    { id: 1, name: 'Jakarta', stores: 28, spgs: 4, monthlySales: 185000000, status: 'active' },
    { id: 2, name: 'East Java', stores: 18, spgs: 1, monthlySales: 142000000, status: 'active' },
    { id: 3, name: 'West Java', stores: 14, spgs: 1, monthlySales: 118000000, status: 'active' },
    { id: 4, name: 'Central Java', stores: 12, spgs: 0, monthlySales: 0, status: 'planning' }
  ]
};

function VitaTrackPro() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  
  // Modal states
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddSPGModal, setShowAddSPGModal] = useState(false);
  const [showAddStoreModal, setShowAddStoreModal] = useState(false);
  
  // Form states
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: 'Vitamin C',
    supplier: 'PT Kimia Farma',
    price: '',
    cost: '',
    stock: '',
    reorderLevel: ''
  });
  
  const [newSPG, setNewSPG] = useState({
    name: '',
    email: '',
    phone: '',
    territory: '',
    region: 'Jakarta',
    bankName: 'BCA',
    bankAccount: '',
    bankAccountName: ''
  });
  
  const [newStore, setNewStore] = useState({
    name: '',
    address: '',
    city: '',
    region: 'Jakarta',
    spg: '',
    contactPerson: '',
    contactPhone: ''
  });

  // Handle form submissions
  const handleAddProduct = (e) => {
    e.preventDefault();
    // Here you would integrate with your Supabase database
    console.log('Adding product:', newProduct);
    alert(`Product "${newProduct.name}" added successfully!\n\nIn production, this would save to your Supabase database.`);
    setShowAddProductModal(false);
    setNewProduct({
      name: '',
      sku: '',
      category: 'Vitamin C',
      supplier: 'PT Kimia Farma',
      price: '',
      cost: '',
      stock: '',
      reorderLevel: ''
    });
  };

  const handleAddSPG = (e) => {
    e.preventDefault();
    console.log('Adding SPG:', newSPG);
    alert(`SPG "${newSPG.name}" added successfully!\n\nIn production, this would save to your Supabase database.`);
    setShowAddSPGModal(false);
    setNewSPG({
      name: '',
      email: '',
      phone: '',
      territory: '',
      region: 'Jakarta',
      bankName: 'BCA',
      bankAccount: '',
      bankAccountName: ''
    });
  };

  const handleAddStore = (e) => {
    e.preventDefault();
    console.log('Adding store:', newStore);
    alert(`Store "${newStore.name}" added successfully!\n\nIn production, this would save to your Supabase database.`);
    setShowAddStoreModal(false);
    setNewStore({
      name: '',
      address: '',
      city: '',
      region: 'Jakarta',
      spg: '',
      contactPerson: '',
      contactPhone: ''
    });
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Calculate total metrics
  const totalMetrics = useMemo(() => {
    const totalSales = mockData.stores.reduce((sum, store) => sum + store.monthlySales, 0);
    const activeStores = mockData.stores.filter(store => store.status === 'active').length;
    const totalSPGs = mockData.spgs.length;
    const totalProducts = mockData.products.length;
    const pendingPayouts = mockData.stores.reduce((sum, store) => sum + store.pendingPayout, 0);
    
    return { totalSales, activeStores, totalSPGs, totalProducts, pendingPayouts };
  }, []);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'active': { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      'inactive': { bg: 'bg-red-100', text: 'text-red-800', label: 'Inactive' },
      'completed': { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
      'processing': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Processing' },
      'failed': { bg: 'bg-red-100', text: 'text-red-800', label: 'Failed' },
      'in-stock': { bg: 'bg-green-100', text: 'text-green-800', label: 'In Stock' },
      'low-stock': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Low Stock' },
      'out-of-stock': { bg: 'bg-red-100', text: 'text-red-800', label: 'Out of Stock' },
      'planning': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Planning' }
    };
    
    const config = statusConfig[status] || statusConfig['inactive'];
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Metric card component
  const MetricCard = ({ icon: Icon, title, value, change, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {change && (
            <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  // Render view based on active tab
  const renderView = () => {
    switch (activeTab) {
      case 'dashboard': 
        return (
          <div className="space-y-6">
            {/* Cloud Platform Status */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Cloud Platform Status</h2>
                  <p className="text-blue-100 mt-1">All systems operational • Real-time sync active</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    <span className="text-sm">99.9% Uptime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    <span className="text-sm">Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    <span className="text-sm">Multi-Region</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard 
                icon={DollarSign} 
                title="Monthly Sales" 
                value={formatCurrency(totalMetrics.totalSales)} 
                change="+12.5%" 
                color="bg-gradient-to-r from-green-500 to-green-600"
                subtitle="Across all regions"
              />
              <MetricCard 
                icon={Store} 
                title="Active Stores" 
                value={`${totalMetrics.activeStores} / ${mockData.stores.length}`} 
                change="+8 new" 
                color="bg-gradient-to-r from-blue-500 to-blue-600"
                subtitle="Multi-location support"
              />
              <MetricCard 
                icon={Users} 
                title="SPGs/Consignors" 
                value={totalMetrics.totalSPGs.toLocaleString()} 
                change="+2 new" 
                color="bg-gradient-to-r from-purple-500 to-purple-600"
                subtitle="Automated management"
              />
              <MetricCard 
                icon={CreditCard} 
                title="Pending Payouts" 
                value={formatCurrency(totalMetrics.pendingPayouts)} 
                change="ACH Processing" 
                color="bg-gradient-to-r from-orange-500 to-orange-600"
                subtitle="Auto-processing enabled"
              />
            </div>

            {/* Multi-Region Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Regional Performance
                </h3>
                <div className="space-y-3">
                  {mockData.regions.map(region => (
                    <div key={region.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{region.name}</p>
                        <p className="text-sm text-gray-600">{region.stores} stores • {region.spgs} SPGs</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{formatCurrency(region.monthlySales)}</p>
                        <StatusBadge status={region.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Automated Payouts
                </h3>
                <div className="space-y-3">
                  {mockData.payouts.slice(0, 4).map(payout => (
                    <div key={payout.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{payout.spgName}</p>
                        <p className="text-sm text-gray-600">{payout.bankAccount} • {payout.processingTime}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{formatCurrency(payout.amount)}</p>
                        <StatusBadge status={payout.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'inventory': 
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="h-6 w-6" />
                Advanced Inventory Management
              </h2>
              <div className="flex gap-2">
                <button 
                  type="button"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export
                </button>
                <button 
                  type="button"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Import
                </button>
                <button 
                  type="button"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center gap-2"
                  onClick={() => setShowAddProductModal(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Vitamin C">Vitamin C</option>
                <option value="Multivitamin">Multivitamin</option>
                <option value="Supplements">Supplements</option>
                <option value="Vitamin D">Vitamin D</option>
              </select>
            </div>

            {/* Inventory Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <h4 className="font-medium text-red-800">Out of Stock</h4>
                </div>
                <p className="text-red-700 mt-1">1 product needs immediate reorder</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-800">Low Stock</h4>
                </div>
                <p className="text-yellow-700 mt-1">1 product below reorder level</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Reserved Stock</h4>
                </div>
                <p className="text-blue-700 mt-1">310 units reserved for shipment</p>
              </div>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Levels</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pricing</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockData.products
                      .filter(product => 
                        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        (selectedFilter === 'all' || product.category === selectedFilter)
                      )
                      .map(product => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.category}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.sku}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              <div className="text-gray-900">Total: {product.stock.toLocaleString()}</div>
                              <div className="text-gray-500">Available: {product.available.toLocaleString()}</div>
                              <div className="text-blue-600">Reserved: {product.reserved.toLocaleString()}</div>
                              <div className="text-orange-600">Reorder: {product.reorderLevel.toLocaleString()}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              <div className="text-gray-900">Sell: {formatCurrency(product.price)}</div>
                              <div className="text-gray-500">Cost: {formatCurrency(product.cost)}</div>
                              <div className="text-green-600">Margin: {Math.round(((product.price - product.cost) / product.price) * 100)}%</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.supplier}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={product.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button type="button" className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button type="button" className="text-gray-600 hover:text-gray-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button type="button" className="text-gray-600 hover:text-gray-900">
                                <RefreshCw className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'spg': 
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="h-6 w-6" />
                Consignor/SPG Management
              </h2>
              <div className="flex gap-2">
                <button 
                  type="button"
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Process Payouts
                </button>
                <button 
                  type="button"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 flex items-center gap-2"
                  onClick={() => setShowAddSPGModal(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add SPG
                </button>
              </div>
            </div>

            {/* SPG Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Avg Performance</h4>
                </div>
                <p className="text-2xl font-bold text-blue-600 mt-1">87.5%</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-gray-900">Total Commissions</h4>
                </div>
                <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(36400000)}</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-gray-900">Active ACH</h4>
                </div>
                <p className="text-2xl font-bold text-purple-600 mt-1">5</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  <h4 className="font-medium text-gray-900">Avg Payout Time</h4>
                </div>
                <p className="text-2xl font-bold text-orange-600 mt-1">2.1h</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.spgs.map(spg => (
                <div key={spg.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <UserCheck className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{spg.name}</h3>
                        <p className="text-sm text-gray-600">{spg.territory}</p>
                      </div>
                    </div>
                    <button type="button" className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Stores Managed</span>
                      <span className="font-semibold text-gray-900">{spg.stores}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Sales</span>
                      <span className="font-semibold text-green-600">{formatCurrency(spg.totalSales)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Commission</span>
                      <span className="font-semibold text-purple-600">{formatCurrency(spg.commission)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Performance</span>
                      <span className={`font-semibold ${spg.performance >= 90 ? 'text-green-600' : spg.performance >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {spg.performance}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Bank Account</span>
                      <span className="text-sm text-gray-500">{spg.bankAccount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">ACH Status</span>
                      <StatusBadge status={spg.achStatus} />
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100"
                      >
                        View Details
                      </button>
                      <button 
                        type="button"
                        className="flex-1 bg-green-50 text-green-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-100 flex items-center justify-center gap-1"
                      >
                        <CreditCard className="h-3 w-3" />
                        Payout
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'payouts': 
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="h-6 w-6" />
                Automated Payouts/ACH
              </h2>
              <div className="flex gap-2">
                <button 
                  type="button"
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Report
                </button>
                <button 
                  type="button"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 flex items-center gap-2"
                  onClick={() => setShowAddStoreModal(true)}
                >
                  <Zap className="h-4 w-4" />
                  Process All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-gray-900">Total Payouts</h4>
                </div>
                <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(30500000)}</p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <h4 className="font-medium text-gray-900">Pending</h4>
                </div>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{formatCurrency(5900000)}</p>
                <p className="text-sm text-gray-500">Processing</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Success Rate</h4>
                </div>
                <p className="text-2xl font-bold text-blue-600 mt-1">98.5%</p>
                <p className="text-sm text-gray-500">Last 30 days</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-gray-900">Avg Time</h4>
                </div>
                <p className="text-2xl font-bold text-purple-600 mt-1">2.1h</p>
                <p className="text-sm text-gray-500">Processing time</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SPG Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Account</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACH Reference</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processing Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockData.payouts.map(payout => (
                      <tr key={payout.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{payout.spgName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(payout.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payout.bankAccount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payout.achReference}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payout.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payout.processingTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={payout.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'stores': 
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Multi-Location Store Management
              </h2>
              <div className="flex gap-2">
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="all">All Regions</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="East Java">East Java</option>
                  <option value="West Java">West Java</option>
                </select>
                <button 
                  type="button"
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Store
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location/Region</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SPG</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Sales</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Payout</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACH Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockData.stores
                      .filter(store => selectedRegion === 'all' || store.region === selectedRegion)
                      .map(store => (
                        <tr key={store.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Store className="h-5 w-5 text-gray-400 mr-3" />
                              <div className="font-medium text-gray-900">{store.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              <div>
                                <div>{store.location}</div>
                                <div className="text-xs text-gray-400">{store.region}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {store.spg}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(store.monthlySales)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {store.pendingPayout > 0 ? (
                              <span className="text-orange-600 font-medium">{formatCurrency(store.pendingPayout)}</span>
                            ) : (
                              <span className="text-gray-400">None</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={store.achStatus} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button type="button" className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button type="button" className="text-gray-600 hover:text-gray-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button type="button" className="text-green-600 hover:text-green-900">
                                <CreditCard className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'reports': 
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Reporting & Analytics
              </h2>
              <div className="flex gap-2">
                <button 
                  type="button"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Generate Report
                </button>
                <button 
                  type="button"
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export Data
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-gray-900">Total Revenue</h4>
                </div>
                <p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(445000000)}</p>
                <p className="text-sm text-gray-500">+15.3% vs last month</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Active SPGs</h4>
                </div>
                <p className="text-2xl font-bold text-blue-600 mt-1">6</p>
                <p className="text-sm text-gray-500">Across 3 regions</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-gray-900">Active Stores</h4>
                </div>
                <p className="text-2xl font-bold text-purple-600 mt-1">60</p>
                <p className="text-sm text-gray-500">Multi-location network</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  <h4 className="font-medium text-gray-900">Avg Margin</h4>
                </div>
                <p className="text-2xl font-bold text-orange-600 mt-1">42%</p>
                <p className="text-sm text-gray-500">Product profitability</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Sales Performance</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Regional charts will be displayed here</p>
                    <p className="text-sm text-gray-400">Connect to Supabase for real data</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Payout Trends</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Payout analytics will be displayed here</p>
                    <p className="text-sm text-gray-400">Connect to Supabase for real data</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settlement Reports</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">May 2025 Settlement</p>
                      <p className="text-sm text-gray-600">60 stores processed across all regions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{formatCurrency(445000000)}</p>
                    <p className="text-sm text-gray-500">Completed</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-gray-900">June 2025 Settlement</p>
                      <p className="text-sm text-gray-600">In progress - 35 stores processed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-yellow-600">{formatCurrency(258000000)}</p>
                    <p className="text-sm text-gray-500">Processing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default: 
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p>Dashboard content goes here</p>
          </div>
        );
    }
  };

  // Navigation items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'spg', label: 'SPGs/Consignors', icon: Users },
    { id: 'payouts', label: 'Automated Payouts', icon: CreditCard },
    { id: 'stores', label: 'Multi-Location', icon: Building2 },
    { id: 'reports', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  VitaTrackPro
                </h1>
                <p className="text-sm text-gray-600">Comprehensive Vitamin Business Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Cloud Platform • Multi-Region</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  Jakarta, Surabaya, Bandung
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <div className="space-y-1">
              {navigationItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderView()}
        </main>
      </div>

      {/* Add Product Modal */}
      <Modal 
        isOpen={showAddProductModal} 
        onClose={() => setShowAddProductModal(false)}
        title="Add New Product"
      >
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              placeholder="e.g., Vitamin C 1000mg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={newProduct.sku}
              onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
              placeholder="e.g., VTC1000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="Vitamin C">Vitamin C</option>
                <option value="Multivitamin">Multivitamin</option>
                <option value="Supplements">Supplements</option>
                <option value="Vitamin D">Vitamin D</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newProduct.supplier}
                onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
              >
                <option value="PT Kimia Farma">PT Kimia Farma</option>
                <option value="PT Kalbe Farma">PT Kalbe Farma</option>
                <option value="PT Dexa Medica">PT Dexa Medica</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price (IDR)</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newProduct.cost}
                onChange={(e) => setNewProduct({...newProduct, cost: e.target.value})}
                placeholder="45000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (IDR)</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                placeholder="85000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Stock</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                placeholder="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level</label>
              <input
                type="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={newProduct.reorderLevel}
                onChange={(e) => setNewProduct({...newProduct, reorderLevel: e.target.value})}
                placeholder="500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddProductModal(false)}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800"
            >
              Add Product
            </button>
          </div>
        </form>
      </Modal>

      {/* Add SPG Modal */}
      <Modal 
        isOpen={showAddSPGModal} 
        onClose={() => setShowAddSPGModal(false)}
        title="Add New SPG/Consignor"
      >
        <form onSubmit={handleAddSPG} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={newSPG.name}
              onChange={(e) => setNewSPG({...newSPG, name: e.target.value})}
              placeholder="e.g., Sari Dewi"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={newSPG.email}
              onChange={(e) => setNewSPG({...newSPG, email: e.target.value})}
              placeholder="sari.dewi@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={newSPG.phone}
                onChange={(e) => setNewSPG({...newSPG, phone: e.target.value})}
                placeholder="+6281234567890"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={newSPG.region}
                onChange={(e) => setNewSPG({...newSPG, region: e.target.value})}
              >
                <option value="Jakarta">Jakarta</option>
                <option value="East Java">East Java</option>
                <option value="West Java">West Java</option>
                <option value="Central Java">Central Java</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Territory</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={newSPG.territory}
              onChange={(e) => setNewSPG({...newSPG, territory: e.target.value})}
              placeholder="e.g., Central Jakarta"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={newSPG.bankName}
                onChange={(e) => setNewSPG({...newSPG, bankName: e.target.value})}
              >
                <option value="BCA">BCA</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BNI">BNI</option>
                <option value="BRI">BRI</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={newSPG.bankAccount}
                onChange={(e) => setNewSPG({...newSPG, bankAccount: e.target.value})}
                placeholder="1234567890"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={newSPG.bankAccountName}
              onChange={(e) => setNewSPG({...newSPG, bankAccountName: e.target.value})}
              placeholder="Sari Dewi"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddSPGModal(false)}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-700 hover:to-purple-800"
            >
              Add SPG
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Store Modal */}
      <Modal 
        isOpen={showAddStoreModal} 
        onClose={() => setShowAddStoreModal(false)}
        title="Add New Store"
      >
        <form onSubmit={handleAddStore} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={newStore.name}
              onChange={(e) => setNewStore({...newStore, name: e.target.value})}
              placeholder="e.g., Guardian Central Park"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              required
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={newStore.address}
              onChange={(e) => setNewStore({...newStore, address: e.target.value})}
              placeholder="Full store address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={newStore.city}
                onChange={(e) => setNewStore({...newStore, city: e.target.value})}
                placeholder="Jakarta"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={newStore.region}
                onChange={(e) => setNewStore({...newStore, region: e.target.value})}
              >
                <option value="Jakarta">Jakarta</option>
                <option value="East Java">East Java</option>
                <option value="West Java">West Java</option>
                <option value="Central Java">Central Java</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned SPG</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={newStore.spg}
              onChange={(e) => setNewStore({...newStore, spg: e.target.value})}
            >
              <option value="">Select an SPG</option>
              {mockData.spgs.map(spg => (
                <option key={spg.id} value={spg.name}>{spg.name} - {spg.territory}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={newStore.contactPerson}
                onChange={(e) => setNewStore({...newStore, contactPerson: e.target.value})}
                placeholder="Store manager name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={newStore.contactPhone}
                onChange={(e) => setNewStore({...newStore, contactPhone: e.target.value})}
                placeholder="+6281234567890"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddStoreModal(false)}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800"
            >
              Add Store
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default VitaTrackPro;