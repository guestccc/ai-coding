import { GalleryVerticalEnd } from "lucide-react"
import { useNavigate } from 'react-router-dom'

import LoginForm from "@/components/login-form"
import { login } from '@/services/mobile/auth'
import { LoginRequest } from '@/types/mobile/auth'

export default function LoginPage() {
  const navigate = useNavigate()

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    if (!email || !password) {
      alert('请填写邮箱和密码')
      return
    }

    try {
      const loginData: LoginRequest = {
        email,
        password,
        rememberMe: true
      }

      const response = await login(loginData)
      
      if (response.success && response.data) {
        // 保存用户信息到本地存储
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        // 跳转到移动端首页
        navigate('/mobile')
      } else {
        alert(response.message || '登录失败，请重试')
      }
    } catch (error) {
      console.error('登录错误:', error)
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
            <LoginForm onSubmit={handleSubmit} />
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
