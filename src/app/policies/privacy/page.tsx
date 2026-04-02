'use client';

import { useLanguage } from '@/context/language-context';
import Link from 'next/link';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-primary hover:underline mb-6 inline-flex items-center gap-2">
          <span>←</span> {t('common_back_to_home')}
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-slate-900">
            {t('footer_privacy') || 'Privacy Policy'}
          </h1>
          <p className="text-slate-600 mb-8 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
              <p className="text-slate-700 leading-relaxed">
                National Ex-Servicemen Party (NEP) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Personal Information</h3>
                  <p className="text-slate-700">
                    We collect information you provide directly, such as:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Name and contact information</li>
                    <li>Phone number and email address</li>
                    <li>Date of birth and gender</li>
                    <li>Address and location information</li>
                    <li>Payment information for membership registration</li>
                    <li>Document uploads (Aadhar, PPO, etc.)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Automatically Collected Information</h3>
                  <p className="text-slate-700">
                    When you use our website, we automatically collect:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Log files and browsing history</li>
                    <li>Device information and IP address</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>User interaction data</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-slate-700 space-y-2">
                <li>Process membership applications and registrations</li>
                <li>Verify member identity and documents</li>
                <li>Process payments and donations</li>
                <li>Send updates and communications</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Protection</h2>
              <p className="text-slate-700 leading-relaxed">
                We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All sensitive data is encrypted and stored securely using Firebase's secure servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Sharing Your Information</h2>
              <p className="text-slate-700 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share information only when:
              </p>
              <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                <li>Required by law or legal process</li>
                <li>To protect our rights and safety</li>
                <li>With trusted service providers who assist in our operations</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Rights</h2>
              <p className="text-slate-700 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                <li>Access your personal information</li>
                <li>Request corrections or updates</li>
                <li>Delete your data (where applicable)</li>
                <li>Opt-out of communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
              <p className="text-slate-700">
                For privacy concerns, please contact us at:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-slate-700">
                  <strong>Email:</strong> <a href="mailto:allindianep@gmail.com" className="text-primary hover:underline">allindianep@gmail.com</a>
                </p>
                <p className="text-slate-700">
                  <strong>Phone:</strong> <a href="tel:+919176101115" className="text-primary hover:underline">+91 91761 01115</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
