import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const RootPanel = () => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.random() * 100);
      setRamUsage(Math.random() * 100);
      setTemperature(45 + Math.random() * 40);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTempColor = (temp: number) => {
    if (temp < 60) return 'text-accent';
    if (temp < 75) return 'text-yellow-500';
    return 'text-destructive';
  };

  const getTempBg = (temp: number) => {
    if (temp < 60) return 'from-accent/20 to-accent/5';
    if (temp < 75) return 'from-yellow-500/20 to-yellow-500/5';
    return 'from-destructive/20 to-destructive/5';
  };

  const getStatusBadge = (value: number) => {
    if (value < 50) return { text: 'Нормально', color: 'bg-accent/20 text-accent border-accent/30' };
    if (value < 80) return { text: 'Нагрузка', color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' };
    return { text: 'Перегрев', color: 'bg-destructive/20 text-destructive border-destructive/30' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-destructive/5 p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-destructive to-destructive/60 flex items-center justify-center animate-pulse">
            <Icon name="Shield" size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-destructive">ROOT ACCESS</h1>
            <p className="text-muted-foreground">Системный мониторинг</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6 border-destructive/20 bg-gradient-to-br from-card to-destructive/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Icon name="Cpu" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Процессор</h3>
                  <p className="text-sm text-muted-foreground">CPU Usage</p>
                </div>
              </div>
              <Badge className={getStatusBadge(cpuUsage).color}>
                {getStatusBadge(cpuUsage).text}
              </Badge>
            </div>

            <div className="mb-3">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Загрузка</span>
                <span className="text-2xl font-bold text-primary">{cpuUsage.toFixed(1)}%</span>
              </div>
              <Progress 
                value={cpuUsage} 
                className="h-3"
                indicatorClassName={cpuUsage > 80 ? 'bg-destructive' : cpuUsage > 50 ? 'bg-yellow-500' : 'bg-primary'}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground">Ядра</p>
                <p className="text-lg font-semibold">8 / 8</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Частота</p>
                <p className="text-lg font-semibold">3.6 GHz</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-secondary/20 bg-gradient-to-br from-card to-secondary/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Icon name="MemoryStick" size={24} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Память</h3>
                  <p className="text-sm text-muted-foreground">RAM Usage</p>
                </div>
              </div>
              <Badge className={getStatusBadge(ramUsage).color}>
                {getStatusBadge(ramUsage).text}
              </Badge>
            </div>

            <div className="mb-3">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Использовано</span>
                <span className="text-2xl font-bold text-secondary">{ramUsage.toFixed(1)}%</span>
              </div>
              <Progress 
                value={ramUsage} 
                className="h-3"
                indicatorClassName={ramUsage > 80 ? 'bg-destructive' : ramUsage > 50 ? 'bg-yellow-500' : 'bg-secondary'}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground">Всего</p>
                <p className="text-lg font-semibold">32 GB</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Доступно</p>
                <p className="text-lg font-semibold">{(32 * (100 - ramUsage) / 100).toFixed(1)} GB</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className={`p-8 border-2 bg-gradient-to-br ${getTempBg(temperature)} ${temperature > 75 ? 'border-destructive/50 animate-pulse' : temperature > 60 ? 'border-yellow-500/50' : 'border-accent/50'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${temperature > 75 ? 'from-destructive to-destructive/60' : temperature > 60 ? 'from-yellow-500 to-yellow-500/60' : 'from-accent to-accent/60'} flex items-center justify-center ${temperature > 75 ? 'animate-pulse' : ''}`}>
                <Icon name="Thermometer" size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Температура системы</h3>
                <p className="text-muted-foreground">System Temperature Monitor</p>
              </div>
            </div>

            {temperature > 75 && (
              <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-lg px-4 py-2 animate-pulse">
                <Icon name="AlertTriangle" size={18} className="mr-2" />
                ПЕРЕГРЕВ!
              </Badge>
            )}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-end mb-3">
              <span className="text-muted-foreground">Текущая температура</span>
              <span className={`text-6xl font-bold ${getTempColor(temperature)}`}>
                {temperature.toFixed(1)}°C
              </span>
            </div>
            <Progress 
              value={(temperature / 100) * 100} 
              className="h-4"
              indicatorClassName={temperature > 75 ? 'bg-destructive' : temperature > 60 ? 'bg-yellow-500' : 'bg-accent'}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Минимум</p>
              <p className="text-xl font-semibold text-accent">45°C</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Оптимально</p>
              <p className="text-xl font-semibold text-yellow-500">60°C</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Критично</p>
              <p className="text-xl font-semibold text-destructive">75°C</p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card className="p-4 bg-card/50 border-border/50">
            <div className="flex items-center gap-3">
              <Icon name="Activity" size={24} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Время работы</p>
                <p className="text-lg font-semibold">24:15:32</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/50 border-border/50">
            <div className="flex items-center gap-3">
              <Icon name="HardDrive" size={24} className="text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Диск</p>
                <p className="text-lg font-semibold">512 GB SSD</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card/50 border-border/50">
            <div className="flex items-center gap-3">
              <Icon name="Network" size={24} className="text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Сеть</p>
                <p className="text-lg font-semibold">1 Gbps</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RootPanel;
