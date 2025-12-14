
import type { NavItem, Language, ManifestoPoint, Member, Donation, Album } from './types';

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

export const MANIFESTO_POINTS: ManifestoPoint[] = [
  {
    title: 'Education for All',
    description: 'Every Indian must have completed at least 12th grade education. No government benefits including driving license will be provided to those who are not educated.',
    icon: 'GraduationCap',
  },
  {
    title: 'Free Education & Healthcare',
    description: 'Education and healthcare are human rights, not just words. All schools and hospitals in the country will be nationalized. World-class education and healthcare will be provided 100% free and with quality.',
    icon: 'HeartPulse',
  },
  {
    title: 'Fast-Track Justice',
    description: 'Any case going to court will be resolved within a maximum of 3 years.',
    icon: 'Scale',
  },
  {
    title: 'Environment Protection',
    description: 'Strict legal action will be taken against those who violate forest, mountain, mineral resources, and wildlife protection laws.',
    icon: 'Leaf',
  },
  {
    title: 'Modern Farming',
    description: 'All farmers will be trained with modern agricultural machinery and converted to organic farming, making them government employees.',
    icon: 'Wheat',
  },
  {
    title: 'Full Employment',
    description: 'Due to agricultural labor shortage, 100-day work will be converted to full-time employment, making everyone government employees.',
    icon: 'Briefcase',
  },
  {
    title: 'Water Conservation',
    description: 'Lost lakes, ponds, and canals will be recovered and protected using giant machinery for de-silting.',
    icon: 'Droplets',
  },
  {
    title: 'Agniveer Priority',
    description: 'All Agniveers who complete 4 years of service will be given priority for police department jobs, reducing state government training costs.',
    icon: 'Award',
  },
  {
    title: 'Veterans Employment',
    description: 'All armed forces and paramilitary personnel will be guaranteed government or private employment based on qualification until age 60 after retirement.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Swift Criminal Justice',
    description: 'For crimes like sexual assault and murder, investigation will be completed within 30 days and death penalty will be given to the guilty.',
    icon: 'Hammer',
  },
  {
    title: 'Quality Roads',
    description: 'Quality roads will be built throughout the country, preventing spinal problems, neck pain, vehicle accidents, deaths, and vehicle repair issues for all taxpaying citizens.',
    icon: 'Route',
  },
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

/**
 * To populate the gallery, please update this GALLERY_ALBUMS array.
 * - `id`: A unique identifier for the album (e.g., the folder name).
 * - `name`: The display name of the album.
 * - `description`: A short description of the album.
 * - `coverImage`: The path to the album's cover image (e.g., /gallery/album-id/cover.jpg).
 * - `media`: An array of images and videos in the album.
 *   - `type`: 'image' or 'video'.
 *   - `url`: The path to the media file (e.g., /gallery/album-id/image1.jpg or /gallery/album-id/video1.mp4).
 *   - `alt`: A description for the media.
 */
export const GALLERY_ALBUMS: Album[] = [
  {
    id: 'public-rallies',
    name: 'Public Rallies',
    description: 'Snapshots from our public meetings and rallies across various states.',
    coverImage: '/gallery/public-rallies/cover.jpg', // Replace with your actual cover image path
    coverImageHint: 'political rally',
    media: [
      { type: 'image', url: '/gallery/public-rallies/image1.jpg', alt: 'A large crowd at a public rally', hint: 'public rally' },
      { type: 'image', url: '/gallery/public-rallies/image2.jpg', alt: 'Party leader addressing the public', hint: 'political speech' },
      { type: 'video', url: '/gallery/public-rallies/video1.mp4', alt: 'A video of the rally', hint: 'rally video' },
    ]
  },
  {
    id: 'community-outreach',
    name: 'Community Outreach',
    description: 'Engaging with local communities and understanding their needs.',
    coverImage: '/gallery/community-outreach/cover.jpg', // Replace with your actual cover image path
    coverImageHint: 'community meeting',
    media: [
      { type: 'image', url: '/gallery/community-outreach/image1.jpg', alt: 'Meeting with village elders', hint: 'village meeting' },
      { type: 'video', url: '/gallery/community-outreach/video1.mp4', alt: 'A video of the community outreach program', hint: 'community video' },
    ]
  },
  {
    id: 'party-meetings',
    name: 'Party Meetings',
    description: 'Internal meetings and strategy sessions with party members.',
    coverImage: '/gallery/party-meetings/cover.jpg', // Replace with your actual cover image path
    coverImageHint: 'office meeting',
    media: [
      { type: 'image', url: '/gallery/party-meetings/image1.jpg', alt: 'Party officials in a discussion', hint: 'board meeting' },
      { type: 'image', url: '/gallery/party-meetings/image2.jpg', alt: 'Planning session with youth wing', hint: 'planning session' },
    ]
  }
];
