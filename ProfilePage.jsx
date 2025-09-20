import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Leaf, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Award, 
  Settings, 
  Camera,
  ArrowLeft,
  Edit,
  Save,
  X
} from 'lucide-react'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { getTranslation } from '../translations.js'

const ProfilePage = ({ currentLanguage, setCurrentLanguage, user, isAuthenticated }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: 'الرياض، المملكة العربية السعودية',
    bio: 'مستثمر بيئي ملتزم بالاستدامة وحماية البيئة',
    joinDate: '2024-01-01',
    verified: true
  })

  const t = (key) => getTranslation(currentLanguage, key)

  const handleSave = () => {
    // Here you would typically save the profile data
    setIsEditing(false)
    console.log('Profile saved:', profileData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original data
    setProfileData({
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: 'الرياض، المملكة العربية السعودية',
      bio: 'مستثمر بيئي ملتزم بالاستدامة وحماية البيئة',
      joinDate: '2024-01-01',
      verified: true
    })
  }

  const stats = [
    { label: 'NFTs المملوكة', value: '12', icon: '🌳' },
    { label: 'المعاملات', value: '45', icon: '💳' },
    { label: 'الكربون المعوض', value: '2.5 طن', icon: '🌱' },
    { label: 'النقاط', value: '1,250', icon: '⭐' }
  ]

  const achievements = [
    {
      id: 1,
      title: 'مستثمر بيئي مبتدئ',
      description: 'اشتريت أول NFT كربون',
      icon: '🌱',
      date: '2024-01-10',
      unlocked: true
    },
    {
      id: 2,
      title: 'داعم الطاقة النظيفة',
      description: 'استثمرت في 5 مشاريع طاقة متجددة',
      icon: '⚡',
      date: '2024-01-12',
      unlocked: true
    },
    {
      id: 3,
      title: 'حارس الغابات',
      description: 'ادعم 10 مشاريع حفظ الغابات',
      icon: '🌲',
      date: null,
      unlocked: false,
      progress: 7
    },
    {
      id: 4,
      title: 'بطل المحيطات',
      description: 'ادعم 5 مشاريع تنظيف المحيطات',
      icon: '🌊',
      date: null,
      unlocked: false,
      progress: 2
    }
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Leaf className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">يجب تسجيل الدخول</h2>
            <p className="text-gray-600 mb-6">يجب تسجيل الدخول للوصول إلى الملف الشخصي</p>
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
                <Leaf className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">الملف الشخصي</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher 
                currentLanguage={currentLanguage} 
                onLanguageChange={setCurrentLanguage} 
              />
              <Button variant="outline" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-4xl text-white">
                  {profileData.firstName.charAt(0)}
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  variant="outline"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  {profileData.verified && (
                    <Badge className="bg-green-500">
                      <Shield className="h-3 w-3 ml-1" />
                      معتمد
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{profileData.bio}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>انضم في {profileData.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 ml-2" />
                      حفظ
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4 ml-2" />
                      إلغاء
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit className="h-4 w-4 ml-2" />
                    تعديل
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">المعلومات الشخصية</TabsTrigger>
            <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الشخصية</CardTitle>
                <CardDescription>إدارة معلوماتك الشخصية وبيانات الاتصال</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">الاسم الأول</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">الاسم الأخير</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">الموقع</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">نبذة شخصية</Label>
                  <textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>الإنجازات</CardTitle>
                <CardDescription>إنجازاتك في المنصة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-6 rounded-lg border-2 ${
                        achievement.unlocked 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {achievement.title}
                          </h3>
                          <p className="text-gray-600 mb-3">{achievement.description}</p>
                          {achievement.unlocked ? (
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-green-500">
                                <Award className="h-3 w-3 ml-1" />
                                مفتوح
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {achievement.date}
                              </span>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Badge variant="secondary">قيد التقدم</Badge>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                                  style={{ width: `${(achievement.progress / 10) * 100}%` }}
                                ></div>
                              </div>
                              <p className="text-sm text-gray-600">
                                {achievement.progress}/10
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الحساب</CardTitle>
                <CardDescription>إدارة إعدادات حسابك وأمانه</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">التنبيهات الإلكترونية</h3>
                      <p className="text-sm text-gray-600">تلقي إشعارات عبر البريد الإلكتروني</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-green-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">التنبيهات النصية</h3>
                      <p className="text-sm text-gray-600">تلقي إشعارات عبر الرسائل النصية</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 text-green-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">الخصوصية العامة</h3>
                      <p className="text-sm text-gray-600">إظهار ملفك الشخصي للآخرين</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-green-600" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-4">تغيير كلمة المرور</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">
                      تغيير كلمة المرور
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfilePage
