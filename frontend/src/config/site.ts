import axios from 'axios';

const baseUrl = 'http://localhost:8080';
axios.defaults.baseURL = baseUrl;

export type SiteConfig = typeof siteConfig;
export type ApiConfig = typeof apiConfig;
export type BotConfig = typeof botConfig;

export const siteConfig = {
  name: 'Watch',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
  ],
  navMenuItems: [
    {
      label: 'Profile',
      href: '/profile',
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
    {
      label: 'Team',
      href: '/team',
    },
    {
      label: 'Calendar',
      href: '/calendar',
    },
    {
      label: 'Settings',
      href: '/settings',
    },
    {
      label: 'Help & Feedback',
      href: '/help-feedback',
    },
    {
      label: 'Studio',
      href: '/studio',
    },
    {
      label: 'Logout',
      href: '/logout',
    },
  ],
  links: {
    github: 'https://github.com/volxdya/watch-app',
    discord: 'https://discord.gg/9b6yyZKmH4',
  },
};

export const apiConfig = {
  baseUrl: `${baseUrl}/api`,
};

export const botConfig = {
  url: 'https://t.me/watchpp_bot',
};
