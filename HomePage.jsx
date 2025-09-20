import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Leaf, Coins, TrendingUp, Shield, Users, Zap, ArrowRight, Play, Star, Settings, User, LogOut } from 'lucide-react'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { getTranslation } from '../translations.js'

const HomePage = ({ currentLanguage, setCurrentLanguage, isAuthenticated, user, setIsAuthenticated, setUser }) => {
  const t = (key) => getTranslation(currentLanguage, key)

  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: t('carbonOffsetTitle'),
      description: t('carbonOffsetDesc')
    },
    {
      icon: <Coins className="h-8 w-8 text-blue-600" />,
      title: t('nftTitle'),
      description: t('nftDesc')
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: t('marketplaceTitle'),
      description: t('marketplaceDesc')
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-600" />,
      title: t('securityTitle'),
      description: t('securityDesc')
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: t('communityTitle'),
      description: t('communityDesc')
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: t('aiTitle'),
      description: t('aiDesc')
    }
  ]

  const stats = [
    { number: "1M+", label: t('carbonOffset') },
    { number: "50K+", label: t('activeUsers') },
    { number: "100+", label: t('projects') },
    { number: "25+", label: t('countries') }
  ]

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Leaf className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">{t('platformName')}</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors">{t('home')}</a>
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">{t('features')}</a>
              <a href="#marketplace" className="text-gray-700 hover:text-green-600 transition-colors">{t('marketplace')}</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">{t('about')}</a>
              <LanguageSwitcher 
                currentLanguage={currentLanguage} 
                onLanguageChange={setCurrentLanguage} 
              />
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-green-600 transition-colors">
                    لوحة التحكم
                  </Link>
                  <Link to="/wallet" className="text-gray-700 hover:text-green-600 transition-colors">
                    المحفظة
                  </Link>
                  <Link to="/profile" className="text-gray-700 hover:text-green-600 transition-colors">
                    الملف الشخصي
                  </Link>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    تسجيل الخروج
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                      {t('login')}
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-green-600 hover:bg-green-700">
                      {t('getStarted')}
                    </Button>
                  </Link>
                </>
              )}
              <Link to="/admin">
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                  <Settings className="h-4 w-4 mr-2" />
                  {t('adminPanel')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  {t('platformBadge')}
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {t('heroTitle')}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {t('heroSubtitle')}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
                    {t('startJourney')}
                    <ArrowRight className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-gray-300 text-lg px-8 py-4">
                  <Play className="ml-2 h-5 w-5" />
                  {t('watchDemo')}
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="w-full h-96 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <Leaf className="h-24 w-24 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">منصة الكربون الهجينة</h3>
                    <p className="text-lg opacity-90">مستقبل الاستدامة البيئية</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-blue-100 text-blue-800">{t('mainFeatures')}</Badge>
            <h2 className="text-4xl font-bold text-gray-900">
              {t('whyChooseUs')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('featuresDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* NFT Marketplace Preview */}
      <section id="marketplace" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-purple-100 text-purple-800">السوق الرقمي</Badge>
              <h2 className="text-4xl font-bold text-gray-900">
                تداول أصول الكربون كـ NFTs
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                اكتشف عالماً جديداً من تداول أصول الكربون من خلال الرموز غير القابلة للاستبدال. كل رمز يمثل كمية محددة من الكربون المعوض ومدعوم بمشاريع بيئية حقيقية.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">شفافية كاملة في المعاملات</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">مشاريع معتمدة دولياً</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">عوائد استثمارية مستدامة</span>
                </div>
              </div>

              <Link to="/marketplace">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  استكشف السوق
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <Coins className="h-24 w-24 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">NFTs الكربون</h3>
                  <p className="text-lg opacity-90">تداول آمن وشفاف</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">
            ابدأ رحلتك نحو مستقبل أكثر استدامة
          </h2>
          <p className="text-xl text-green-100 leading-relaxed">
            انضم إلى آلاف المستخدمين الذين يساهمون في حماية البيئة وتحقيق عوائد مالية مستدامة
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4">
                {isAuthenticated ? "لوحة التحكم" : "إنشاء حساب مجاني"}
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-4">
              تعلم المزيد
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Leaf className="h-8 w-8 text-green-500" />
                <span className="text-xl font-bold">منصة الكربون الهجينة</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                نقود التحول نحو اقتصاد الكربون المستدام من خلال التكنولوجيا المتقدمة والابتكار.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">المنتجات</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/marketplace" className="hover:text-white transition-colors">تعويض الكربون</Link></li>
                <li><Link to="/marketplace" className="hover:text-white transition-colors">NFTs الكربون</Link></li>
                <li><Link to="/marketplace" className="hover:text-white transition-colors">السوق الرقمي</Link></li>
                <li><Link to="/marketplace" className="hover:text-white transition-colors">الذكاء الاصطناعي</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">الشركة</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">حولنا</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">الفريق</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">الوظائف</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">الأخبار</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">الدعم</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">التوثيق</a></li>
                <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الحالة</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 منصة الكربون الهجينة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
