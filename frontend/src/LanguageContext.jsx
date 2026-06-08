import { createContext, useContext, useMemo, useState } from 'react';

const messages = {
  ru: {
    siteTitle: 'Research Platform',
    menu: {
      dashboard: 'Панель',
      datasets: 'Датасеты',
      myDatasets: 'Мои датасеты',
      uploads: 'Загрузить датасет',
      projects: 'Проекты',
      forum: 'Форум',
    },
    searchPlaceholder: 'Поиск пользователей, проектов, датасетов...',
    searchScope: {
      all: 'Все',
      users: 'Пользователи',
      projects: 'Проекты',
      datasets: 'Датасеты',
    },
    searchResults: {
      users: 'Пользователи',
      projects: 'Проекты',
      datasets: 'Датасеты',
      noUsers: 'Пользователи не найдены.',
      noProjects: 'Проекты не найдены.',
      noDatasets: 'Датасеты не найдены.',
    },
    userMenu: {
      profile: 'Профиль',
      favoriteDatasets: 'Избранные датасеты',
      favoriteProjects: 'Избранные проекты',
      settings: 'Настройки',
    },
    header: {
      hideMenu: 'Скрыть',
      openMenu: 'Открыть меню',
    },
    profile: {
      description: 'Управляйте своей исследовательской рабочей областью, быстро переходите к загрузкам и отслеживайте последние публикации.',
      email: 'Электронная почта',
      datasets: 'Датасеты',
      projects: 'Проекты',
      quickActions: 'Быстрые действия',
      uploadDataset: 'Загрузить датасет',
      browseProjects: 'Просмотреть проекты',
      favorites: 'Избранное',
      settings: 'Настройки',
      recentActivity: 'Последняя активность',
      recentActivityDesc: 'Ваши последние датасеты и проекты в одном месте.',
      noActivity: 'Пока нет активности',
      activityHint: 'Загрузите датасет или создайте проект, чтобы заполнить ленту активности.',
      addDataset: 'Добавить датасет',
      startProject: 'Начать проект',
      myProjects: 'Мои проекты',
      noProjects: 'Пока нет проектов',
      projectsHint: 'Начните новый проект, чтобы он появился здесь и в вашей сводке.',
      viewAllProjects: 'Посмотреть все проекты →',
      myDatasets: 'Мои датасеты',
      noDatasets: 'Пока нет датасетов',
      datasetsHint: 'Загрузите первый датасет, чтобы начать наполнять портфолио.',
      viewAllDatasets: 'Посмотреть все датасеты →',
      activityType: {
        project: 'Проект',
        dataset: 'Датасет',
      },
      languageLabel: 'Язык',
    },
  },
  en: {
    siteTitle: 'Research Platform',
    menu: {
      dashboard: 'Dashboard',
      datasets: 'Datasets',
      myDatasets: 'My Datasets',
      uploads: 'Upload Dataset',
      projects: 'Projects',
      forum: 'Forum',
    },
    searchPlaceholder: 'Search users, projects, datasets...',
    searchScope: {
      all: 'All',
      users: 'Users',
      projects: 'Projects',
      datasets: 'Datasets',
    },
    searchResults: {
      users: 'Users',
      projects: 'Projects',
      datasets: 'Datasets',
      noUsers: 'No users found.',
      noProjects: 'No projects found.',
      noDatasets: 'No datasets found.',
    },
    userMenu: {
      profile: 'Profile',
      favoriteDatasets: 'Favorite Datasets',
      favoriteProjects: 'Favorite Projects',
      settings: 'Settings',
    },
    header: {
      hideMenu: 'Hide',
      openMenu: 'Open menu',
    },
    profile: {
      description: 'Manage your research workspace, quickly access uploads, and track your latest contributions.',
      email: 'Email',
      datasets: 'Datasets',
      projects: 'Projects',
      quickActions: 'Quick actions',
      uploadDataset: 'Upload dataset',
      browseProjects: 'Browse projects',
      favorites: 'Favorites',
      settings: 'Settings',
      recentActivity: 'Recent activity',
      recentActivityDesc: 'Your latest datasets and projects in one place.',
      noActivity: 'No recent activity yet',
      activityHint: 'Upload a dataset or create a project to populate your activity feed.',
      addDataset: 'Add dataset',
      startProject: 'Start a project',
      myProjects: 'My Projects',
      noProjects: 'No projects yet',
      projectsHint: 'Start a new project so it appears here and in your profile summary.',
      viewAllProjects: 'View All Projects →',
      myDatasets: 'My Datasets',
      noDatasets: 'No datasets yet',
      datasetsHint: 'Upload your first dataset to start building your portfolio.',
      viewAllDatasets: 'View All Datasets →',
      activityType: {
        project: 'Project',
        dataset: 'Dataset',
      },
      languageLabel: 'Language',
    },
  },
};

const LanguageContext = createContext({
  language: 'ru',
  setLanguage: () => {},
  t: messages.ru,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() =>
    localStorage.getItem('appLanguage') || 'ru'
  );

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('appLanguage', lang);
  };

  const value = useMemo(
    () => ({ language, setLanguage, t: messages[language] || messages.ru }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
