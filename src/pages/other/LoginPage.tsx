import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useForm } from '../../hooks/useForm';
import { Eye, EyeOff, Loader2, Github, Mail, Lock, User } from 'lucide-react';

interface LoginFormData {
  username: string;
  password: string;
}

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 登录表单
  const loginForm = useForm<LoginFormData>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.username.trim()) {
        errors.username = '请输入用户名';
      }
      if (!values.password) {
        errors.password = '请输入密码';
      } else if (values.password.length < 6) {
        errors.password = '密码至少需要6位';
      }
      return errors;
    },
  });

  // 注册表单
  const registerForm = useForm<RegisterFormData>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.username.trim()) {
        errors.username = '请输入用户名';
      } else if (values.username.length < 3) {
        errors.username = '用户名至少需要3位';
      }
      
      if (!values.email.trim()) {
        errors.email = '请输入邮箱';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = '请输入有效的邮箱地址';
      }
      
      if (!values.password) {
        errors.password = '请输入密码';
      } else if (values.password.length < 6) {
        errors.password = '密码至少需要6位';
      }
      
      if (!values.confirmPassword) {
        errors.confirmPassword = '请确认密码';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = '两次输入的密码不一致';
      }
      
      return errors;
    },
  });

  const handleLogin = async () => {
    await loginForm.handleSubmit(async (values) => {
      // 模拟登录 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟登录成功
      if (values.username === 'admin' && values.password === '123456') {
        alert('登录成功！');
        navigate('/');
      } else {
        alert('用户名或密码错误');
      }
    });
  };

  const handleRegister = async () => {
    await registerForm.handleSubmit(async (values) => {
      // 模拟注册 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('注册成功！请登录');
      setActiveTab('login');
      registerForm.reset();
    });
  };

  const handleThirdPartyLogin = (provider: 'github' | 'google') => {
    alert(`${provider} 登录功能暂未实现`);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              {activeTab === 'login' ? '欢迎回来' : '创建账号'}
            </CardTitle>
            <CardDescription>
              {activeTab === 'login' 
                ? '登录您的账号继续使用' 
                : '填写信息创建新账号'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Tab 切换 */}
            <div className="grid w-full grid-cols-2 rounded-lg bg-muted p-1">
              <Button
                variant={activeTab === 'login' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('login')}
              >
                <Lock className="mr-2 h-4 w-4" />
                登录
              </Button>
              <Button
                variant={activeTab === 'register' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('register')}
              >
                <User className="mr-2 h-4 w-4" />
                注册
              </Button>
            </div>

            {/* 登录表单 */}
            {activeTab === 'login' && (
              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="login-username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    用户名
                  </label>
                  <Input
                    id="login-username"
                    type="text"
                    value={loginForm.values.username}
                    onChange={(e) => loginForm.handleChange('username', e.target.value)}
                    placeholder="请输入用户名"
                    className={loginForm.errors.username ? 'border-destructive' : ''}
                  />
                  {loginForm.errors.username && (
                    <p className="text-sm text-destructive">{loginForm.errors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="login-password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    密码
                  </label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={loginForm.values.password}
                      onChange={(e) => loginForm.handleChange('password', e.target.value)}
                      placeholder="请输入密码"
                      className={loginForm.errors.password ? 'border-destructive' : ''}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {loginForm.errors.password && (
                    <p className="text-sm text-destructive">{loginForm.errors.password}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={loginForm.isSubmitting}>
                  {loginForm.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loginForm.isSubmitting ? '登录中...' : '登录'}
                </Button>
              </form>
            )}

            {/* 注册表单 */}
            {activeTab === 'register' && (
              <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="register-username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    用户名
                  </label>
                  <Input
                    id="register-username"
                    type="text"
                    value={registerForm.values.username}
                    onChange={(e) => registerForm.handleChange('username', e.target.value)}
                    placeholder="请输入用户名"
                    className={registerForm.errors.username ? 'border-destructive' : ''}
                  />
                  {registerForm.errors.username && (
                    <p className="text-sm text-destructive">{registerForm.errors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="register-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    邮箱
                  </label>
                  <Input
                    id="register-email"
                    type="email"
                    value={registerForm.values.email}
                    onChange={(e) => registerForm.handleChange('email', e.target.value)}
                    placeholder="请输入邮箱"
                    className={registerForm.errors.email ? 'border-destructive' : ''}
                  />
                  {registerForm.errors.email && (
                    <p className="text-sm text-destructive">{registerForm.errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="register-password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    密码
                  </label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      value={registerForm.values.password}
                      onChange={(e) => registerForm.handleChange('password', e.target.value)}
                      placeholder="请输入密码"
                      className={registerForm.errors.password ? 'border-destructive' : ''}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {registerForm.errors.password && (
                    <p className="text-sm text-destructive">{registerForm.errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="register-confirm-password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    确认密码
                  </label>
                  <div className="relative">
                    <Input
                      id="register-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={registerForm.values.confirmPassword}
                      onChange={(e) => registerForm.handleChange('confirmPassword', e.target.value)}
                      placeholder="请再次输入密码"
                      className={registerForm.errors.confirmPassword ? 'border-destructive' : ''}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {registerForm.errors.confirmPassword && (
                    <p className="text-sm text-destructive">{registerForm.errors.confirmPassword}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={registerForm.isSubmitting}>
                  {registerForm.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {registerForm.isSubmitting ? '注册中...' : '注册'}
                </Button>
              </form>
            )}

            {/* 第三方登录 */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">或</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleThirdPartyLogin('github')}
                  disabled={loginForm.isSubmitting || registerForm.isSubmitting}
                  className="w-full"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleThirdPartyLogin('google')}
                  disabled={loginForm.isSubmitting || registerForm.isSubmitting}
                  className="w-full"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </div>

            {/* 演示账号提示 */}
            <div className="text-center">
              <Badge variant="secondary" className="text-xs">
                💡 演示账号: admin / 123456
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
