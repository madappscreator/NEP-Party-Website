---
description: Repository Information Overview
alwaysApply: true
---

# Allindianep NEP Platform - Repository Information

## Summary
A comprehensive Next.js-based membership platform for the National Education Policy (NEP) initiative. Features user registration with phone OTP authentication, membership profile management, real-time payment status tracking, admin approval workflow with automatic membership ID generation, and downloadable membership cards with QR codes.

## Structure
- **src/app**: Next.js app router pages and layouts (register, profile, admin, payment confirmation)
- **src/components**: Reusable React components (member-card, payment-status-tracker, UI components)
- **src/firebase**: Firebase authentication and Firestore integration (hooks, config, providers)
- **src/lib**: Utility functions, type definitions, geography data, and Firestore queries
- **src/locales**: Internationalization files (English, Hindi, Tamil, Telugu, Kannada, Malayalam)
- **public**: Static assets (NEP flag image, gallery images, UPI QR code)

## Language & Runtime
**Language**: TypeScript  
**Runtime**: Node.js 20+  
**Framework**: Next.js 15.5.9  
**Build System**: Next.js (with Turbopack)  
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- Firebase 11.10.0 (auth, firestore)
- React 19.2.1, React DOM 19.2.1
- Tailwind CSS 3.4.1 with custom NEP color theme
- Radix UI components (dialog, dropdown, tabs, forms)
- Lucide React icons
- jsPDF & html2canvas (membership card export)
- QR Code React (membership card verification)
- Recharts (admin dashboards)
- Genkit 1.20.0 (Google Genai integration)

**Development Dependencies**:
- TypeScript 5, Jest 29.7.0
- ESLint 9.39.2
- @testing-library/react 16.2.0

## Build & Installation
```bash
npm install
npm run build
npm run dev  # Start development server with Turbopack
npm start    # Start production server
npm run lint  # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

## Docker
No Dockerfile present.

## Testing
**Framework**: Jest 29.7.0  
**Test Location**: `src/**/*.test.ts(x)`  
**Naming Convention**: `*.test.ts` or `*.test.tsx`  
**Configuration**: `jest.config.ts`, `jest.setup.ts`

**Run Command**:
```bash
npm test        # Run all tests
npm run test:watch  # Watch mode
```

## Main Files & Entry Points
- **src/app/page.tsx**: Home page
- **src/app/register/page.tsx**: Member registration flow (6-step wizard)
- **src/app/profile/page.tsx**: Member profile with status banner and membership card
- **src/app/admin/dashboard/**: Admin panel with payment approvals and member management
- **src/app/api/member-card/route.ts**: Server endpoint for membership card generation
- **src/lib/firestore-queries.ts**: Firestore operations (approval workflow, ID generation)
- **src/components/member-card.tsx**: Membership card component with download options
- **src/components/payment-status-tracker.tsx**: Real-time payment status tracking

## Database & Configuration
**Firestore Collections**:
- `members`: User profiles with status, membership details, approval timestamps
- `members/{id}/payments`: Payment submissions with proof screenshots
- `membershipCounters`: Auto-increment counter for membership ID generation

**Firebase Configuration**: `.firebaserc`, `firebase.json`, `firestore.indexes.json`, `firestore.rules`

## NEP Theme Integration
**Color System** (defined in `globals.css` and `tailwind.config.ts`):
- NEP Blue: #31ADE5 (primary elements)
- NEP Green: #5B6B2F (secondary elements)
- NEP Orange: #FF6A00 (accent/CTA elements)

Colors exposed as Tailwind utilities: `bg-primary`, `text-secondary`, `border-accent`, etc.

## Internationalization
**Languages**: English, Hindi, Tamil, Telugu, Kannada, Malayalam  
**Configuration**: `i18n.config.ts`  
**Locale Files**: `src/locales/*.json`  
**Context**: `src/context/language-context.tsx`

## Key Features Implemented
- **Phone OTP Authentication**: Firebase Auth with SMS verification
- **Membership ID Generation**: Auto-format `NEP-{Year}-{Sequence}` (e.g., NEP-2025-100001)
- **Real-Time Status Updates**: Firestore `onSnapshot` listeners for instant member notifications
- **Admin Approval Workflow**: Payment verification, membership ID assignment, status updates
- **Membership Cards**: Professional card design with QR code, downloadable as PNG or PDF
- **Admin Dashboard**: Payment approvals, member management, pending approvals
- **Multi-Language Support**: Full i18n integration across all pages
