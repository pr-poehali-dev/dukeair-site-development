import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Flight {
  id: number;
  from: string;
  to: string;
  date: string;
  time: string;
  price: string;
  registration: string;
  boarding: string;
  seat: string;
}

const flights: Flight[] = [
  { id: 1, from: 'Сургут', to: 'Самара', date: '15.11.2025', time: '08:30', price: '4 500 ₽', registration: '06:30', boarding: '08:00', seat: '12A' },
  { id: 2, from: 'Москва', to: 'Сочи', date: '16.11.2025', time: '10:15', price: '6 800 ₽', registration: '08:15', boarding: '09:45', seat: '8B' },
  { id: 3, from: 'Санкт-Петербург', to: 'Калининград', date: '17.11.2025', time: '14:20', price: '5 200 ₽', registration: '12:20', boarding: '13:50', seat: '15C' },
  { id: 4, from: 'Екатеринбург', to: 'Владивосток', date: '18.11.2025', time: '22:00', price: '12 300 ₽', registration: '20:00', boarding: '21:30', seat: '3A' },
  { id: 5, from: 'Казань', to: 'Краснодар', date: '19.11.2025', time: '07:45', price: '5 900 ₽', registration: '05:45', boarding: '07:15', seat: '11D' },
  { id: 6, from: 'Новосибирск', to: 'Иркутск', date: '20.11.2025', time: '16:30', price: '7 100 ₽', registration: '14:30', boarding: '16:00', seat: '6F' },
  { id: 7, from: 'Ростов-на-Дону', to: 'Минеральные Воды', date: '21.11.2025', time: '12:00', price: '3 800 ₽', registration: '10:00', boarding: '11:30', seat: '9A' },
  { id: 8, from: 'Уфа', to: 'Анапа', date: '22.11.2025', time: '09:40', price: '6 400 ₽', registration: '07:40', boarding: '09:10', seat: '14B' },
  { id: 9, from: 'Тюмень', to: 'Адлер', date: '23.11.2025', time: '18:15', price: '8 200 ₽', registration: '16:15', boarding: '17:45', seat: '5C' },
  { id: 10, from: 'Пермь', to: 'Симферополь', date: '24.11.2025', time: '11:30', price: '7 600 ₽', registration: '09:30', boarding: '11:00', seat: '10A' },
];

