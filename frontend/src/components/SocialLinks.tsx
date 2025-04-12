import React, { useState } from 'react';
import { Share2, Facebook, Instagram, Twitter, Github } from 'lucide-react';

export const SocialLinks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
        title="Redes sociales"
      >
        <Share2 size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 z-50">
          <div className="flex gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                title={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};