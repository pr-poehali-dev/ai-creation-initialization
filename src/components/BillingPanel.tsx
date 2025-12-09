import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface BillingPanelProps {
  selectedPlan: string;
  onClose: () => void;
}

const BillingPanel = ({ selectedPlan, onClose }: BillingPanelProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'sbp' | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const planPrices: Record<string, number> = {
    'Старт': 0,
    'Бизнес': 4990,
    'Энтерпрайз': 0
  };

  const price = planPrices[selectedPlan] || 0;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19);
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 3000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/5 p-8 flex items-center justify-center">
        <Card className="p-12 max-w-md w-full text-center border-accent/30 bg-gradient-to-b from-accent/10 to-accent/5 animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Icon name="Check" size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-3">Оплата успешна! 🎉</h2>
          <p className="text-muted-foreground mb-2">Тариф <span className="font-semibold text-primary">{selectedPlan}</span> активирован</p>
          <p className="text-sm text-muted-foreground">Переходим к вашему аккаунту...</p>
        </Card>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 p-8 flex items-center justify-center">
        <Card className="p-12 max-w-md w-full text-center border-primary/30">
          <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold mb-3">Обработка платежа...</h2>
          <p className="text-muted-foreground mb-6">Пожалуйста, подождите</p>
          <Progress value={66} className="h-2" />
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Оформление подписки</h1>
            <p className="text-muted-foreground">Тариф: <span className="font-semibold text-primary">{selectedPlan}</span></p>
          </div>
          <Button variant="outline" onClick={onClose} className="border-border/50">
            <Icon name="X" size={18} className="mr-2" />
            Отмена
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6 border-border/50 bg-card/50">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Icon name="CreditCard" size={24} className="text-primary" />
                Способ оплаты
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 cursor-pointer transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border/50 hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon name="CreditCard" size={24} className={paymentMethod === 'card' ? 'text-primary' : 'text-muted-foreground'} />
                    <div>
                      <p className="font-semibold">Банковская карта</p>
                      <p className="text-xs text-muted-foreground">Visa, MasterCard, Мир</p>
                    </div>
                  </div>
                </Card>

                <Card 
                  onClick={() => setPaymentMethod('sbp')}
                  className={`p-4 cursor-pointer transition-all ${
                    paymentMethod === 'sbp' 
                      ? 'border-secondary bg-secondary/5' 
                      : 'border-border/50 hover:border-secondary/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon name="Smartphone" size={24} className={paymentMethod === 'sbp' ? 'text-secondary' : 'text-muted-foreground'} />
                    <div>
                      <p className="font-semibold">СБП</p>
                      <p className="text-xs text-muted-foreground">Быстрая оплата</p>
                    </div>
                  </div>
                </Card>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Номер карты</label>
                    <Input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      className="bg-background border-border/50 text-lg"
                      maxLength={19}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Срок действия</label>
                      <Input
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        className="bg-background border-border/50"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">CVC</label>
                      <Input
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        placeholder="123"
                        type="password"
                        className="bg-background border-border/50"
                        maxLength={3}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Имя владельца</label>
                    <Input
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                      placeholder="IVAN IVANOV"
                      className="bg-background border-border/50"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'sbp' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Номер телефона</label>
                    <Input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+7 (999) 123-45-67"
                      className="bg-background border-border/50"
                    />
                  </div>

                  <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/30">
                    <div className="flex gap-3">
                      <Icon name="Info" size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold mb-1">Как оплатить через СБП</p>
                        <ol className="text-muted-foreground space-y-1 list-decimal list-inside">
                          <li>Введите номер телефона</li>
                          <li>Откройте приложение банка</li>
                          <li>Подтвердите платеж</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6 border-border/50 bg-card/50">
              <div className="flex items-start gap-3">
                <Icon name="Shield" size={20} className="text-accent flex-shrink-0 mt-1" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground mb-1">Безопасная оплата</p>
                  <p>Все платежи защищены по стандарту PCI DSS. Мы не храним данные вашей карты.</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 border-primary/30 bg-gradient-to-b from-primary/5 to-primary/10 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Сводка заказа</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Тариф</span>
                  <span className="font-semibold">{selectedPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Период</span>
                  <span className="font-semibold">1 месяц</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border/50">
                  <span className="text-muted-foreground">Стоимость</span>
                  <span className="font-semibold">{price === 0 ? 'Бесплатно' : `${price}₽`}</span>
                </div>
              </div>

              <div className="bg-background/50 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-muted-foreground">Итого</span>
                  <span className="text-3xl font-bold text-primary">{price === 0 ? '0₽' : `${price}₽`}</span>
                </div>
                {price > 0 && (
                  <p className="text-xs text-muted-foreground">Следующее списание: {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('ru-RU')}</p>
                )}
              </div>

              <Button 
                onClick={handlePayment}
                disabled={!paymentMethod || (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvc || !cardHolder)) || (paymentMethod === 'sbp' && !phoneNumber)}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg py-6"
              >
                <Icon name="Lock" size={20} className="mr-2" />
                {price === 0 ? 'Активировать' : 'Оплатить'}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с условиями подписки
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPanel;
