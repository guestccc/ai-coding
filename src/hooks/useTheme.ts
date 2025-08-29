import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';
export type ThemeColor = 
  | 'default'
  | 'slate' 
  | 'stone'
  | 'gray'
  | 'neutral'
  | 'red'
  | 'rose'
  | 'orange'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'violet';

export interface ThemeConfig {
  theme: Theme;
  themeColor: ThemeColor;
}

const STORAGE_KEY = 'app-theme';

export function useTheme() {
  const [config, setConfig] = useState<ThemeConfig>(() => {
    // 从 localStorage 读取保存的主题配置
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // 如果解析失败，使用默认值
        }
      }
    }
    
    // 默认配置
    return {
      theme: 'light' as Theme,
      themeColor: 'default' as ThemeColor,
    };
  });

  useEffect(() => {
    // 保存到 localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    
    // 应用主题到 document
    const root = window.document.documentElement;
    
    // 移除之前的主题类
    root.classList.remove('light', 'dark');
    root.removeAttribute('data-theme');
    
    // 应用新的主题
    root.classList.add(config.theme);
    root.setAttribute('data-theme', config.themeColor);
  }, [config]);

  const setTheme = (theme: Theme) => {
    setConfig(prev => ({ ...prev, theme }));
  };

  const setThemeColor = (themeColor: ThemeColor) => {
    setConfig(prev => ({ ...prev, themeColor }));
  };

  const toggleTheme = () => {
    setTheme(config.theme === 'light' ? 'dark' : 'light');
  };

  return {
    ...config,
    setTheme,
    setThemeColor,
    toggleTheme,
  };
}

// 主题色配置数据
export const themeColors: { name: string; value: ThemeColor; color: string }[] = [
  { name: '默认', value: 'default', color: 'hsl(221.2 83.2% 53.3%)' },
  { name: '石板', value: 'slate', color: 'hsl(215.4 16.3% 46.9%)' },
  { name: '石色', value: 'stone', color: 'hsl(25 5.3% 44.7%)' },
  { name: '灰色', value: 'gray', color: 'hsl(220 8.9% 46.1%)' },
  { name: '中性', value: 'neutral', color: 'hsl(0 0% 45.1%)' },
  { name: '红色', value: 'red', color: 'hsl(0 72.2% 50.6%)' },
  { name: '玫瑰', value: 'rose', color: 'hsl(346.8 77.2% 49.8%)' },
  { name: '橙色', value: 'orange', color: 'hsl(24.6 95% 53.1%)' },
  { name: '绿色', value: 'green', color: 'hsl(142.1 76.2% 36.3%)' },
  { name: '蓝色', value: 'blue', color: 'hsl(221.2 83.2% 53.3%)' },
  { name: '黄色', value: 'yellow', color: 'hsl(47.9 95.8% 53.1%)' },
  { name: '紫色', value: 'violet', color: 'hsl(262.1 83.3% 57.8%)' },
];
