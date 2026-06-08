import {
  Link,
  Outlet
} from 'react-router-dom';

import {
  useState,
  useEffect,
  useRef
} from 'react';

import axios from 'axios';
import { useLanguage } from './LanguageContext';

function Layout() {

  const [user,
    setUser] =
      useState(() =>
        JSON.parse(
          localStorage.getItem('user') || 'null'
        )
      );

  const normalizeAvatarUrl =
    (avatar) => {
      if (!avatar) {
        return null;
      }
      if (avatar.startsWith('http')) {
        return avatar;
      }
      return `http://localhost:5000${avatar.startsWith('/') ? avatar : `/${avatar}`}`;
    };

  const [query,
    setQuery] =
      useState('');

  const [results,
    setResults] =
      useState({
        users: [],
        projects: [],
        datasets: []
      });

  const [searchScope,
    setSearchScope] =
      useState('all');

  const [showResults,
    setShowResults] =
      useState(false);

  const [sidebarOpen,
    setSidebarOpen] =
      useState(true);

  const [showUserMenu,
    setShowUserMenu] =
      useState(false);

  const menuRef = useRef(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    const handleUserUpdate = () => {
      setUser(JSON.parse(localStorage.getItem('user') || 'null'));
    };

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('userUpdated', handleUserUpdate);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  const handleSearch =
    async (value,
      scopeArg = null) => {

      const scope =
        scopeArg || searchScope;

      setQuery(value);

      if (!value.trim()) {

        setShowResults(false);

        return;
      }

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/search?query=${value}&scope=${scope}`
          );

        setResults(
          response.data
        );

        setSearchScope(scope);
        setShowResults(true);

      } catch (error) {

        console.error(error);
      }
    };

  const handleScopeChange =
    async (value) => {
      setSearchScope(value);
      if (query.trim()) {
        await handleSearch(query, value);
      }
    };

  return (
    <div className="app-shell">

      {/* Sidebar */}

      <div className={`sidebar${sidebarOpen ? '' : ' collapsed'}`}>

        <div className="sidebar-header">
          <h2 className="page-title">
            {t.siteTitle}
          </h2>
          <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            {sidebarOpen ? t.header.hideMenu : t.header.openMenu}
          </button>
        </div>

        <div className="nav-group">

          <Link
            to="/dashboard"
            className="nav-link"
          >
            {t.menu.dashboard}
          </Link>

          <Link
            to="/datasets"
            className="nav-link"
          >
            {t.menu.datasets}
          </Link>

          <Link
            to="/my-datasets"
            className="nav-link"
          >
            {t.menu.myDatasets}
          </Link>

          <Link
            to="/uploads"
            className="nav-link"
          >
            {t.menu.uploads}
          </Link>

          <Link
            to="/projects"
            className="nav-link"
          >
            {t.menu.projects}
          </Link>

          <Link
            to="/forum"
            className="nav-link"
          >
            {t.menu.forum}
          </Link>

        </div>

      </div>

      {/* Main */}

      <div className="main-area">

        {/* Header */}

        <header className="header">
          {!sidebarOpen && (
            <button
              type="button"
              className="sidebar-toggle sidebar-restore"
              onClick={() => setSidebarOpen(true)}
            >
              🚀 {t.header.openMenu}
            </button>
          )}

          {/* Search */}

          <div className="search-shell">
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="search-input"
            />

            <select
              value={searchScope}
              onChange={(e) => handleScopeChange(e.target.value)}
              className="search-filter"
            >
              <option value="all">{t.searchScope.all}</option>
              <option value="users">{t.searchScope.users}</option>
              <option value="projects">{t.searchScope.projects}</option>
              <option value="datasets">{t.searchScope.datasets}</option>
            </select>

            {showResults && (

              <div className="search-results">
                {['all', 'users'].includes(searchScope) && (
                  <>
                    <h4>{t.searchResults.users}</h4>
                    {results.users?.length > 0 ? (
                      results.users.map((user) => (
                        <Link key={user.id} to={`/profile/${user.id}`} className="result-link">
                          👤 {user.name}
                        </Link>
                      ))
                    ) : (
                      <div className="text-muted">{t.searchResults.noUsers}</div>
                    )}
                    {searchScope === 'all' && <hr />}
                  </>
                )}

                {['all', 'projects'].includes(searchScope) && (
                  <>
                    <h4>{t.searchResults.projects}</h4>
                    {results.projects?.length > 0 ? (
                      results.projects.map((project) => (
                        <Link key={project.id} to={`/projects/${project.id}`} className="result-link">
                          📁 {project.title}
                        </Link>
                      ))
                    ) : (
                      <div className="text-muted">{t.searchResults.noProjects}</div>
                    )}
                    {searchScope === 'all' && <hr />}
                  </>
                )}

                {['all', 'datasets'].includes(searchScope) && (
                  <>
                    <h4>{t.searchResults.datasets}</h4>
                    {results.datasets?.length > 0 ? (
                      results.datasets.map((dataset) => (
                        <Link key={dataset.id} to={`/datasets/${dataset.id}`} className="result-link">
                          📊 {dataset.title}
                        </Link>
                      ))
                    ) : (
                      <div className="text-muted">{t.searchResults.noDatasets}</div>
                    )}
                  </>
                )}
              </div>

            )}

          </div>

          <div className="language-toggle">
            <button
              type="button"
              className={`lang-btn ${language === 'ru' ? 'active' : ''}`}
              onClick={() => setLanguage('ru')}
            >
              RU
            </button>
            <button
              type="button"
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              ENG
            </button>
          </div>

          {/* Profile */}

          <div className="profile-menu-container" ref={menuRef}>
            <button
              type="button"
              className="profile-link profile-button"
              onClick={() => setShowUserMenu((prev) => !prev)}
            >
              {user?.avatar ? (
                <img
                  src={normalizeAvatarUrl(user.avatar)}
                  alt="avatar"
                  className="avatar"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div className="avatar">{user?.name ? user.name[0].toUpperCase() : 'U'}</div>
              )}

              <div>
                <div className="profile-name">
                  {user?.name}
                </div>
                <div className="profile-role">
                  Researcher
                </div>
              </div>
            </button>

            {showUserMenu && (
              <div className="profile-menu-dropdown">
                <Link to="/profile" className="profile-menu-item">
                  {t.userMenu.profile}
                </Link>
                <Link to="/favorites/datasets" className="profile-menu-item">
                  {t.userMenu.favoriteDatasets}
                </Link>
                <Link to="/favorites/projects" className="profile-menu-item">
                  {t.userMenu.favoriteProjects}
                </Link>
                <div className="profile-menu-divider" />
                <Link to="/settings" className="profile-menu-item">
                  {t.userMenu.settings}
                </Link>
              </div>
            )}
          </div>

        </header>

        {/* Page */}

        <main className="page-main">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default Layout;