import { CURRENCIES, DEFAULT_CURRENCY, VALIDATION_RULES, DATE_FORMATS } from './constants'

// Format currency
export const formatCurrency = (amount, currency = DEFAULT_CURRENCY, showSymbol = true) => {
  const currencyData = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0]
  const formattedAmount = new Intl.NumberFormat('ar-SA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
  
  return showSymbol ? `${formattedAmount} ${currencyData.symbol}` : formattedAmount
}

// Convert currency
export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const fromRate = CURRENCIES.find(c => c.code === fromCurrency)?.rate || 1
  const toRate = CURRENCIES.find(c => c.code === toCurrency)?.rate || 1
  
  return (amount * fromRate) / toRate
}

// Format date
export const formatDate = (date, format = DATE_FORMATS.SHORT) => {
  if (!date) return ''
  
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }
  
  return d.toLocaleDateString('ar-SA', options)
}

// Format relative time
export const formatRelativeTime = (date) => {
  if (!date) return ''
  
  const now = new Date()
  const targetDate = new Date(date)
  const diffInSeconds = Math.floor((now - targetDate) / 1000)
  
  if (diffInSeconds < 60) return 'الآن'
  if (diffInSeconds < 3600) return `منذ ${Math.floor(diffInSeconds / 60)} دقيقة`
  if (diffInSeconds < 86400) return `منذ ${Math.floor(diffInSeconds / 3600)} ساعة`
  if (diffInSeconds < 2592000) return `منذ ${Math.floor(diffInSeconds / 86400)} يوم`
  if (diffInSeconds < 31536000) return `منذ ${Math.floor(diffInSeconds / 2592000)} شهر`
  return `منذ ${Math.floor(diffInSeconds / 31536000)} سنة`
}

// Validate email
export const validateEmail = (email) => {
  return VALIDATION_RULES.email.test(email)
}

// Validate phone
export const validatePhone = (phone) => {
  return VALIDATION_RULES.phone.test(phone)
}

// Validate password
export const validatePassword = (password) => {
  const rules = VALIDATION_RULES.password
  const errors = []
  
  if (password.length < rules.minLength) {
    errors.push(`كلمة المرور يجب أن تكون ${rules.minLength} أحرف على الأقل`)
  }
  
  if (password.length > rules.maxLength) {
    errors.push(`كلمة المرور يجب أن تكون أقل من ${rules.maxLength} حرف`)
  }
  
  if (rules.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل')
  }
  
  if (rules.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل')
  }
  
  if (rules.requireNumbers && !/\d/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على رقم واحد على الأقل')
  }
  
  if (rules.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validate name
export const validateName = (name) => {
  const rules = VALIDATION_RULES.name
  const errors = []
  
  if (name.length < rules.minLength) {
    errors.push(`الاسم يجب أن يكون ${rules.minLength} أحرف على الأقل`)
  }
  
  if (name.length > rules.maxLength) {
    errors.push(`الاسم يجب أن يكون أقل من ${rules.maxLength} حرف`)
  }
  
  if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(name)) {
    errors.push('الاسم يجب أن يحتوي على أحرف فقط')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Generate random ID
export const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Generate transaction reference
export const generateTransactionRef = () => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 5)
  return `TXN-${timestamp}-${random}`.toUpperCase()
}

// Debounce function
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch (err) {
      document.body.removeChild(textArea)
      return false
    }
  }
}

// Download file
export const downloadFile = (data, filename, type = 'text/plain') => {
  const blob = new Blob([data], { type })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

// Get file extension
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Check if user is online
export const isOnline = () => {
  return navigator.onLine
}

// Get device type
export const getDeviceType = () => {
  const userAgent = navigator.userAgent
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return 'tablet'
  }
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm/i.test(userAgent)) {
    return 'mobile'
  }
  return 'desktop'
}

// Check if touch device
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// Get browser info
export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent
  const browsers = {
    chrome: /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor),
    safari: /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor),
    firefox: /Firefox/.test(userAgent),
    edge: /Edge/.test(userAgent),
    ie: /Trident/.test(userAgent)
  }
  
  return Object.keys(browsers).find(key => browsers[key]) || 'unknown'
}

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error getting from localStorage:', error)
      return null
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Error setting to localStorage:', error)
      return false
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing from localStorage:', error)
      return false
    }
  },
  
  clear: () => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }
}

// Session storage helpers
export const sessionStorage = {
  get: (key) => {
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error getting from sessionStorage:', error)
      return null
    }
  },
  
  set: (key, value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Error setting to sessionStorage:', error)
      return false
    }
  },
  
  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing from sessionStorage:', error)
      return false
    }
  },
  
  clear: () => {
    try {
      window.sessionStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing sessionStorage:', error)
      return false
    }
  }
}

// URL helpers
export const url = {
  getParams: () => {
    const params = new URLSearchParams(window.location.search)
    const result = {}
    for (const [key, value] of params) {
      result[key] = value
    }
    return result
  },
  
  setParam: (key, value) => {
    const url = new URL(window.location)
    url.searchParams.set(key, value)
    window.history.pushState({}, '', url)
  },
  
  removeParam: (key) => {
    const url = new URL(window.location)
    url.searchParams.delete(key)
    window.history.pushState({}, '', url)
  }
}

// Color helpers
export const color = {
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  },
  
  rgbToHex: (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  },
  
  getContrastColor: (hex) => {
    const rgb = color.hexToRgb(hex)
    if (!rgb) return '#000000'
    
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
    return brightness > 128 ? '#000000' : '#ffffff'
  }
}
