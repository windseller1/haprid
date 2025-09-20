import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Leaf, 
  Coins, 
  TrendingUp, 
  Wallet, 
  User, 
  Settings, 
  Bell, 
  BarChart3, 
  Calendar,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  EyeOff
} from 'lucide-react'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { getTranslation } from '../translations.js'

const UserDashboard = ({ currentLanguage, setCurrentLanguage, user, isAuthenticated }) => {
  const [showBalance, setShowBalance] = useState(true)

  const t = (key) => getTranslation(currentLanguage, key)

  // Mock data
  const walletData = {
    totalBalance: 12500,
    availableBalance: 11200,
    pendingBalance: 1300,
    currency: 'ريال'
  }

  const portfolioData = [
    {
      id: 1,
      name: 'شجرة الكربون الذكية',
      type: 'Carbon NFT',
      value: 1500,
      change: 12.5,
      changeType: 'positive',
      image: '🌳'
    },
    {
      id: 2,
      name: 'طاقة شمسية نظيفة',
      type: 'Renewable Energy',
      value: 2300,
      change: -3.2,
      changeType: 'negative',
      image: '☀️'
    },
    {
      id: 3,
      name: 'حفظ غابة الأمازون',
      type: 'Forest Conservation',
      value: 800,
      change: 8.7,
      changeType: 'positive',
      image: '🌲'
    }
  ]

  const recentTransactions = [
    {
      id: 1,
      type: 'purchase',
      description: 'شراء NFT شجرة الكربون',
      amount: -150,
      currency: 'ريال',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'sale',
      description: 'بيع NFT الطاقة الشمسية',
      amount: 200,
      currency: 'ريال',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'offset',
      description: 'تعويض الكربون الشخصي',
      amount: -75,
      currency: 'ريال',
      date: '2024-01-13',
      status: 'pending'
    }
  ]

  const achievements = [
    {
      id: 1,
      title: 'مستثمر بيئي مبتدئ',
      description: 'اشتريت أول NFT كربون',
      icon: '🌱',
      unlocked: true,
      date: '2024-01-10'
    },
    {
      id: 2,
      title: 'داعم الطاقة النظيفة',
      description: 'استثمرت في 5 مشاريع طاقة متجددة',
      icon: '⚡',
      unlocked: true,
      date: '2024-01-12'
    },
    {
      id: 3,
      title: 'حارس الغابات',
      description: 'ادعم 10 مشاريع حفظ الغابات',
      icon: '🌲',
      unlocked: false,
      progress: 7
    }
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Leaf className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">يجب تسجيل الدخول</h2>
            <p className="text-gray-600 mb-6">يجب تسجيل الدخول للوصول إلى لوحة التحكم</p>
            <div className="space-y-2">
              <Link to="/login">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="w-full">
                  إنشاء حساب جديد
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${currentLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Leaf className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">منصة الكربون الهجينة</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher 
                currentLanguage={currentLanguage} 
                onLanguageChange={setCurrentLanguage} 
              />
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Link to="/profile">
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مرحباً، {user?.name || 'المستخدم'}
          </h1>
          <p className="text-gray-600">إليك نظرة عامة على محفظتك واستثماراتك البيئية</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المحفظة</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {showBalance ? `${walletData.totalBalance.toLocaleString()} ${walletData.currency}` : '••••••'}
              </div>
              <p className="text-xs text-muted-foreground">+12.5% من الشهر الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الرصيد المتاح</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {showBalance ? `${walletData.availableBalance.toLocaleString()} ${walletData.currency}` : '••••••'}
              </div>
              <p className="text-xs text-muted-foreground">جاهز للاستخدام</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">قيمة المحفظة</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {showBalance ? `${portfolioData.reduce((sum, item) => sum + item.value, 0).toLocaleString()} ${walletData.currency}` : '••••••'}
              </div>
              <p className="text-xs text-muted-foreground">+8.2% من الشهر الماضي</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">NFTs المملوكة</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioData.length}</div>
              <p className="text-xs text-muted-foreground">أصول رقمية</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="portfolio">المحفظة</TabsTrigger>
            <TabsTrigger value="transactions">المعاملات</TabsTrigger>
            <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Portfolio Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>أداء المحفظة</CardTitle>
                  <CardDescription>تطور قيمة محفظتك خلال الشهر الماضي</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      <p className="text-gray-600">رسم بياني للمحفظة</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>النشاط الأخير</CardTitle>
                  <CardDescription>آخر المعاملات والأنشطة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            transaction.type === 'purchase' ? 'bg-red-500' : 
                            transaction.type === 'sale' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <p className="text-sm font-medium">{transaction.description}</p>
                            <p className="text-xs text-gray-500">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${
                            transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount} {transaction.currency}
                          </p>
                          <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                            {transaction.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">محفظة NFTs</h3>
                <p className="text-gray-600">أصولك الرقمية البيئية</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Link to="/marketplace">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 ml-2" />
                    شراء المزيد
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="text-4xl">{item.image}</div>
                      <Badge variant={item.changeType === 'positive' ? 'default' : 'secondary'}>
                        {item.changeType === 'positive' ? (
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 ml-1" />
                        )}
                        {Math.abs(item.change)}%
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">القيمة الحالية</span>
                        <span className="font-semibold">
                          {showBalance ? `${item.value.toLocaleString()} ${walletData.currency}` : '••••••'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">التغيير</span>
                        <span className={`text-sm ${item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                          {item.changeType === 'positive' ? '+' : ''}{item.change}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>سجل المعاملات</CardTitle>
                <CardDescription>جميع معاملاتك المالية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'purchase' ? 'bg-red-100' : 
                          transaction.type === 'sale' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          {transaction.type === 'purchase' ? <Coins className="h-5 w-5 text-red-600" /> :
                           transaction.type === 'sale' ? <TrendingUp className="h-5 w-5 text-green-600" /> :
                           <Target className="h-5 w-5 text-blue-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount} {transaction.currency}
                        </p>
                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                          {transaction.status === 'completed' ? 'مكتمل' : 'قيد المعالجة'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`${achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {achievement.unlocked ? (
                      <div className="space-y-2">
                        <Badge className="bg-green-500">مفتوح</Badge>
                        <p className="text-sm text-gray-600">تم إنجازه في {achievement.date}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Badge variant="secondary">قيد التقدم</Badge>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${(achievement.progress / 10) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600">{achievement.progress}/10</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UserDashboard
