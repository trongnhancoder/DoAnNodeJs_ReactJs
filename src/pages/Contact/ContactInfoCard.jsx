// src/components/ContactInfoCard.jsx
import { FaExternalLinkAlt } from 'react-icons/fa';

function ContactInfoCard({ icon: Icon, title, content, link }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center mb-4">
        <Icon className="text-yellow-500 text-3xl mr-3" />
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      {link ? (
        <a
          href={link}
          className="text-gray-600 hover:text-yellow-500 transition-colors flex items-center gap-1"
          target={link.startsWith('http') ? '_blank' : undefined}
          rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {content}
          {link.startsWith('http') && <FaExternalLinkAlt className="text-sm" />}
        </a>
      ) : (
        <p className="text-gray-600">{content}</p>
      )}
    </div>
  );
}

export default ContactInfoCard;