const reviews = [
  {
    route: 'Москва – Сочи',
    date: '22 сентября 2024',
    rating: 3,
    text: 'Летел DukeAir в Сочи на отдых с семьей. Это был обычный внутренний рейс, эконом-класс. Салон самолета (Airbus A320) показался немного староватым, кресла не очень удобные, да и места для ног маловато. За питание давали небольшой сэндвич и напиток – съедобно, но без восторга. Удивило, что пришлось доплачивать за выбор места, хотя я бронировал билеты заранее. Зато к пунктуальности претензий нет, вылетели и прилетели вовремя. Бортпроводники работали стандартно, без особых проявлений радушия, но и без негатива. За ту цену, что я заплатил, ожидал чуть большего комфорта. В следующий раз, скорее всего, посмотрю другие варианты.'
  },
  {
    route: 'Париж – Дубай',
    date: '05 ноября 2024',
    rating: 5,
    text: 'Просто невероятный полет с DukeAir! Это был мой первый раз с этой авиакомпанией, и я в полном восторге! Рейс из Парижа в Дубай прошел абсолютно безупречно. Я летела экономом, но чувствовала себя как в бизнес-классе. Кресла были surprisingly удобными, с хорошим наклоном, а индивидуальная система развлечений на борту предлагала огромный выбор фильмов и музыки. Еда была очень вкусной, даже подали настоящее горячее блюдо с десертом. Но самое главное – это экипаж! Бортпроводники были невероятно вежливы, улыбчивы и готовы помочь в любую минуту. Мне даже подарили небольшой сувенир в честь первого полета с ними. Чувствовалось, что о каждом пассажире заботятся. Никаких задержек, все четко и профессионально. Однозначно буду летать DukeAir снова и всем рекомендую!'
  },
  {
    route: 'Лондон – Нью-Йорк',
    date: '12 октября 2024',
    rating: 4,
    text: 'Летал DukeAir в командировку из Лондона в Нью-Йорк, бизнес-класс. В целом, очень достойная авиакомпания. Регистрация прошла быстро, бизнес-зал в Хитроу был отличный, хотя и немного переполнен. Самолет был чистым, кресла раскладывались в полноценную кровать, что позволило хорошо выспаться. Бортпроводники были внимательны, но без излишней навязчивости, что я ценю. Питание хорошее, качественное, но без \'вау-эффекта\'. Единственный минус – вылетели с задержкой в 40 минут из-за позднего прибытия борта, но капитан оперативно нас проинформировал, и часть задержки удалось сократить в воздухе. В целом, для деловых поездок – надежный и комфортный выбор, готов летать снова.'
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showTicket, setShowTicket] = useState(false);
  const [showRefund, setShowRefund] = useState(false);

  const handleBuyTicket = (flight: Flight) => {
    setSelectedFlight(flight);
    setShowTicket(true);
  };

  const handleRefund = () => {
    setShowTicket(false);
    setShowRefund(true);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-secondary">
      <nav className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Plane" className="text-white" size={32} />
              <span className="text-2xl font-bold text-white font-heading">DUKE AIR</span>
            </div>
            <div className="hidden md:flex gap-6">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'about', label: 'О нас', icon: 'Info' },
                { id: 'schedule', label: 'Расписание', icon: 'Calendar' },
                { id: 'reviews', label: 'Отзывы', icon: 'Star' },
                { id: 'bot', label: 'Telegram бот', icon: 'Send' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 text-white/80 hover:text-white transition-colors ${
                    activeSection === item.id ? 'text-white font-semibold' : ''
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in font-heading">
            DUKE AIR
          </h1>
          <p className="text-2xl text-white/90 mb-8 animate-fade-in">
            Летим к мечте! ✈️
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('schedule')}
              className="bg-white text-primary hover:bg-white/90 transition-transform hover:scale-105"
            >
              <Icon name="Ticket" className="mr-2" size={20} />
              Купить билет
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection('about')}
              className="border-white text-white hover:bg-white/10 transition-transform hover:scale-105"
            >
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-8 text-center font-heading">О нас</h2>
          <Card className="bg-card/80 border-white/10">
            <CardContent className="p-8 text-white/90 space-y-4 leading-relaxed">
              <p>
                Добро пожаловать в мир Duke Air! Наша авиакомпания зародилась в 2024 году с амбициозной мечтой – сделать небо доступным и комфортным для каждого. Мы появились в сердце Сибири, городе Сургут, и с самого начала поставили себе цель переосмыслить подход к авиапутешествиям.
              </p>
              <p>
                Название "Duke" (Герцог) неслучайно. Оно символизирует наше стремление к благородству в сервисе, безупречности в каждой детали и королевскому отношению к каждому пассажиру. Мы чтим классические традиции авиации, воплощенные в надежности и эстетике нашего первого самолета, но при этом активно внедряем инновационные технологии.
              </p>
              <p>
                Наш флагманский продукт – это Telegram-бот DUKE AIR, разработанный для того, чтобы вы могли находить самые выгодные билеты, бронировать рейсы и получать всю необходимую информацию максимально быстро, удобно и без лишних переплат. Мы верим, что современные технологии должны работать на вашу экономию и комфорт.
              </p>
              <p>
                Безопасность и комфорт наших пассажиров – наш абсолютный приоритет. Каждый полет с Duke Air – это тщательно спланированное путешествие, где команда профессионалов заботится о вас на каждом этапе.
              </p>
              <p>
                Мы начали свой путь с пробного рейса Сургут – Самара, но наши амбиции простираются далеко за горизонты. Мы постоянно расширяем географию полетов, совершенствуем сервис и стремимся предложить вам лучший опыт в воздухе.
              </p>
              <p className="font-semibold text-white">
                Присоединяйтесь к Duke Air и откройте для себя новый уровень авиапутешествий. Ваше приключение начинается здесь!
              </p>
              <p className="text-center text-xl font-bold text-white mt-6 font-heading">
                Duke Air – летим к мечте!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="schedule" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 text-center font-heading">Расписание рейсов</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map(flight => (
              <Card key={flight.id} className="bg-card/80 border-white/10 transition-transform hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Plane" size={24} />
                    {flight.from} → {flight.to}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    {flight.date} в {flight.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-white">{flight.price}</div>
                    <Button 
                      className="w-full bg-white text-primary hover:bg-white/90"
                      onClick={() => handleBuyTicket(flight)}
                    >
                      <Icon name="Ticket" className="mr-2" size={18} />
                      Купить билет
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-8 text-center font-heading">Отзывы</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-card/80 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{review.route}</CardTitle>
                  <CardDescription className="text-white/70">{review.date}</CardDescription>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon 
                        key={i}
                        name="Star" 
                        size={16}
                        className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-sm leading-relaxed">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="bot" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-white mb-8 font-heading">Telegram бот</h2>
          <Card className="bg-card/80 border-white/10">
            <CardContent className="p-12">
              <Icon name="Send" size={64} className="text-white mx-auto mb-6" />
              <p className="text-white/90 mb-8 text-lg">
                Бронируйте билеты, отслеживайте рейсы и получайте эксклюзивные предложения прямо в Telegram!
              </p>
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 transition-transform hover:scale-105"
                onClick={() => window.open('https://t.me/leadairBot', '_blank')}
              >
                <Icon name="Send" className="mr-2" size={20} />
                Открыть бот
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center text-white/70">
          <p>© 2024 Duke Air. Все права защищены.</p>
        </div>
      </footer>

      <Dialog open={showTicket} onOpenChange={setShowTicket}>
        <DialogContent className="bg-card border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Icon name="CheckCircle" className="text-green-400" size={24} />
              Поздравляем! Вы купили билет
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Информация о вашем рейсе
            </DialogDescription>
          </DialogHeader>
          {selectedFlight && (
            <div className="space-y-4 text-white">
              <div className="grid grid-cols-2 gap-4 p-4 bg-primary/30 rounded-lg">
                <div>
                  <p className="text-white/70 text-sm">Маршрут</p>
                  <p className="font-semibold">{selectedFlight.from} → {selectedFlight.to}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Дата рейса</p>
                  <p className="font-semibold">{selectedFlight.date}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Регистрация</p>
                  <p className="font-semibold">{selectedFlight.registration}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Посадка</p>
                  <p className="font-semibold">{selectedFlight.boarding}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Место</p>
                  <p className="font-semibold">{selectedFlight.seat}</p>
                </div>
                <div>
                  <p className="text-white/70 text-sm">Стоимость</p>
                  <p className="font-semibold">{selectedFlight.price}</p>
                </div>
              </div>
              <Button 
                variant="destructive"
                className="w-full"
                onClick={handleRefund}
              >
                <Icon name="X" className="mr-2" size={18} />
                Оформить возврат
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showRefund} onOpenChange={setShowRefund}>
        <DialogContent className="bg-card border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Icon name="CheckCircle" className="text-green-400" size={24} />
              Возврат оформлен
            </DialogTitle>
          </DialogHeader>
          <div className="text-white/90 space-y-4">
            <p>Ваш возврат билета успешно оформлен. 🎉</p>
            <p>
              Средства будут возвращены на карту, с которой производилась оплата. 
              Обычно это занимает от 3 до 5 рабочих дней, в зависимости от вашего банка.
            </p>
            <p className="font-semibold">
              Мы ценим ваш выбор! До новых встреч с Duke Air! ✈️
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
