import { useState } from 'react';
import useSWR from 'swr';
import api, { fetcher } from '../lib/api.js';
import SocialIcon from './SocialIcon.jsx';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { data: about } = useSWR('/about', fetcher);

  const getSocialClass = (platform = '') => {
    const key = platform.toLowerCase();

    if (key.includes('github')) return 'circle-icon--github';
    if (key.includes('linked')) return 'circle-icon--linkedin';
    if (key.includes('insta')) return 'circle-icon--instagram';
    if (key.includes('youtube') || key.includes('yt')) return 'circle-icon--youtube';
    if (key.includes('discord')) return 'circle-icon--discord';
    if (key.includes('mail') || key.includes('email')) return 'circle-icon--mail';

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post('/contact', {
        fullname: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      // simple fallback, CMS already shows toasts server-side if needed
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section" data-aos="fade-up">
      <div className="section-bar" data-aos="fade-down">Contact</div>
      <div className="contact-row">
        {/* Left column: details */}
        <div className="contact-left" data-aos="fade-right">
          <div className="contact-details-grid">
            <h3 className="contact-title">Get in Touch</h3>
            <p className="contact-subtitle">
              I&apos;m always open to discussing new opportunities, creative projects, or potential
              collaborations. Whether you have a question or just want to say hi, I&apos;ll try my best
              to get back to you!
            </p>

          <a
            href="https://wa.me/919632961796?text=Hey%20Chirag%2C%20I%20just%20visited%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project%20or%20opportunity."
            target="_blank"
            rel="noreferrer"
            className="card contact-card"
          >
            <div className="card-icon whatsapp">
              <span className="circle-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.7 14.9L2 22l5.3-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-3.9 14.9l-.3-.1-3 .8.8-3-.2-.3A8 8 0 0 1 12 4zm-3 3.5c-.3 0-.7.1-.9.4-.2.3-.9.9-.9 2 0 1.2.9 2.3 1 2.5.1.2 1.8 3 4.4 4.1 2.2.9 2.6.8 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2s-.1-.2-.3-.3l-1.5-.7c-.2-.1-.4-.1-.6.1l-.6.8c-.1.1-.3.2-.5.1-.3-.1-1.1-.4-2-1.3-.7-.7-1.1-1.5-1.2-1.7-.1-.2 0-.4.1-.5l.5-.6c.1-.1.1-.3.1-.4l-.7-1.6c-.1-.3-.3-.3-.5-.3z" />
                </svg>
              </span>
            </div>
            <div className="card-body">
              <p className="card-label">WhatsApp</p>
              <p className="card-main">Chat on +91 9632961796</p>
              <p className="card-helper">Opens WhatsApp app or Web based on your device</p>
            </div>
          </a>

          <a href="mailto:chiragbhandarkar780@gmail.com" className="card contact-card">
            <div className="card-icon email">
              <span className="circle-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <polyline points="4 6 12 12 20 6" />
                </svg>
              </span>
            </div>
            <div className="card-body">
              <p className="card-label">Email</p>
              <p className="card-main">chiragbhandarkar780@gmail.com</p>
            </div>
          </a>

          <a href="tel:+919632961796" className="card contact-card">
            <div className="card-icon phone">
              <span className="circle-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6.6 3.5 8.8 3a2 2 0 0 1 2.3 1.2l1 2.3a2 2 0 0 1-.5 2.1l-1.3 1.3a11 11 0 0 0 4.9 4.9l1.3-1.3a2 2 0 0 1 2.1-.5l2.3 1a2 2 0 0 1 1.2 2.3l-.5 2.2a2 2 0 0 1-2 1.5A17 17 0 0 1 4 6.5a2 2 0 0 1 1.5-2z" />
                </svg>
              </span>
            </div>
            <div className="card-body">
              <p className="card-label">Phone</p>
              <p className="card-main">+91 9632961796</p>
            </div>
          </a>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Ugar+Khurd,+Belagavi"
            target="_blank"
            rel="noreferrer"
            className="card contact-card"
          >
            <div className="card-icon location">
              <span className="circle-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 3a7 7 0 0 0-7 7c0 4.4 4.1 8 6.1 9.6.5.4 1.3.4 1.8 0C14.9 18 19 14.4 19 10a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
            </div>
            <div className="card-body">
              <p className="card-label">Location</p>
              <p className="card-main">Ugar Khurd, Belagavi</p>
            </div>
          </a>

            <div className="follow-row">
              <p className="card-label mb-2">Follow Me</p>
              <div className="follow-icons">
                {about?.socials?.map((item) => (
                  <a
                    key={item.platform + item.url}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`circle-icon follow-circle ${getSocialClass(item.platform)}`}
                    aria-label={item.platform}
                  >
                    <SocialIcon platform={item.platform} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column: form */}
        <div className="contact-right" data-aos="fade-left">
          <form className="card contact-form" onSubmit={handleSubmit}>
            <h3>Send me a message</h3>
            <div className="contact-form-row">
              <input
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <input
              name="subject"
              placeholder="What&apos;s this about?"
              value={form.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Tell me about your project or just say hello!"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={sending} className="contact-submit">
              {sending ? 'Sending...' : sent ? 'Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
