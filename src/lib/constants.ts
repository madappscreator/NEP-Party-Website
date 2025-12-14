import type { NavItem, Language, ManifestoPoint, Member, Donation } from './types';

export const NAV_LINKS: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/news', label: 'News' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
  { href: '/design-card', label: 'Member Card' },
];

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'ta', name: 'Tamil' },
];

export const ADMIN_NAV_LINKS: NavItem[] = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { href: '/admin/dashboard/members', label: 'Members', icon: 'Users' },
    { href: '/admin/dashboard/donations', label: 'Donations', icon: 'Heart' },
];

export const OUR_PROMISE_POINTS: ManifestoPoint[] = [
    {
      title: 'Veteran Welfare',
      description: 'Priority jobs & welfare for retired defence personnel.',
      icon: 'Shield',
    },
    {
      title: 'Free Education',
      description: 'Ensure 100% free and high-quality public education.',
      icon: 'GraduationCap',
    },
    {
      title: 'Water & Environment',
      description: 'Restore water bodies & protect forests and wildlife.',
      icon: 'Droplets',
    },
  ];

  export const WHY_JOIN_POINTS = [
    {
      title: 'Ex-Servicemen Led',
      description: 'Founded and led by honorable ex-servicemen of Indian Armed Forces.',
      icon: 'Shield',
    },
    {
      title: 'For Everyone',
      description: 'Open to all citizens with 22 different wings for various professions.',
      icon: 'Users',
    },
    {
      title: 'Clear Vision',
      description: 'Focused on development, welfare, and good governance.',
      icon: 'Goal',
    },
    {
      title: 'Service First',
      description: 'Dedicated to serving the people of the nation.',
      icon: 'Heart',
    },
  ];

  export const OUR_WINGS = [
    'Ex-Servicemen Wing',
    'Youth Wing',
    'Women’s Wing',
    'Farmers Wing',
    'Students Wing',
    'Teachers Wing',
  ];

export const DUMMY_MEMBERS: Member[] = [
    { id: '1', name: 'Col. Rajesh Kumar', state: 'Punjab', constituency: 'Amritsar', status: 'Approved' },
    { id: '2', name: 'Subedar Major Singh', state: 'Haryana', constituency: 'Rohtak', status: 'Pending' },
    { id: '3', name: 'Sgt. Priya Sharma', state: 'Maharashtra', constituency: 'Pune', status: 'Approved' },
    { id: '4', name: 'Cpt. Arjun Reddy', state: 'Telangana', constituency: 'Hyderabad', status: 'Pending' },
    { id: '5', name: 'Havildar Anbu Selvan', state: 'Tamil Nadu', constituency: 'Chennai South', status: 'Approved' },
];

export const DUMMY_DONATIONS: Donation[] = [
    { id: 'DON001', donorName: 'Ramesh Gupta', amount: 5000, date: '2024-07-28', status: 'Verified' },
    { id: 'DON002', donorName: 'Anonymous', amount: 1000, date: '2024-07-28', status: 'Pending' },
    { id: 'DON003', donorName: 'Sunita Williams', amount: 2500, date: '2024-07-27', status: 'Verified' },
    { id: 'DON004', donorName: 'M. Anand', amount: 10000, date: '2024-07-26', status: 'Verified' },
];