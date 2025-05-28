import { useState, useEffect } from 'react';

function ContactModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('https://parseapi.back4app.com/classes/ContactMessage', {
        method: 'POST',
        headers: {
          'X-Parse-Application-Id': 'ivHkK8idQbRAQsRRTYnejrivlbN5KL1dEGkdLKGx',       // Replace this
          'X-Parse-REST-API-Key': 'jFf2GQYAWMLhVexvavCRyFGB5aLrutdJHvlFCXv2',         // Replace this
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert('Message sent!');
        setForm({ name: '', email: '', message: '' });
        onClose();
      } else {
        alert('Failed to send message.');
      }
    } catch (err) {
      alert('Error sending message.');
    }
    setSending(false);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={`bg-white p-6 rounded-xl shadow-xl w-96 transform transition-all duration-300 ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Send Me a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full p-2 border rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="w-full p-2 border rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows="4"
            className="w-full p-2 border rounded"
            value={form.message}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" disabled={sending} className="px-4 py-2 bg-blue-600 text-white rounded">
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;
