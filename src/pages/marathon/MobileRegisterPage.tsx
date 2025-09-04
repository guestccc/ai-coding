import { GalleryVerticalEnd } from "lucide-react"
import { useNavigate } from 'react-router-dom'

import RegisterForm from "@/components/register-form"
import { register, login } from '@/services/mobile/auth'
import { RegisterRequest, LoginRequest } from '@/types/mobile/auth'

export default function RegisterPage() {
  const navigate = useNavigate()

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    
    if (!name || !email || !password || !confirmPassword) {
      alert('请填写所有必填字段')
      return
    }

    if (password !== confirmPassword) {
      alert('两次输入的密码不匹配')
      return
    }

    if (password.length < 6) {
      alert('密码长度至少6位')
      return
    }

    try {
      const registerData: RegisterRequest = {
        name,
        email,
        password,
        role: 'participant'
      }

      const registerResponse = await register(registerData)
      
      if (registerResponse.success) {
        // 注册成功，自动登录获取token
        try {
          const loginData: LoginRequest = {
            email,
            password
          }
          const loginResponse = await login(loginData)
          
          if (loginResponse.success && loginResponse.data) {
            // 保存用户信息和token到本地存储
            localStorage.setItem('token', loginResponse.data.token)
            localStorage.setItem('user', JSON.stringify(loginResponse.data.user))
            
            // 跳转到移动端首页
            navigate('/mobile')
          } else {
            alert('注册成功，但自动登录失败，请手动登录')
            navigate('/mobile/login')
          }
        } catch (loginError) {
          console.error('自动登录错误:', loginError)
          alert('注册成功，但自动登录失败，请手动登录')
          navigate('/mobile/login')
        }
      } else {
        alert(registerResponse.message || '注册失败，请重试')
      }
    } catch (error) {
      console.error('注册错误:', error)
      alert('网络错误，请检查网络连接')
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            AI学习助手
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
