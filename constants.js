// Platform constants
export const PLATFORM_CONFIG = {
  name: 'منصة الكربون الهجينة',
  nameEn: 'Hybrid Carbon Platform',
  version: '1.0.0',
  description: 'منصة رقمية متطورة لإدارة الكربون وتداول الأصول البيئية',
  supportEmail: 'support@carbonplatform.com',
  supportPhone: '+966 50 123 4567',
  website: 'https://carbonplatform.com'
}

// Supported languages
export const LANGUAGES = [
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'pt', name: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' }
]

// Default language
export const DEFAULT_LANGUAGE = 'ar'

// API endpoints (for future use)
export const API_ENDPOINTS = {
  base: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh'
  },
  user: {
    profile: '/user/profile',
    update: '/user/update',
    delete: '/user/delete'
  },
  wallet: {
    balance: '/wallet/balance',
    transactions: '/wallet/transactions',
    deposit: '/wallet/deposit',
    withdraw: '/wallet/withdraw'
  },
  marketplace: {
    nfts: '/marketplace/nfts',
    categories: '/marketplace/categories',
    purchase: '/marketplace/purchase'
  },
  admin: {
    users: '/admin/users',
    transactions: '/admin/transactions',
    analytics: '/admin/analytics'
  }
}

// Currency configuration
export const CURRENCIES = [
  { code: 'SAR', name: 'ريال سعودي', symbol: 'ر.س', rate: 1 },
  { code: 'USD', name: 'دولار أمريكي', symbol: '$', rate: 3.75 },
  { code: 'EUR', name: 'يورو', symbol: '€', rate: 4.10 }
]

// Default currency
export const DEFAULT_CURRENCY = 'SAR'

// Transaction types
export const TRANSACTION_TYPES = {
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  PURCHASE: 'purchase',
  SALE: 'sale',
  OFFSET: 'offset',
  TRANSFER: 'transfer'
}

// Transaction statuses
export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
}

// NFT categories
export const NFT_CATEGORIES = [
  { id: 'all', name: 'جميع الفئات', nameEn: 'All Categories' },
  { id: 'carbon-offset', name: 'تعويض الكربون', nameEn: 'Carbon Offset' },
  { id: 'renewable-energy', name: 'الطاقة المتجددة', nameEn: 'Renewable Energy' },
  { id: 'forest-conservation', name: 'حفظ الغابات', nameEn: 'Forest Conservation' },
  { id: 'ocean-cleanup', name: 'تنظيف المحيطات', nameEn: 'Ocean Cleanup' },
  { id: 'wildlife-protection', name: 'حماية الحياة البرية', nameEn: 'Wildlife Protection' }
]

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  VERIFIED: 'verified'
}

// Achievement types
export const ACHIEVEMENT_TYPES = {
  FIRST_PURCHASE: 'first_purchase',
  CARBON_OFFSET: 'carbon_offset',
  RENEWABLE_ENERGY: 'renewable_energy',
  FOREST_CONSERVATION: 'forest_conservation',
  OCEAN_CLEANUP: 'ocean_cleanup',
  TRADING_VOLUME: 'trading_volume',
  COMMUNITY_CONTRIBUTION: 'community_contribution'
}

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info'
}

// Theme configuration
export const THEME_CONFIG = {
  colors: {
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d'
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    }
  },
  fonts: {
    arabic: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
    latin: ['Inter', 'system-ui', 'sans-serif']
  }
}

// Validation rules
export const VALIDATION_RULES = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+966|0)?[5-9][0-9]{8}$/,
  password: {
    minLength: 6,
    maxLength: 128,
    requireUppercase: false,
    requireLowercase: false,
    requireNumbers: false,
    requireSpecialChars: false
  },
  name: {
    minLength: 2,
    maxLength: 50
  }
}

// Local storage keys
export const STORAGE_KEYS = {
  USER: 'carbon_platform_user',
  TOKEN: 'carbon_platform_token',
  LANGUAGE: 'carbon_platform_language',
  THEME: 'carbon_platform_theme',
  PREFERENCES: 'carbon_platform_preferences'
}

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
}

// Date formats
export const DATE_FORMATS = {
  SHORT: 'DD/MM/YYYY',
  LONG: 'DD MMMM YYYY',
  DATETIME: 'DD/MM/YYYY HH:mm',
  TIME: 'HH:mm'
}

// File upload limits
export const FILE_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  MAX_FILES: 5
}
