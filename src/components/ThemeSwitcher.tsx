import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTheme, themeColors } from '@/hooks/useTheme';
import { Palette, Moon, Sun, Check } from 'lucide-react';

const ThemeSwitcher: React.FC = () => {
  const { theme, themeColor, setTheme, setThemeColor, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {/* 明暗模式切换 */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="h-9 w-9"
      >
        {theme === 'light' ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>

      {/* 主题色切换 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Palette className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="px-3 py-2 text-sm font-medium border-b">
            选择主题色
          </div>
          
          <div className="grid grid-cols-1 gap-1 p-2">
            {themeColors.map((color) => (
              <DropdownMenuItem
                key={color.value}
                onClick={() => setThemeColor(color.value)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: color.color }}
                  />
                  <span>{color.name}</span>
                </div>
                {themeColor === color.value && (
                  <Check className="h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </div>
          
          <div className="border-t pt-2 pb-1">
            <div className="px-3 py-1 text-xs text-muted-foreground">
              类似 shadcn UI 官网的主题切换
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeSwitcher;
