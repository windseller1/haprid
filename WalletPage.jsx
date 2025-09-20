import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { 
  Leaf, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Minus, 
  Eye, 
  EyeOff, 
  CreditCard, 
  Banknote, 
  TrendingUp, 
  History, 
  QrCode,
  ArrowLeft,
  Copy,
  ExternalLink
} from 'lucide-react'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { getTranslation } from '../translations.js'

const WalletPage = ({ currentLanguage, setCurrentLanguage, user, isAuthenticated }) => {
  const [showBalance, setShowBalance] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const t = (key) => getTranslation(currentLanguage, key)

  // Mock wallet data
  const walletData = {
    totalBalance: 12500,
    availableBalance: 11200,
    pendingBalance: 1300,
    currency: 'ريال',
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5XQUxMRVQ8L3RleHQ+PC9zdmc+'
  }

  const transactions = [
    {
      id: 1,
      type: 'deposit',
      description: 'إيداع من البنك الأهلي',
      amount: 1000,
      currency: 'ريال',
      date: '2024-01-15',
      time: '14:30',
      status: 'completed',
      reference: 'TXN-001'
    },
    {
      id: 2,
      type: 'purchase',
      description: 'شراء NFT شجرة الكربون',
      amount: -150,
      currency: 'ريال',
      date: '2024-01-15',
      time: '12:15',
      status: 'completed',
      reference: 'TXN-002'
    },
    {
      id: 3,
      type: 'sale',
      description: 'بيع NFT الطاقة الشمسية',
      amount: 200,
      currency: 'ريال',
      date: '2024-01-14',
      time: '16:45',
      status: 'completed',
      reference: 'TXN-003'
    },
    {
      id: 4,
      type: 'withdrawal',
      description: 'سحب إلى البنك الراجحي',
      amount: -500,
      currency: 'ريال',
      date: '2024-01-14',
      time: '10:20',
      status: 'pending',
      reference: 'TXN-004'
    },
    {
      id: 5,
      type: 'offset',
      description: 'تعويض الكربون الشخصي',
      amount: -75,
      currency: 'ريال',
      date: '2024-01-13',
      time: '09:30',
      status: 'completed',
      reference: 'TXN-005'
    }
  ]

  const paymentMethods = [
    {
      id: 1,
      type: 'bank',
      name: 'البنك الأهلي السعودي',
      last4: '1234',
      expiry: null,
      isDefault: true
    },
    {
      id: 2,
      type: 'bank',
      name: 'بنك الراجحي',
      last4: '5678',
      expiry: null,
      isDefault: false
    },
    {
      id: 3,
      type: 'card',
      name: 'Visa',
      last4: '9876',
      expiry: '12/25',
      isDefault: false
    }
  ]

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit': return <ArrowDownRight className="h-5 w-5 text-green-600" />
      case 'withdrawal': return <ArrowUpRight className="h-5 w-5 text-red-600" />
      case 'purchase': return <Minus className="h-5 w-5 text-orange-600" />
      case 'sale': return <Plus className="h-5 w-5 text-blue-600" />
      case 'offset': return <Leaf className="h-5 w-5 text-green-600" />
      default: return <History className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">مكتمل</Badge>
      case 'pending':
        return <Badge variant="secondary">قيد المعالجة</Badge>
      case 'failed':
        return <Badge className="bg-red-500">فشل</Badge>
      default:
        return <Badge variant="outline">غير معروف</Badge>
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Leaf className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">يجب تسجيل الدخول</h2>
            <p className="text-gray-600 mb-6">يجب تسجيل الدخول للوصول إلى المحفظة</p>
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
              <Link to="/dashboard" className="inline-flex items-center text-green-600 hover:text-green-700">
                <ArrowLeft className="h-4 w-4 ml-2" />
                العودة للوحة التحكم
              </Link>
              <div className="flex items-center space-x-2">
                <Wallet className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">المحفظة</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher 
                currentLanguage={currentLanguage} 
                onLanguageChange={setCurrentLanguage} 
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">إجمالي الرصيد</p>
                  <p className="text-3xl font-bold">
                    {showBalance ? `${walletData.totalBalance.toLocaleString()} ${walletData.currency}` : '••••••'}
                  </p>
                </div>
                <Wallet className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">الرصيد المتاح</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {showBalance ? `${walletData.availableBalance.toLocaleString()} ${walletData.currency}` : '••••••'}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">قيد المعالجة</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {showBalance ? `${walletData.pendingBalance.toLocaleString()} ${walletData.currency}` : '••••••'}
                  </p>
                </div>
                <History className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>الإجراءات السريعة</CardTitle>
            <CardDescription>إدارة أموالك بسهولة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col space-y-2 bg-green-600 hover:bg-green-700">
                <ArrowDownRight className="h-6 w-6" />
                <span>إيداع</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <ArrowUpRight className="h-6 w-6" />
                <span>سحب</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <CreditCard className="h-6 w-6" />
                <span>تحويل</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <QrCode className="h-6 w-6" />
                <span>استقبال</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="transactions">المعاملات</TabsTrigger>
            <TabsTrigger value="payment-methods">طرق الدفع</TabsTrigger>
            <TabsTrigger value="wallet-info">معلومات المحفظة</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>المعاملات الأخيرة</CardTitle>
                  <CardDescription>آخر 5 معاملات</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getTransactionIcon(transaction.type)}
                          <div>
                            <p className="font-medium text-sm">{transaction.description}</p>
                            <p className="text-xs text-gray-500">{transaction.date} {transaction.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold text-sm ${
                            transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount} {transaction.currency}
                          </p>
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Wallet Address */}
              <Card>
                <CardHeader>
                  <CardTitle>عنوان المحفظة</CardTitle>
                  <CardDescription>شارك هذا العنوان لاستقبال الأموال</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <div className="flex items-center justify-between">
                        <code className="text-sm font-mono break-all">
                          {showBalance ? walletData.walletAddress : '••••••••••••••••••••••••••••••••'}
                        </code>
                        <Button size="sm" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                        <QrCode className="h-16 w-16 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">QR Code للمحفظة</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>سجل المعاملات</CardTitle>
                    <CardDescription>جميع معاملاتك المالية</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="فلترة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع المعاملات</SelectItem>
                        <SelectItem value="deposit">الإيداعات</SelectItem>
                        <SelectItem value="withdrawal">السحوبات</SelectItem>
                        <SelectItem value="purchase">المشتريات</SelectItem>
                        <SelectItem value="sale">المبيعات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'deposit' ? 'bg-green-100' : 
                          transaction.type === 'withdrawal' ? 'bg-red-100' : 
                          transaction.type === 'purchase' ? 'bg-orange-100' : 
                          transaction.type === 'sale' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.date} {transaction.time}</p>
                          <p className="text-xs text-gray-400">مرجع: {transaction.reference}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount} {transaction.currency}
                        </p>
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>طرق الدفع</CardTitle>
                    <CardDescription>إدارة طرق الدفع المرتبطة بحسابك</CardDescription>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة طريقة دفع
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                          {method.type === 'bank' ? (
                            <Banknote className="h-5 w-5 text-gray-600" />
                          ) : (
                            <CreditCard className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-gray-500">
                            {method.type === 'bank' ? 'حساب بنكي' : 'بطاقة ائتمان'} •••• {method.last4}
                            {method.expiry && ` • ${method.expiry}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <Badge className="bg-green-500">افتراضي</Badge>
                        )}
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wallet Info Tab */}
          <TabsContent value="wallet-info" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>معلومات المحفظة</CardTitle>
                  <CardDescription>تفاصيل محفظتك الرقمية</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>نوع المحفظة</Label>
                    <p className="text-sm text-gray-600">محفظة رقمية متعددة العملات</p>
                  </div>
                  <div className="space-y-2">
                    <Label>العملات المدعومة</Label>
                    <div className="flex space-x-2">
                      <Badge>ريال سعودي</Badge>
                      <Badge>دولار أمريكي</Badge>
                      <Badge>يورو</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>حالة المحفظة</Label>
                    <Badge className="bg-green-500">نشطة</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الأمان</CardTitle>
                  <CardDescription>إعدادات أمان محفظتك</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">المصادقة الثنائية</p>
                      <p className="text-sm text-gray-600">مفعلة</p>
                    </div>
                    <Badge className="bg-green-500">مفعل</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تشفير المحفظة</p>
                      <p className="text-sm text-gray-600">AES-256</p>
                    </div>
                    <Badge className="bg-green-500">مفعل</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">نسخ احتياطي</p>
                      <p className="text-sm text-gray-600">آخر نسخة: اليوم</p>
                    </div>
                    <Button variant="outline" size="sm">إنشاء نسخة</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default WalletPage
