import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface User {
  id: string;
  username: string;
  email: string;
  plan: string;
  registered: string;
  status: 'active' | 'blocked';
}

const AdminPanel = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', username: 'user123', email: 'user@example.com', plan: 'Старт', registered: '10.12.2024', status: 'active' },
    { id: '2', username: 'business_user', email: 'biz@example.com', plan: 'Бизнес', registered: '09.12.2024', status: 'active' },
    { id: '3', username: 'enterprise_co', email: 'ent@example.com', plan: 'Энтерпрайз', registered: '08.12.2024', status: 'active' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const revenue = users.reduce((acc, user) => {
      if (user.plan === 'Бизнес') return acc + 4990;
      if (user.plan === 'Энтерпрайз') return acc + 15000;
      return acc;
    }, 0);
    setTotalRevenue(revenue);
  }, [users]);

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' } 
        : user
    ));
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    free: users.filter(u => u.plan === 'Старт').length,
    business: users.filter(u => u.plan === 'Бизнес').length,
    enterprise: users.filter(u => u.plan === 'Энтерпрайз').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="ShieldCheck" size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Админ-панель</h1>
              <p className="text-muted-foreground">@Itzloroxucape</p>
            </div>
          </div>
          <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 text-lg">
            <Icon name="Users" size={18} className="mr-2" />
            {stats.active} активных
          </Badge>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-6 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Users" size={24} className="text-primary" />
              <span className="text-3xl font-bold text-primary">{stats.total}</span>
            </div>
            <p className="text-sm text-muted-foreground">Всего пользователей</p>
          </Card>

          <Card className="p-6 border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5">
            <div className="flex items-center justify-between mb-2">
              <Icon name="DollarSign" size={24} className="text-accent" />
              <span className="text-3xl font-bold text-accent">{totalRevenue.toLocaleString()}₽</span>
            </div>
            <p className="text-sm text-muted-foreground">Выручка за месяц</p>
          </Card>

          <Card className="p-6 border-secondary/30 bg-gradient-to-br from-secondary/10 to-secondary/5">
            <div className="flex items-center justify-between mb-2">
              <Icon name="TrendingUp" size={24} className="text-secondary" />
              <span className="text-3xl font-bold text-secondary">{stats.business}</span>
            </div>
            <p className="text-sm text-muted-foreground">Бизнес тариф</p>
          </Card>

          <Card className="p-6 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Crown" size={24} className="text-yellow-500" />
              <span className="text-3xl font-bold text-yellow-500">{stats.enterprise}</span>
            </div>
            <p className="text-sm text-muted-foreground">Энтерпрайз</p>
          </Card>
        </div>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur mb-6">
          <div className="flex items-center gap-4 mb-6">
            <Icon name="Search" size={20} className="text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по имени или email..."
              className="flex-1 bg-background border-border/50"
            />
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Icon name="Filter" size={18} className="mr-2" />
              Фильтры
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground font-semibold">Пользователь</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground font-semibold">Email</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground font-semibold">Тариф</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground font-semibold">Регистрация</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground font-semibold">Статус</th>
                  <th className="text-left py-3 px-4 text-sm text-muted-foreground font-semibold">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                          {user.username[0].toUpperCase()}
                        </div>
                        <span className="font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-4 px-4">
                      <Badge className={
                        user.plan === 'Энтерпрайз' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' :
                        user.plan === 'Бизнес' ? 'bg-primary/20 text-primary border-primary/30' :
                        'bg-muted/50 text-muted-foreground border-border'
                      }>
                        {user.plan}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-sm">{user.registered}</td>
                    <td className="py-4 px-4">
                      <Badge className={user.status === 'active' ? 'bg-accent/20 text-accent border-accent/30' : 'bg-destructive/20 text-destructive border-destructive/30'}>
                        {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleUserStatus(user.id)}
                          className={user.status === 'active' ? 'border-destructive/30 hover:bg-destructive/10' : 'border-accent/30 hover:bg-accent/10'}
                        >
                          <Icon name={user.status === 'active' ? 'Ban' : 'Check'} size={16} />
                        </Button>
                        <Button size="sm" variant="outline" className="border-primary/30 hover:bg-primary/10">
                          <Icon name="Eye" size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border-border/50 bg-card/50">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="Activity" size={24} className="text-primary" />
              Активность за неделю
            </h3>
            <div className="space-y-3">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, idx) => {
                const value = Math.random() * 100;
                return (
                  <div key={idx}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-muted-foreground">{day}</span>
                      <span className="font-semibold">{Math.round(value)}%</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 border-border/50 bg-card/50">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="PieChart" size={24} className="text-secondary" />
              Распределение тарифов
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-muted"></div>
                  <span className="text-sm">Старт</span>
                </div>
                <span className="font-semibold">{stats.free} ({Math.round(stats.free / stats.total * 100)}%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <span className="text-sm">Бизнес</span>
                </div>
                <span className="font-semibold">{stats.business} ({Math.round(stats.business / stats.total * 100)}%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Энтерпрайз</span>
                </div>
                <span className="font-semibold">{stats.enterprise} ({Math.round(stats.enterprise / stats.total * 100)}%)</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
