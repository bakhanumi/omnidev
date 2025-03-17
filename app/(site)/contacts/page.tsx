import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакты - Omniscient Dev',
  description: 'Контактная информация сообщества Omniscient Dev',
};

export default function ContactsPage() {
  return (
    <>
      <p className="welcome">Наши контакты</p>
      <div className="separator"></div>

      <section>
        <h2 className="section-header"># Контакты</h2>
        <div className="contacts-content">
          <p>Свяжитесь с нами любым удобным способом:</p>
          <ul className="contact-list">
            <li>Email: <a href="mailto:info@omniscientdev.com">info@omniscientdev.com</a></li>
            <li>Telegram: <a href="https://t.me/omniscientdev">@omniscientdev</a></li>
            <li>GitHub: <a href="https://github.com/omniscientdev">github.com/omniscientdev</a></li>
          </ul>
          <p>Наш адрес:</p>
          <address>
            Фергана, Узбекистан<br />
            Улица Примерная, 123
          </address>
        </div>
      </section>
    </>
  );
}
