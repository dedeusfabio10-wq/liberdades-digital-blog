import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import HomePage from './components/HomePage.js';
import ArticlesPage from './components/ArticlesPage.js';
import CoursesPage from './components/CoursesPage.js';
import QuizzesPage from './components/QuizzesPage.js';
import ArticleDetailPage from './components/ArticleDetailPage.js';
import EditPostModal from './components/EditPostModal.js';
import LoginModal from './components/LoginModal.js';
import Toast from './components/Toast.js';
import ReadingProgressBar from './components/ReadingProgressBar.js';
import SearchModal from './components/SearchModal.js';
import Chatbot from './components/Chatbot.js';
import { POSTS, COURSES, NAV_LINKS, QUIZZ_DATA } from './constants.js';
import { GoogleGenAI } from "@google/genai";

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'liberdade';

const INITIAL_HOME_PAGE_CONTENT = {
  title: 'Conquiste sua [Liberdade Digital]',
  subtitle: 'Aprenda a vender na internet e construir um negócio online lucrativo. Aqui você encontra o caminho.',
  backgroundColor: '#f8fafc',
  backgroundImage: '',
  titleColor: '#0f172a',
  subtitleColor: '#475569',
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState(POSTS);
  const [courses, setCourses] = useState(COURSES);
  const [quizzContent, setQuizzContent] = useState(QUIZZ_DATA);
  const [homePageContent, setHomePageContent] = useState(INITIAL_HOME_PAGE_CONTENT);
  const [toast, setToast] = useState(null);
  const [theme, setTheme] = useState('light');

  const [selectedPost, setSelectedPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { role: 'model', content: 'Olá! Sou o assistente do blog Liberdade Digital. Como posso te ajudar a ter sucesso no marketing digital hoje?' }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);


  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const updateMetaTags = (title, description, imageUrl) => {
    document.title = title;
    
    const setMeta = (nameOrProperty, content, isProperty = false) => {
        let element = document.querySelector(isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(isProperty ? 'property' : 'name', nameOrProperty);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    
    if (imageUrl) {
      setMeta('og:image', imageUrl, true);
      setMeta('twitter:image', imageUrl, true);
    }
  };

  useEffect(() => {
    let title = 'Liberdade Digital';
    let description = INITIAL_HOME_PAGE_CONTENT.subtitle;
    let imageUrl = undefined;

    if (selectedPost) {
      title = `${selectedPost.title} | Liberdade Digital`;
      description = selectedPost.excerpt;
      imageUrl = selectedPost.imageUrl;
    } else {
      const pageInfo = NAV_LINKS.find(link => link.page === currentPage);
      if (pageInfo) {
        title = `Liberdade Digital | ${pageInfo.name}`;
        switch(pageInfo.page) {
            case 'articles':
                description = 'Explore todos os artigos sobre marketing digital, produtividade e como vender na internet.';
                break;
            case 'courses':
                description = 'Confira os cursos recomendados para acelerar sua jornada no empreendedorismo digital.';
                break;
            case 'quizzes':
                description = 'Faça nossos mini testes e descubra qual caminho no mercado digital é o melhor para você.';
                break;
            default: // home
                description = INITIAL_HOME_PAGE_CONTENT.subtitle;
        }
      }
    }
    
    updateMetaTags(title, description, imageUrl);
  }, [currentPage, selectedPost]);

  const handleSendMessageToAI = async (message) => {
    if (!process.env.API_KEY) {
      setChatMessages(prev => [...prev, { role: 'model', content: 'Desculpe, a chave da API Gemini não foi configurada. Não consigo responder agora.' }]);
      return;
    }
    
    const newMessage = { role: 'user', content: message };
    setChatMessages(prev => [...prev, newMessage]);
    setIsChatLoading(true);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const chatHistoryForAPI = chatMessages.map(({ role, content }) => ({
            role: role === 'model' ? 'model' : 'user',
            parts: [{ text: content }]
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [{text: message}],
            },
            config: {
                systemInstruction: "Você é um assistente prestativo para o blog 'Liberdade Digital'. Seu objetivo é responder a perguntas sobre vendas online, marketing digital, produtividade e liberdade financeira, com base no conteúdo e no tom do blog. Seja encorajador, prático e direto ao ponto.",
            }
        });
        
        const modelResponse = response.text;
        setChatMessages(prev => [...prev, { role: 'model', content: modelResponse }]);

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        setChatMessages(prev => [...prev, { role: 'model', content: 'Desculpe, ocorreu um erro ao tentar me comunicar com a IA. Por favor, tente novamente mais tarde.' }]);
    } finally {
        setIsChatLoading(false);
    }
  };


  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleLoginAttempt = (user, pass) => {
    if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setIsLoginModalOpen(false);
      setLoginError(null);
      showToast('Modo edição ativado!', 'success');
    } else {
      setLoginError('Credenciais inválidas. Tente novamente.');
    }
  };

  const handleSavePost = (postData) => {
    const isUpdate = postData.id !== undefined;

    if (isUpdate) {
      setPosts(prevPosts => prevPosts.map(p => (p.id === postData.id ? postData : p)));
      if (selectedPost && selectedPost.id === postData.id) {
        setSelectedPost(postData);
      }
    } else {
      const newPost = { ...postData, id: Date.now() };
      setPosts(prevPosts => [newPost, ...prevPosts]);
    }
    showToast('Artigo salvo com sucesso!');
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(p => p.id !== postId));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(null);
    }
    showToast('Artigo excluído.', 'success');
  };
  
  const handleEditPost = (post) => {
    setEditingPost(post);
    setIsEditPostModalOpen(true);
  };
  
  const handleAddNewPost = () => {
    setEditingPost(null);
    setIsEditPostModalOpen(true);
  };
  
  const handleSelectPost = (post) => {
    setSelectedPost(post);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    setCurrentPage('articles');
  }

  const handleUpdateCourse = (updatedCourse) => {
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    showToast('Curso salvo com sucesso!');
  };
  
  const handleAddCourse = (newCourse) => {
    const courseWithId = { ...newCourse, id: Date.now() };
    setCourses([courseWithId, ...courses]);
    showToast('Curso adicionado com sucesso!');
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(c => c.id !== courseId));
    showToast('Curso excluído.', 'success');
  };

  const handleSaveHomePageContent = (content) => {
    setHomePageContent(content);
    showToast('Página Inicial atualizada!');
  }

  const handleSaveQuizzContent = (content) => {
    setQuizzContent(content);
    showToast('Mini Teste atualizado com sucesso!');
  }

  const renderPage = () => {
    if (selectedPost) {
      return React.createElement(ArticleDetailPage, {
        post: selectedPost,
        isAdmin: isAdmin,
        onBack: handleBackToList,
        onEdit: handleEditPost,
        allPosts: posts,
        onSelectPost: handleSelectPost
      });
    }

    switch (currentPage) {
      case 'home':
        return React.createElement(HomePage, {
          content: homePageContent,
          onSaveContent: handleSaveHomePageContent,
          posts: posts,
          isAdmin: isAdmin,
          onEditPost: handleEditPost,
          onDeletePost: handleDeletePost,
          onSelectPost: handleSelectPost
        });
      case 'articles':
        return React.createElement(ArticlesPage, {
          posts: posts,
          isAdmin: isAdmin,
          onEditPost: handleEditPost,
          onDeletePost: handleDeletePost,
          onAddPost: handleAddNewPost,
          onSelectPost: handleSelectPost
        });
      case 'courses':
        return React.createElement(CoursesPage, {
          courses: courses,
          isAdmin: isAdmin,
          onUpdateCourse: handleUpdateCourse,
          onDeleteCourse: handleDeleteCourse,
          onAddCourse: handleAddCourse
        });
      case 'quizzes':
        return React.createElement(QuizzesPage, {
          content: quizzContent,
          onSelectPost: handleSelectPost,
          isAdmin: isAdmin,
          onSaveContent: handleSaveQuizzContent,
          allPosts: posts
        });
      default:
        return React.createElement(HomePage, {
          content: homePageContent,
          onSaveContent: handleSaveHomePageContent,
          posts: posts,
          isAdmin: isAdmin,
          onEditPost: handleEditPost,
          onDeletePost: handleDeletePost,
          onSelectPost: handleSelectPost
        });
    }
  };
  
  const handleSetCurrentPage = (page) => {
    setSelectedPost(null);
    setCurrentPage(page);
    window.scrollTo(0,0);
  }

  return React.createElement('div', { className: "font-sans text-slate-800 dark:text-slate-300 flex flex-col min-h-screen transition-colors duration-300" },
    React.createElement(Header, {
      currentPage: currentPage,
      setCurrentPage: handleSetCurrentPage,
      isAdmin: isAdmin,
      setIsAdmin: setIsAdmin,
      onShowLogin: () => setIsLoginModalOpen(true),
      onSearchClick: () => setIsSearchOpen(true),
      theme: theme,
      toggleTheme: toggleTheme
    }),
    selectedPost && React.createElement(ReadingProgressBar, null),
    React.createElement('main', { key: selectedPost ? `post-${selectedPost.id}` : currentPage, className: "flex-grow page-content" },
      renderPage()
    ),
    React.createElement(Footer, null),
    React.createElement(Chatbot, {
      messages: chatMessages,
      onSendMessage: handleSendMessageToAI,
      isLoading: isChatLoading
    }),
    toast && React.createElement(Toast, { message: toast.message, type: toast.type, onClose: () => setToast(null) }),
    React.createElement(EditPostModal, {
      isOpen: isEditPostModalOpen,
      onClose: () => setIsEditPostModalOpen(false),
      onSave: handleSavePost,
      post: editingPost
    }),
    React.createElement(LoginModal, {
      isOpen: isLoginModalOpen,
      onClose: () => setIsLoginModalOpen(false),
      onLogin: handleLoginAttempt,
      error: loginError
    }),
    React.createElement(SearchModal, {
      isOpen: isSearchOpen,
      onClose: () => setIsSearchOpen(false),
      posts: posts,
      onSelectPost: handleSelectPost
    })
  );
};

export default App;
