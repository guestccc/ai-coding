import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  File, 
  Video, 
  Link, 
  BookOpen,
  Clock,
  Check,
  X,
  Eye,
  RotateCcw,
  Save,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  getProjects,
  updateProject
} from '@/services/mobile/project';
import {
  getTeams
} from '@/services/mobile/team';
import {
  Project,
  UpdateProjectRequest
} from '@/types/mobile/project';
import {
  Team,
  TeamMember
} from '@/types/mobile/team';
import MobileLayout from '@/components/mobile/MobileLayout';

// 页面状态接口
interface ProjectPageState {
  team: Team | null;
  project: Project | null;
  isLoading: boolean;
  isSaving: boolean;
  isUploading: boolean;
  error: string | null;
  uploadProgress: number;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
  };
}

const MobileProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 倒计时计算
  const getTimeRemaining = () => {
    const now = new Date();
    const deadline = new Date('2024-01-15T23:59:59');
    const diff = deadline.getTime() - now.getTime();
    
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };

  const [state, setState] = useState<ProjectPageState>({
    team: null,
    project: null,
    isLoading: true,
    isSaving: false,
    isUploading: false,
    error: null,
    uploadProgress: 0,
    timeRemaining: getTimeRemaining()
  });

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const [teamResponse, projectResponse] = await Promise.all([
          getTeams({ limit: 1 }), // 获取用户的团队
          getProjects({ limit: 1 }) // 获取用户的项目
        ]);

        setState(prev => ({
          ...prev,
          isLoading: false,
          team: teamResponse.success && teamResponse.data?.length ? teamResponse.data[0] : null,
          project: projectResponse.success && projectResponse.data?.length ? projectResponse.data[0] : null,
          error: !teamResponse.success ? (typeof teamResponse.error === 'string' ? teamResponse.error : '获取团队信息失败') : 
                 !projectResponse.success ? (typeof projectResponse.error === 'string' ? projectResponse.error : '获取项目信息失败') : null
        }));
      } catch (error) {
        console.error('加载数据失败:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: '加载数据失败，请重试'
        }));
      }
    };

    loadData();
  }, []);

  // 倒计时更新
  useEffect(() => {
    const timer = setInterval(() => {
      setState(prev => ({ ...prev, timeRemaining: getTimeRemaining() }));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // 保存项目
  const handleSave = async () => {
    if (!state.project) return;

    setState(prev => ({ ...prev, isSaving: true, error: null }));
    
    try {
      const updateData: UpdateProjectRequest = {
        title: state.project.title,
        description: state.project.description,
        techStack: state.project.techStack || [],
        experienceUrl: state.project.experienceUrl,
        category: state.project.category
      };

      const response = await updateProject(state.project.id, updateData);
      
      if (response.success) {
        setState(prev => ({
          ...prev,
          isSaving: false,
          project: response.data!
        }));
        // 可以显示成功提示
      } else {
        setState(prev => ({
          ...prev,
          isSaving: false,
          error: typeof response.error === 'string' ? response.error : '保存失败'
        }));
      }
    } catch (error) {
      console.error('保存失败:', error);
      setState(prev => ({
        ...prev,
        isSaving: false,
        error: '保存失败，请重试'
      }));
    }
  };

  // 文件上传处理（模拟）
  const handleFileUpload = async (file: File, type: 'source' | 'video' | 'document') => {
    if (!state.project) return;

    setState(prev => ({ ...prev, isUploading: true, uploadProgress: 0 }));
    
    try {
      // 模拟文件上传进度
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setState(prev => ({ ...prev, uploadProgress: i }));
      }
      
      setState(prev => ({
        ...prev,
        isUploading: false,
        uploadProgress: 100
      }));
    } catch (error) {
      console.error('文件上传失败:', error);
      setState(prev => ({
        ...prev,
        isUploading: false,
        error: '文件上传失败，请重试'
      }));
    }
  };

  // 加载状态
  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">加载作品信息...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (state.error && !state.team && !state.project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">{state.error}</p>
          <Button onClick={() => window.location.reload()}>重新加载</Button>
        </div>
      </div>
    );
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <header className="sticky top-0 z-100 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => navigate('/mobile')}
              variant="ghost"
              size="sm"
              className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 text-gray-600" />
            </Button>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <File className="h-4 w-4 text-green-600" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">作品管理</h1>
          </div>
          <Badge className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
            可编辑
          </Badge>
        </div>
        
        {/* 时间提醒栏 */}
        <div className="px-4 py-2 bg-orange-50 border-b border-orange-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-orange-700">
              <Clock className="w-4 h-4 mr-2" />
              <span>提交截止时间</span>
            </div>
            <span className="font-mono text-sm text-orange-800 font-medium">
              {state.timeRemaining.days}天{state.timeRemaining.hours}时{state.timeRemaining.minutes}分
            </span>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="flex-1 px-4 py-6">
        {/* 队伍信息卡 */}
        <Card className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">AI</span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{state.team?.name || '我的团队'}</h2>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">{state.team?.description || '暂无团队描述'}</p>
              <div className="flex flex-wrap gap-2">
                {(state.team?.members || []).map((member: TeamMember, index: number) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {member.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{state.team?.members?.length || 0}</div>
              <div className="text-sm text-gray-600">成员数量</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{state.project?.version || 1}</div>
              <div className="text-sm text-gray-600">作品版本</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {state.project?.status === 'submitted' ? '100%' : '草稿'}
              </div>
              <div className="text-sm text-gray-600">提交状态</div>
            </div>
          </div>
        </Card>

        {/* 作品上传区 */}
        <Card className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">作品材料</h3>
            <Badge className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded">
              版本 {state.project?.version || 1}
            </Badge>
          </div>
          
          <div className="space-y-4">
            {/* 源代码上传项 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <File className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">源代码文件</div>
                    <span className="text-xs text-red-500">必需</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">已上传</div>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <div className="text-sm font-medium text-gray-900 mb-1">拖拽文件到此处或</div>
                <div className="text-xs text-gray-500 mb-4">支持 .zip, .rar, .tar.gz 格式</div>
                <Button className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 hover:shadow-md active:bg-blue-700 active:scale-95 transition-all">
                  选择文件
                </Button>
                <div className="text-xs text-gray-400 mt-2">文件大小限制: 100MB</div>
              </div>
            </div>
            
            {/* 演示视频上传项 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Video className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">演示视频</div>
                    <span className="text-xs text-orange-500">推荐</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">未上传</div>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Video className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <div className="text-sm font-medium text-gray-900 mb-1">上传演示视频</div>
                <div className="text-xs text-gray-500 mb-4">支持 .mp4, .mov, .avi 格式</div>
                <Button className="px-6 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 hover:shadow-md active:bg-purple-700 active:scale-95 transition-all">
                  选择视频
                </Button>
                <div className="text-xs text-gray-400 mt-2">文件大小限制: 500MB</div>
              </div>
            </div>
            
            {/* 体验链接设置项 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Link className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">体验链接</div>
                    <span className="text-xs text-green-500">推荐</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">已验证</div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">链接地址</label>
                <Input
                  type="url"
                  value={state.project?.experienceUrl || ''}
                  onChange={(e) => setState(prev => ({
                    ...prev,
                    project: prev.project ? {
                      ...prev.project,
                      experienceUrl: e.target.value
                    } : null
                  }))}
                  className="w-full px-4 py-3 border border-green-300 rounded-lg text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  placeholder="https://example.com/demo"
                />
                <Button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200">
                  验证链接
                </Button>
                
                <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-full aspect-video bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-gray-500">链接预览</span>
                  </div>
                  <div className="text-sm text-gray-600">链接有效，可正常访问</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* 作品信息编辑区 */}
        <Card className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">作品标题</label>
              <Input
                type="text"
                value={state.project?.title || ''}
                onChange={(e) => setState(prev => ({
                  ...prev,
                  project: prev.project ? {
                    ...prev.project,
                    title: e.target.value
                  } : null
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="请输入作品标题"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">作品描述</label>
              <Textarea
                value={state.project?.description || ''}
                onChange={(e) => setState(prev => ({
                  ...prev,
                  project: prev.project ? {
                    ...prev.project,
                    description: e.target.value
                  } : null
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none h-32"
                placeholder="请详细描述您的作品功能、特点和技术实现..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">技术栈</label>
              <div className="flex flex-wrap gap-2">
                {(state.project?.techStack || []).map((tech: string, index: number) => (
                  <Badge key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center space-x-1">
                    <span>{tech}</span>
                    <button
                      onClick={() => setState(prev => ({
                        ...prev,
                        project: prev.project ? {
                          ...prev.project,
                          techStack: (prev.project.techStack || []).filter((_, i) => i !== index)
                        } : null
                      }))}
                      className="w-4 h-4 text-blue-500 hover:text-blue-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <button className="px-3 py-1 border border-gray-300 text-gray-600 text-sm rounded-full hover:bg-gray-50 active:bg-gray-100">
                  + 添加技术
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">团队介绍</label>
              <Textarea
                value={state.team?.description || ''}
                onChange={(e) => setState(prev => ({
                  ...prev,
                  team: prev.team ? {
                    ...prev.team,
                    description: e.target.value
                  } : null
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none h-24"
                placeholder="介绍您的团队背景、专长和合作优势..."
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200"
            >
              保存草稿
            </Button>
            <Button
              onClick={handleSave}
              disabled={state.isSaving}
              className="px-6 py-2 text-white bg-green-500 rounded-lg text-sm font-medium hover:bg-green-600 hover:shadow-md disabled:bg-green-400 disabled:cursor-not-allowed transition-all"
            >
              {state.isSaving ? '保存中...' : '正式保存'}
            </Button>
          </div>
        </Card>
        
        {/* 版本历史区 */}
        <Card className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">版本历史</h3>
            <Badge className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
              {state.project?.version || 1} 个版本
            </Badge>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-auto">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">v{state.project?.version || 1}.0</span>
                  <Badge className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                    当前版本
                  </Badge>
                </div>
                <div className="text-xs text-gray-500">
                  {state.project?.updatedAt ? new Date(state.project.updatedAt).toLocaleString() : '暂无更新时间'}
                </div>
                <div className="text-xs text-gray-600 mt-1">更新作品描述和技术栈</div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 text-xs rounded transition-colors">
                  查看
                </button>
                <button className="px-3 py-1 text-green-600 hover:bg-green-50 text-xs rounded transition-colors">
                  恢复
                </button>
              </div>
            </div>
            
            {[...Array(Math.max((state.project?.version || 1) - 1, 0))].map((_, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">v{(state.project?.version || 1) - index - 1}.0</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {state.project?.updatedAt ? 
                      new Date(new Date(state.project.updatedAt).getTime() - (index + 1) * 24 * 60 * 60 * 1000).toLocaleString() :
                      '暂无时间'
                    }
                  </div>
                  <div className="text-xs text-gray-600 mt-1">版本 {(state.project?.version || 1) - index - 1} 的更新内容</div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 text-xs rounded transition-colors">
                    查看
                  </button>
                  <button className="px-3 py-1 text-green-600 hover:bg-green-50 text-xs rounded transition-colors">
                    恢复
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* 底部操作区 */}
      <footer className="fixed bottom-20 w-full bg-white border-t shadow-lg safe-area-pb">
        <div className="flex space-x-4 p-4">
          <Button
            onClick={() => navigate('/mobile/projects/preview')}
            className="flex-1 py-3 bg-blue-100 text-blue-600 rounded-lg font-medium text-center hover:bg-blue-200 active:bg-blue-300 active:scale-95 transition-all"
          >
            <Eye className="h-4 w-4 mr-2" />
            预览
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={state.isSaving}
            className="flex-1 py-3 bg-green-500 text-white rounded-lg font-medium text-center hover:bg-green-600 hover:shadow-md active:bg-green-700 active:scale-95 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {state.isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                提交中...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                提交作品
              </>
            )}
          </Button>
        </div>
        <div className="pb-safe"></div>
      </footer>
      </div>
    </MobileLayout>
  );
};

export default MobileProjectsPage;
