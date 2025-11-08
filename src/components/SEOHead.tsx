import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const SUPPORTED_LANGUAGES = ['en', 'ru', 'es', 'zh'] as const;

// Получить базовый URL сайта
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  return '';
};

// Получить URL для языка
const getLanguageUrl = (lang: string, currentPath: string, currentSearch?: string) => {
  const baseUrl = getBaseUrl();
  const path = currentPath || '/';
  
  // Обрабатываем query параметры
  const searchParams = new URLSearchParams(currentSearch || '');
  searchParams.set('lang', lang);
  const queryString = searchParams.toString();
  
  return `${baseUrl}${path}${queryString ? `?${queryString}` : ''}`;
};

export const SEOHead = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language || 'en';
  const baseUrl = getBaseUrl();
  const currentPath = location.pathname;
  const currentSearch = location.search;

  useEffect(() => {
    // Обновляем lang атрибут в HTML
    document.documentElement.lang = currentLang;

    // Обновляем title
    const title = t('seo.title');
    document.title = title;

    // Обновляем или создаем meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', t('seo.description'));

    // Обновляем Open Graph теги
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const currentUrl = `${baseUrl}${currentPath}${currentSearch || ''}`;
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', t('seo.description'));
    updateMetaTag('og:url', currentUrl);

    // Обновляем Twitter теги
    const updateTwitterTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateTwitterTag('twitter:title', title);
    updateTwitterTag('twitter:description', t('seo.description'));

    // Удаляем старые hreflang теги
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach((link) => link.remove());

    // Добавляем hreflang теги для всех языков
    SUPPORTED_LANGUAGES.forEach((lang) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', getLanguageUrl(lang, currentPath, currentSearch));
      document.head.appendChild(link);
    });

    // Добавляем x-default hreflang (без параметра lang)
    const searchParamsWithoutLang = new URLSearchParams(currentSearch || '');
    searchParamsWithoutLang.delete('lang');
    const defaultQuery = searchParamsWithoutLang.toString();
    const defaultLink = document.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', `${baseUrl}${currentPath}${defaultQuery ? `?${defaultQuery}` : ''}`);
    document.head.appendChild(defaultLink);
  }, [currentLang, currentPath, currentSearch, t]);

  return null; // Этот компонент не рендерит ничего в DOM
};

