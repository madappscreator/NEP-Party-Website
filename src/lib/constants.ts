import type { NavItem, Language, NewsArticle, Member, Donation, ManifestoPoint } from './types';

export const NAV_LINKS: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#news', label: 'News' },
  { href: '/#manifesto', label: 'Manifesto' },
  { href: '/register', label: 'Join Us' },
  { href: '/donate', label: 'Donate' },
];

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'ta', name: 'Tamil' },
  { code: 'hi', name: 'Hindi' },
  { code: 'te', name: 'Telugu' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'kn', name: 'Kannada' },
];

export const ADMIN_NAV_LINKS: NavItem[] = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { href: '/admin/dashboard/members', label: 'Members', icon: 'Users' },
    { href: '/admin/dashboard/donations', label: 'Donations', icon: 'Heart' },
];

export const DUMMY_NEWS_ARTICLES: NewsArticle[] = [
    {
        id: '1',
        title: 'NEP Announces New Initiative for Veterans\' Healthcare',
        date: '2024-07-28',
        source: 'The National Times',
        imageId: 'news-1',
        content: `The National Ex-Servicemen Party (NEP) today unveiled a comprehensive healthcare plan aimed at providing better medical facilities for retired armed forces personnel and their families. The plan, dubbed 'Operation Heal,' includes provisions for specialized medical centers in every state, subsidized medicines, and mental health support programs. "Our veterans have given their best years to the nation, and it is our solemn duty to ensure they receive the best care in their retirement," said the party president during the announcement. The initiative has been widely welcomed by veterans' associations across the country, who see it as a long-overdue step. However, critics have raised questions about the funding and long-term sustainability of the program. The party has assured that the financial model is robust and will be funded through a combination of government grants and private donations.`
    },
    {
        id: '2',
        title: 'Election Commission Prepares for Upcoming State Elections',
        date: '2024-07-27',
        source: 'India Politics Watch',
        imageId: 'news-2',
        content: `With state elections just around the corner, the Election Commission of India is in full swing with preparations to ensure a free and fair polling process. This year sees the introduction of new voter-verified paper audit trail (VVPAT) machines across all constituencies. The commission has also launched a massive voter awareness campaign, urging citizens to exercise their democratic right. Political parties, including the NEP, are finalizing their candidate lists and ramping up their campaigns. The NEP has stated it will contest in over 50 constituencies, focusing on its core promise of good governance and national security.`
    },
    {
        id: '3',
        title: 'Parliament Monsoon Session to Discuss Key National Security Bills',
        date: '2024-07-26',
        source: 'The Parliamentary Post',
        imageId: 'news-3',
        content: `The upcoming monsoon session of Parliament is expected to be a stormy one, with several key bills related to national security on the agenda. The government plans to introduce new legislation to strengthen border control and modernize the armed forces. The opposition, while supporting the need for strong national security, has expressed concerns about potential infringements on civil liberties. The NEP has announced that it will critically evaluate the bills and propose amendments to safeguard the interests of both the nation and its citizens. "A balance between security and freedom is essential for a thriving democracy," a party spokesperson said.`
    },
    {
        id: '4',
        title: 'Public sentiment on new economic policies divided',
        date: '2024-07-25',
        source: 'Economic Express',
        imageId: 'news-4',
        content: `A recent nationwide survey has revealed a sharp divide in public opinion regarding the government's new economic policies. While supporters claim the policies will boost growth and create jobs, opponents argue they will lead to increased inflation and benefit only large corporations. The NEP has called for a more inclusive approach, suggesting measures to support small and medium-sized enterprises (SMEs) and the agricultural sector. The party plans to release its own economic vision document next week, which it says will offer a "pro-people, pro-growth" alternative.`
    }
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

export const MANIFESTO_POINTS: ManifestoPoint[] = [
    {
      title: 'National Security',
      description: 'Strengthening our armed forces with modern technology and ensuring the welfare of our soldiers, veterans, and their families.',
      icon: 'Shield',
      imageId: 'hero-1',
    },
    {
      title: 'Economic Prosperity',
      description: 'Promoting policies that foster job creation, support small businesses, and ensure sustainable agricultural growth for a self-reliant India.',
      icon: 'TrendingUp',
      imageId: 'manifesto-1',
    },
    {
      title: 'Healthcare for All',
      description: 'Building a robust public healthcare system that is accessible and affordable for every citizen, with a focus on rural and underserved areas.',
      icon: 'HeartPulse',
      imageId: 'manifesto-2',
    },
    {
      title: 'Quality Education',
      description: 'Revamping our education system to provide quality learning, skill development, and equal opportunities for all students.',
      icon: 'GraduationCap',
      imageId: 'manifesto-3',
    },
  ];
