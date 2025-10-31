import React from 'react';
import TwitterIcon from './icons/TwitterIcon.js';
import FacebookIcon from './icons/FacebookIcon.js';
import LinkedinIcon from './icons/LinkedinIcon.js';
import WhatsappIcon from './icons/WhatsappIcon.js';

const SocialShareButtons = ({ title, url }) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const platforms = [
    {
      name: 'Twitter',
      icon: React.createElement(TwitterIcon, { className: "w-5 h-5" }),
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:text-[#1DA1F2]',
    },
    {
      name: 'Facebook',
      icon: React.createElement(FacebookIcon, { className: "w-5 h-5" }),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-[#1877F2]',
    },
    {
      name: 'LinkedIn',
      icon: React.createElement(LinkedinIcon, { className: "w-5 h-5" }),
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: 'hover:text-[#0A66C2]',
    },
    {
      name: 'WhatsApp',
      icon: React.createElement(WhatsappIcon, { className: "w-5 h-5" }),
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:text-[#25D366]',
    },
  ];

  return React.createElement('div', { className: "flex items-center space-x-3" },
    React.createElement('span', { className: "text-sm font-semibold text-slate-600 dark:text-slate-400" }, "Compartilhe:"),
    React.createElement('div', { className: "flex items-center space-x-2" },
      platforms.map((platform) =>
        React.createElement('a', {
          key: platform.name,
          href: platform.url,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": `Compartilhar no ${platform.name}`,
          className: `p-2 rounded-full text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 transition-colors duration-200 ${platform.color}`
        },
          platform.icon
        )
      )
    )
  );
};

export default SocialShareButtons;
