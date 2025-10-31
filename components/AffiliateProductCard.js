import React from 'react';

const AffiliateProductCard = ({ product }) => {
    if (!product) return null;

    const handleClick = (e) => {
        if (product.link === '#') {
            e.preventDefault();
        }
    };

    return React.createElement('div', { className: "bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg p-6 flex flex-col sm:flex-row items-center gap-6" },
        React.createElement('div', { className: "flex-shrink-0" },
            React.createElement('img', {
                src: product.imageUrl,
                alt: product.title,
                loading: "lazy",
                className: "w-32 h-32 object-cover rounded-md shadow-md"
            })
        ),
        React.createElement('div', { className: "flex-grow text-center sm:text-left" },
            React.createElement('h4', { className: "text-xl font-bold text-slate-800 dark:text-slate-200" }, product.title),
            React.createElement('p', { className: "mt-2 text-slate-600 dark:text-slate-400" }, product.description)
        ),
        React.createElement('div', { className: "flex-shrink-0 mt-4 sm:mt-0" },
            React.createElement('a', {
                href: product.link,
                onClick: handleClick,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-block rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-all transform hover:scale-105"
            },
                product.buttonText || 'Ver Oferta'
            )
        )
    );
}

export default AffiliateProductCard;

