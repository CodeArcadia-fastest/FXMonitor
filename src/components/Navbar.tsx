import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, ChevronDownIcon, HomeIcon, InformationCircleIcon, HeartIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { GlobeAltIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'rus', name: 'Русский' },
    { code: 'eng', name: 'English' },
    { code: 'uzb', name: 'Oʻzbekcha' },
    { code: 'turk', name: 'Türkçe' },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black shadow-lg py-1'
          : 'bg-black backdrop-blur-sm py-1.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Logo and site name */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-lg font-bold text-white">
              FXMonitor
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-8 flex items-center space-x-6">
              <a
                href="#"
                className="flex items-center text-white hover:text-blue-400 px-2 py-0.5 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <HomeIcon className="h-4 w-4 mr-1 text-white hover:text-blue-400" />
                Home
              </a>
              <a
                href="#"
                className="flex items-center text-white hover:text-blue-400 px-2 py-0.5 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <InformationCircleIcon className="h-4 w-4 mr-1 text-white hover:text-blue-400" />
                About
              </a>
              <a
                href="#Donate"
                className="flex items-center text-yellow-400 hover:text-yellow-300 px-2 py-0.5 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <HeartIcon className="h-4 w-4 mr-1 text-yellow-400 hover:text-yellow-300" />
                Donate
              </a>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className="flex items-center text-white hover:text-blue-400 px-2 py-0.5 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  <GlobeAltIcon className="h-4 w-4 mr-1 text-white hover:text-blue-400" />
                  {selectedLanguage.code.toUpperCase()}
                  <ChevronDownIcon
                    className={`ml-1 h-3 w-3 text-white hover:text-blue-400 transition-transform duration-200 ${
                      languageOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {languageOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-black rounded-md shadow-lg py-0.5 z-50 border border-gray-700">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setLanguageOpen(false);
                        }}
                        className={`block px-3 py-1 text-sm w-full text-left ${
                          selectedLanguage.code === lang.code
                            ? 'bg-blue-900 text-blue-400'
                            : 'text-white hover:bg-gray-800 hover:text-blue-400'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dark/Light Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-1 rounded-full text-white hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <SunIcon className="h-4 w-4 text-white hover:text-blue-400" />
                ) : (
                  <MoonIcon className="h-4 w-4 text-white hover:text-blue-400" />
                )}
              </button>

              {/* Auth Buttons */}
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="flex items-center px-3 py-0.5 rounded-md text-sm font-medium text-yellow-400 border border-yellow-600/50 hover:bg-yellow-600/20 hover:text-yellow-300 transition-all duration-300 shadow-sm hover:shadow-yellow-500/30"
                >
                  <UserIcon className="h-4 w-4 mr-1 text-yellow-400 hover:text-yellow-300" />
                  Login
                </a>
                <a
                  href="#"
                  className="flex items-center px-3 py-0.5 rounded-md text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 shadow-md hover:shadow-yellow-500/50"
                >
                  <UserPlusIcon className="h-4 w-4 mr-1 text-white" />
                  Sign Up
                </a>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 rounded-full text-white hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black shadow-lg rounded-b-lg transition-all duration-300">
          <div className="px-2 pt-1 pb-2 space-y-1 sm:px-3">
            <a
              href="#"
              className="flex items-center px-3 py-0.5 rounded-md text-sm font-medium text-white hover:bg-gray-800 hover:text-blue-400"
            >
              <HomeIcon className="h-4 w-4 mr-2 text-white hover:text-blue-400" />
              Home
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-0.5 rounded-md text-sm font-medium text-white hover:bg-gray-800 hover:text-blue-400"
            >
              <InformationCircleIcon className="h-4 w-4 mr-2 text-white hover:text-blue-400" />
              About
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-0.5 rounded-md text-sm font-medium text-yellow-400 hover:bg-gray-800 hover:text-yellow-300"
            >
              <HeartIcon className="h-4 w-4 mr-2 text-yellow-400 hover:text-yellow-300" />
              Donate
            </a>

            {/* Language Selector Mobile */}
            <div className="px-3 py-0.5">
              <p className="text-xs font-medium text-white mb-1">
                Language
              </p>
              <div className="grid grid-cols-2 gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                      selectedLanguage.code === lang.code
                        ? 'bg-blue-900 text-blue-400'
                        : 'text-white hover:bg-gray-800 hover:text-blue-400'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Mode Toggle Mobile */}
            <div className="px-3 py-0.5 flex items-center justify-between">
              <span className="text-xs font-medium text-white">
                Dark Mode
              </span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="relative inline-flex h-4 w-8 items-center rounded-full bg-gray-700 transition-colors duration-200"
              >
                <span
                  className={`inline-block h-2 w-2 transform rounded-full bg-white transition-transform duration-200 ${
                    darkMode ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Auth Buttons Mobile */}
            <div className="px-3 pt-1 pb-2 space-y-1">
              <a
                href="#"
                className="flex items-center w-full px-3 py-0.5 text-center rounded-md text-sm font-medium text-yellow-400 border border-yellow-600/50 hover:bg-yellow-600/20 hover:text-yellow-300 transition-all duration-300 shadow-sm hover:shadow-yellow-500/30"
              >
                <UserIcon className="h-4 w-4 mr-2 text-yellow-400 hover:text-yellow-300" />
                Login
              </a>
              <a
                href="#"
                className="flex items-center w-full px-3 py-0.5 text-center rounded-md text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 shadow-md hover:shadow-yellow-500/50"
              >
                <UserPlusIcon className="h-4 w-4 mr-2 text-white" />
                Sign Up
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;