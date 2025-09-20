import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Leaf, Coins, TrendingUp, Search, Filter, Star, Eye, Heart, ShoppingCart, ArrowLeft } from 'lucide-react'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { getTranslation } from '../translations.js'

const MarketplacePage = ({ currentLanguage, setCurrentLanguage, isAuthenticated }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const t = (key) => getTranslation(currentLanguage, key)

  const categories = [
    { id: 'all', name: 'جميع الفئات' },
    { id: 'carbon-offset', name: 'تعويض الكربون' },
    { id: 'renewable-energy', name: 'الطاقة المتجددة' },
    { id: 'forest-conservation', name: 'حفظ الغابات' },
    { id: 'ocean-cleanup', name: 'تنظيف المحيطات' }
  ]

  const nftItems = [
    {
      id: 1,
      title: 'شجرة الكربون الذكية',
      description: 'NFT يمثل 1 طن من الكربون المعوض من مشروع زراعة الأشجار في الأمازون',
      price: 150,
      currency: 'ريال',
      image: '🌳',
      category: 'carbon-offset',
      rating: 4.8,
      reviews: 124,
      likes: 89,
      isLiked: false,
      seller: 'مؤسسة البيئة الخضراء',
      verified: true
    },
    {
      id: 2,
      title: 'طاقة شمسية نظيفة',
      description: 'رمز يمثل 500 كيلوواط ساعة من الطاقة الشمسية النظيفة',
      price: 200,
      currency: 'ريال',
      image: '☀️',
      category: 'renewable-energy',
      rating: 4.9,
      reviews: 98,
      likes: 156,
      isLiked: true,
      seller: 'شركة الطاقة المستدامة',
      verified: true
    },
    {
      id: 3,
      title: 'حفظ غابة الأمازون',
      description: 'NFT يحمي 100 متر مربع من غابة الأمازون المطيرة',
      price: 75,
      currency: 'ريال',
      image: '🌲',
      category: 'forest-conservation',
      rating: 4.7,
      reviews: 67,
      likes: 43,
      isLiked: false,
      seller: 'منظمة حماية الغابات',
      verified: false
    },
    {
      id: 4,
      title: 'تنظيف المحيط الأطلسي',
      description: 'رمز يمثل إزالة 50 كيلوغرام من النفايات البلاستيكية من المحيط',
      price: 120,
      currency: 'ريال',
      image: '🌊',
      category: 'ocean-cleanup',
      rating: 4.6,
      reviews: 89,
      likes: 72,
      isLiked: false,
      seller: 'مؤسسة المحيط النظيف',
      verified: true
    },
    {
      id: 5,
      title: 'مزرعة الرياح البحرية',
      description: 'NFT يمثل 1 ميجاواط من طاقة الرياح البحرية',
      price: 300,
      currency: 'ريال',
      image: '💨',
      category: 'renewable-energy',
      rating: 4.9,
      reviews: 156,
      likes: 203,
      isLiked: true,
      seller: 'شركة الرياح الخضراء',
      verified: true
    },
    {
      id: 6,
      title: 'إعادة تأهيل الشعاب المرجانية',
      description: 'رمز يمثل إعادة تأهيل 10 متر مربع من الشعاب المرجانية',
      price: 180,
      currency: 'ريال',
      image: '🐠',
      category: 'ocean-cleanup',
      rating: 4.8,
      reviews: 45,
      likes: 38,
      isLiked: false,
      seller: 'مؤسسة الشعاب المرجانية',
      verified: true
    }
  ]

  const filteredItems = nftItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
      default:
        return b.id - a.id
    }
  })

  const toggleLike = (id) => {
    // This would normally update the state
    console.log('Toggle like for item:', id)
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700">
                <ArrowLeft className="h-4 w-4 ml-2" />
                العودة للصفحة الرئيسية
              </Link>
              <div className="flex items-center space-x-2">
                <Coins className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">سوق NFTs الكربون</span>
              </div>
            </div>
            <LanguageSwitcher 
              currentLanguage={currentLanguage} 
              onLanguageChange={setCurrentLanguage} 
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">اكتشف NFTs الكربون</h1>
            <p className="text-xl text-green-100 mb-8">
              تداول أصول الكربون الرقمية وادعم المشاريع البيئية المستدامة
            </p>
            
            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="ابحث عن NFTs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white text-gray-900"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48 bg-white text-gray-900">
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48 bg-white text-gray-900">
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">الأحدث</SelectItem>
                    <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
                    <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
                    <SelectItem value="rating">التقييم</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">1,234</div>
              <div className="text-gray-600">NFTs متاحة</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">567</div>
              <div className="text-gray-600">مشروع بيئي</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">89</div>
              <div className="text-gray-600">بائع معتمد</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">2.5M</div>
              <div className="text-gray-600">طن كربون معوض</div>
            </div>
          </div>
        </div>
      </div>

      {/* NFT Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-t-lg flex items-center justify-center text-6xl">
                    {item.image}
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/80 hover:bg-white"
                      onClick={() => toggleLike(item.id)}
                    >
                      <Heart className={`h-4 w-4 ${item.isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/80 hover:bg-white"
                    >
                      <Eye className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                  {item.verified && (
                    <Badge className="absolute top-4 left-4 bg-green-500">
                      ✓ معتمد
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-green-600">
                        {item.price} {item.currency}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{item.seller}</p>
                      <p className="text-xs text-gray-400">{item.reviews} تقييم</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <ShoppingCart className="h-4 w-4 ml-2" />
                      {isAuthenticated ? 'شراء الآن' : 'تسجيل الدخول للشراء'}
                    </Button>
                    <Button variant="outline" className="px-4">
                      عرض التفاصيل
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedItems.length === 0 && (
          <div className="text-center py-12">
            <Coins className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-600">جرب تغيير معايير البحث</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">ابدأ تداول NFTs الكربون اليوم</h2>
          <p className="text-xl text-green-100 mb-8">
            انضم إلى مجتمع المستثمرين البيئيين وادعم المشاريع المستدامة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                {isAuthenticated ? "لوحة التحكم" : "إنشاء حساب مجاني"}
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              تعلم المزيد
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketplacePage
