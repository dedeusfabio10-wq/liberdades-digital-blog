import React, { useMemo, useEffect } from 'react';
import PencilIcon from './icons/PencilIcon.js';
import AffiliateProductCard from './AffiliateProductCard.js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TableOfContents from './TableOfContents.js';
import PostCard from './PostCard.js';
import SocialShareButtons from './SocialShareButtons.js';

const ArticleDetailPage = ({ post, isAdmin, onBack, onEdit, allPosts, onSelectPost }) => {
  const headings = useMemo(() => {
    const headingRegex = /^(##)\s(.+)/gm;
    if (!post.content) return [];
    const matches = Array.from(post.content.matchAll(headingRegex));
    return matches.map(match => ({
      level: match[1].length,
      text: match[2].trim(),
      id: match[2].trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
    }));
  }, [post.content]);

  const relatedPosts = useMemo(() => {
    return allPosts
      .filter(p => p.category === post.category && p.id !== post.id)
      .slice(0, 3);
  }, [allPosts, post]);
  
  const [pageUrl, setPageUrl] = React.useState('');
  useEffect(() => {
    setPageUrl(window.location.href);
  }, [post.id]);


  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': window.location.href,
      },
      'headline': post.title,
      'description': post.excerpt,
      'image': post.imageUrl,
      'author': {
        '@type': 'Organization',
        'name': 'Liberdade Digital',
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Liberdade Digital',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://SEU_DOMINIO.com/logo.png',
        },
      },
      'datePublished': new Date().toISOString(),
      'dateModified': new Date().toISOString(),
    };

    const scriptId = 'article-schema';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema, null, 2);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [post]);
  
  const markdownComponents = {
      h2: ({node, ...props}) => {
         const id = String(props.children).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
         return React.createElement('h2', { id, ...props });
      },
      code(props) {
        const {children, className, node, ...rest} = props;
        const match = /language-(\w+)/.exec(className || '');
        return match ? (
          React.createElement(SyntaxHighlighter, {
            style: vscDarkPlus,
            language: match[1],
            PreTag: "div"
          }, String(children).replace(/\n$/, ''))
        ) : (
          React.createElement('code', { ...rest, className: className }, children)
        )
      }
    };

  return React.createElement('div', { className: "bg-white dark:bg-slate-900 transition-colors duration-300" },
    React.createElement('div', { className: "relative" },
      post.videoUrl ? (
        React.createElement('div', { className: "max-w-4xl mx-auto bg-black" },
          React.createElement('video', {
            key: post.id,
            controls: true,
            src: post.videoUrl,
            className: "w-full h-auto max-h-[80vh] object-contain"
          }, "Seu navegador não suporta o elemento de vídeo.")
        )
      ) : (
        React.createElement('div', { className: "w-full h-64 md:h-96 bg-slate-200 dark:bg-slate-700" },
          React.createElement('img', { className: "w-full h-full object-cover", loading: "lazy", src: post.imageUrl, alt: post.title, width: "1280", height: "384" })
        )
      )
    ),
    React.createElement('div', { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" },
      React.createElement('div', { className: "grid grid-cols-12 gap-8" },
        React.createElement('div', { className: "col-span-12 lg:col-span-3 lg:order-2" },
          React.createElement('div', { className: "sticky top-24" },
            headings.length > 0 && React.createElement(TableOfContents, { headings: headings }),
            React.createElement('button', { onClick: onBack, className: "text-blue-600 dark:text-blue-400 hover:underline font-semibold mt-8 w-full text-left" },
              "← Voltar para Artigos"
            )
          )
        ),
        React.createElement('div', { className: "col-span-12 lg:col-span-9 lg:order-1" },
          React.createElement('div', { className: "max-w-3xl mx-auto" },
            React.createElement('div', { className: "relative" },
              isAdmin && React.createElement('button', {
                onClick: () => onEdit(post),
                className: "absolute -top-4 right-0 flex items-center space-x-2 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg shadow-md hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border border-blue-200 dark:border-slate-700"
              },
                React.createElement(PencilIcon, { className: "w-5 h-5" }),
                React.createElement('span', null, "Editar Artigo")
              ),
              React.createElement('p', { className: "text-base font-semibold text-blue-600 dark:text-blue-400" }, post.category),
              React.createElement('h1', { className: "mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl" }, post.title),
              React.createElement('div', { className: "mt-6 pb-8 border-b border-slate-200 dark:border-slate-800" },
                React.createElement(SocialShareButtons, { title: post.title, url: pageUrl })
              ),
              React.createElement('article', { className: "mt-8 prose prose-lg dark:prose-invert max-w-none prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-strong:text-slate-800 dark:prose-strong:text-slate-200 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline" },
                 React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm], components: markdownComponents }, post.content)
              ),
              post.affiliateProduct && React.createElement('div', { className: "mt-12" },
                React.createElement(AffiliateProductCard, { product: post.affiliateProduct })
              ),
              relatedPosts.length > 0 && React.createElement('div', { className: "mt-16 pt-12 border-t border-slate-200 dark:border-slate-800" },
                React.createElement('h2', { className: "text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center" }, "Leia Também"),
                React.createElement('div', { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3" },
                  relatedPosts.map(relatedPost => React.createElement(PostCard, { key: relatedPost.id, post: relatedPost, onSelect: onSelectPost, isAdmin: false, onEdit: () => {}, onDelete: () => {} }))
                )
              )
            )
          )
        )
      )
    )
  );
};

export default ArticleDetailPage;
