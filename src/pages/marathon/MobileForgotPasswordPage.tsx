import { GalleryVerticalEnd } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import ForgotPasswordForm from "@/components/forgot-password-form"
import { forgotPassword } from '@/services/mobile/auth'
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    
    if (!email) {
      alert('请输入邮箱地址')
      return
    }

    try {
      const response = await forgotPassword(email)
      
      if (response.success) {
        setSubmittedEmail(email)
        setIsSubmitted(true)
      } else {
        alert(response.message || '发送失败，请重试')
      }
    } catch (error) {
      console.error('发送重置邮件错误:', error)
      alert('网络错误，请检查网络连接')
    }
  }

  // 重新发送邮件
  const handleResend = async () => {
    try {
      const response = await forgotPassword(submittedEmail)
      if (response.success) {
        alert('邮件已重新发送')
      }
    } catch (error) {
      alert('重新发送失败，请稍后重试')
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
            {isSubmitted ? (
              // 成功提交后的确认页面
              <div className="flex flex-col gap-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex size-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h1 className="text-2xl font-bold">邮件已发送</h1>
                  <p className="text-balance text-sm text-muted-foreground">
                    我们已向 <strong>{submittedEmail}</strong> 发送了重置密码的链接
                  </p>
                </div>
                <div className="grid gap-4">
                  <p className="text-sm text-muted-foreground">
                    请检查您的邮箱（包括垃圾邮件文件夹），点击邮件中的链接来重置您的密码。
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleResend}
                  >
                    重新发送邮件
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full" 
                    onClick={() => navigate('/mobile/login')}
                  >
                    返回登录
                  </Button>
                </div>
              </div>
            ) : (
              // 忘记密码表单
              <ForgotPasswordForm onSubmit={handleSubmit} />
            )}
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
