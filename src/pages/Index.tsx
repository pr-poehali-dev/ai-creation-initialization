import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import RootPanel from '@/components/RootPanel';

const Index = () => {
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: 'Привет! Я AI-ассистент. Чем могу помочь?', isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [showPromoDialog, setShowPromoDialog] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isRootMode, setIsRootMode] = useState(false);
  const [promoError, setPromoError] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setMessages([...messages, 
      { text: inputMessage, isUser: true },
      { text: 'Отличный вопрос! Я могу помочь с анализом данных, генерацией контента и автоматизацией бизнес-процессов.', isUser: false }
    ]);
    setInputMessage('');
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePromoSubmit = () => {
    if (promoCode.toLowerCase() === 'vver') {
      setIsRootMode(true);
      setShowPromoDialog(false);
      setPromoError('');
    } else {
      setPromoError('Неверный промокод!');
    }
  };

  if (isRootMode) {
    return <RootPanel />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Platform
            </span>
          </div>
          
          <div className="hidden md:flex gap-6">
            {['Главная', 'Примеры', 'Возможности', 'Тарифы', 'Контакты'].map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-foreground/70 hover:text-foreground transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowPromoDialog(true)}
              className="border-destructive/30 hover:bg-destructive/10"
            >
              <Icon name="Key" size={16} className="mr-1" />
              Промокод
            </Button>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Начать
            </Button>
          </div>
        </div>
      </nav>

      <section id="главная" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 animate-fade-in">
            <Icon name="Zap" size={14} className="mr-1" />
            Новое поколение AI
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
              Интеллектуальный
            </span>
            <br />
            помощник для бизнеса
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Автоматизируйте поддержку клиентов с помощью AI-чатбота нового поколения. 
            Быстро, умно, эффективно.
          </p>

          <div className="flex gap-4 justify-center mb-16 animate-scale-in">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8">
              <Icon name="Rocket" size={20} className="mr-2" />
              Попробовать бесплатно
            </Button>
            <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 text-lg px-8">
              <Icon name="Play" size={20} className="mr-2" />
              Смотреть демо
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: 'MessageSquare', value: '500K+', label: 'Диалогов в день' },
              { icon: 'Users', value: '98%', label: 'Довольных клиентов' },
              { icon: 'Zap', value: '< 1сек', label: 'Время ответа' },
              { icon: 'TrendingUp', value: '45%', label: 'Рост продаж' }
            ].map((stat, idx) => (
              <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Icon name={stat.icon as any} size={14} />
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="примеры" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              <Icon name="Lightbulb" size={14} className="mr-1" />
              Примеры использования
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              AI в действии
            </h2>
            <p className="text-muted-foreground text-lg">
              Посмотрите, как наш чатбот решает реальные задачи
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: 'ShoppingCart',
                title: 'E-commerce',
                description: 'Помощь в выборе товаров, оформлении заказов и отслеживании доставки',
                color: 'from-primary to-primary/60'
              },
              {
                icon: 'Headphones',
                title: 'Поддержка 24/7',
                description: 'Мгновенные ответы на вопросы клиентов в любое время суток',
                color: 'from-secondary to-secondary/60'
              },
              {
                icon: 'BarChart3',
                title: 'Аналитика',
                description: 'Сбор данных о клиентах и их предпочтениях для улучшения сервиса',
                color: 'from-accent to-accent/60'
              }
            ].map((example, idx) => (
              <Card key={idx} className="p-6 border-border/50 bg-card/50 backdrop-blur hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${example.color} flex items-center justify-center mb-4`}>
                  <Icon name={example.icon as any} size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                <p className="text-muted-foreground">{example.description}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-gradient-to-br from-card via-card to-muted/20 border-border/50">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Живое демо чатбота</h3>
                <p className="text-muted-foreground mb-4">
                  Попробуйте пообщаться с нашим AI прямо сейчас. Задайте любой вопрос!
                </p>
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline" className="border-primary/30">
                    <Icon name="Brain" size={12} className="mr-1" />
                    GPT-4
                  </Badge>
                  <Badge variant="outline" className="border-secondary/30">
                    <Icon name="Globe" size={12} className="mr-1" />
                    Русский
                  </Badge>
                </div>
              </div>

              <div className="bg-background/50 rounded-xl border border-border/50 p-4 backdrop-blur">
                <div className="h-64 overflow-y-auto mb-4 space-y-3">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                      <div className={`max-w-[80%] px-4 py-2 rounded-xl ${
                        msg.isUser 
                          ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                          : 'bg-muted text-foreground'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Напишите сообщение..."
                    className="flex-1 bg-background border-border/50"
                  />
                  <Button onClick={handleSendMessage} className="bg-gradient-to-r from-primary to-secondary">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="возможности" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Icon name="Sparkles" size={14} className="mr-1" />
              Возможности
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Всё, что нужно для успеха
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'MessageSquare', title: 'Естественные диалоги', desc: 'Понимает контекст и ведёт беседу как человек' },
              { icon: 'Languages', title: 'Мультиязычность', desc: 'Поддержка 50+ языков из коробки' },
              { icon: 'Zap', title: 'Мгновенные ответы', desc: 'Скорость обработки запросов < 1 секунды' },
              { icon: 'Shield', title: 'Безопасность данных', desc: 'Шифрование и полное соответствие GDPR' },
              { icon: 'LineChart', title: 'Аналитика', desc: 'Детальная статистика по всем диалогам' },
              { icon: 'Plug', title: 'Интеграции', desc: 'Подключение к CRM, мессенджерам, соцсетям' }
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name={feature.icon as any} size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="тарифы" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Icon name="CreditCard" size={14} className="mr-1" />
              Тарифы
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Выберите свой план
            </h2>
            <p className="text-muted-foreground text-lg">
              Прозрачные цены без скрытых платежей
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Старт',
                price: '0₽',
                period: 'навсегда',
                features: ['100 диалогов/месяц', 'Базовая аналитика', 'Email поддержка', '1 интеграция'],
                color: 'border-border',
                popular: false
              },
              {
                name: 'Бизнес',
                price: '4 990₽',
                period: 'в месяц',
                features: ['5 000 диалогов/месяц', 'Расширенная аналитика', 'Приоритетная поддержка', 'Все интеграции', 'Кастомизация'],
                color: 'border-primary',
                popular: true
              },
              {
                name: 'Энтерпрайз',
                price: 'По запросу',
                period: '',
                features: ['Безлимит диалогов', 'Персональный менеджер', 'SLA 99.9%', 'Выделенный сервер', 'White-label'],
                color: 'border-border',
                popular: false
              }
            ].map((plan, idx) => (
              <Card key={idx} className={`p-8 border-2 ${plan.color} ${plan.popular ? 'bg-gradient-to-b from-primary/5 to-secondary/5 scale-105' : 'bg-card/50'} relative hover:scale-105 transition-transform duration-300`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white">
                    Популярный
                  </Badge>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground ml-2">{plan.period}</span>}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90' : 'border-primary/30'}`} variant={plan.popular ? 'default' : 'outline'}>
                  {plan.price === 'По запросу' ? 'Связаться' : 'Выбрать план'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="контакты" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              <Icon name="Mail" size={14} className="mr-1" />
              Контакты
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Свяжитесь с нами
            </h2>
            <p className="text-muted-foreground text-lg">
              Ответим на все вопросы в течение 24 часов
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-6">Напишите нам</h3>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Имя</label>
                    <Input placeholder="Ваше имя" className="bg-background border-border/50" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                    <Input type="email" placeholder="your@email.com" className="bg-background border-border/50" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Сообщение</label>
                    <Textarea placeholder="Расскажите о вашем проекте..." rows={4} className="bg-background border-border/50" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить
                  </Button>
                </form>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-6">Другие способы связи</h3>
                
                {[
                  { icon: 'Mail', label: 'Email', value: 'hello@aiplatform.ru' },
                  { icon: 'Phone', label: 'Телефон', value: '+7 (495) 123-45-67' },
                  { icon: 'MapPin', label: 'Офис', value: 'Москва, ул. Тверская, 1' }
                ].map((contact, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name={contact.icon as any} size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{contact.label}</div>
                      <div className="font-medium">{contact.value}</div>
                    </div>
                  </div>
                ))}

                <div className="pt-6">
                  <p className="text-sm text-muted-foreground mb-3">Следите за нами</p>
                  <div className="flex gap-3">
                    {['Twitter', 'Github', 'Linkedin'].map((social, idx) => (
                      <button key={idx} className="w-10 h-10 rounded-lg bg-muted/50 hover:bg-primary/20 border border-border/50 hover:border-primary/50 flex items-center justify-center transition-all">
                        <Icon name={social as any} size={18} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <Icon name="Sparkles" size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold">AI Platform</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Интеллектуальные решения для вашего бизнеса
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 AI Platform. Все права защищены.
          </p>
        </div>
      </footer>

      <Dialog open={showPromoDialog} onOpenChange={setShowPromoDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Key" size={24} className="text-primary" />
              Введите промокод
            </DialogTitle>
            <DialogDescription>
              Специальные коды открывают доступ к скрытым функциям
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Input
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoError('');
                }}
                onKeyPress={(e) => e.key === 'Enter' && handlePromoSubmit()}
                placeholder="Введите промокод..."
                className="bg-background border-border/50 text-center text-lg tracking-widest uppercase"
              />
              {promoError && (
                <p className="text-destructive text-sm mt-2 flex items-center gap-1">
                  <Icon name="AlertCircle" size={14} />
                  {promoError}
                </p>
              )}
            </div>
            <Button 
              onClick={handlePromoSubmit} 
              className="w-full bg-gradient-to-r from-destructive to-destructive/60 hover:opacity-90"
            >
              <Icon name="Unlock" size={18} className="mr-2" />
              Активировать
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;