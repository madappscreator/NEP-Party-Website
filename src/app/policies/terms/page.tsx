'use client';

import { useLanguage } from '@/context/language-context';
import Link from 'next/link';

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-primary hover:underline mb-6 inline-flex items-center gap-2">
          <span>←</span> {t('common_back_to_home') || 'Back to Home'}
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-slate-900">
            Terms & Conditions
          </h1>
          <p className="text-slate-600 mb-8 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Acceptance of Terms</h2>
              <p className="text-slate-700 leading-relaxed">
                By accessing and using the National Ex-Servicemen Party (NEP) website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Membership Terms</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Eligibility</h3>
                  <p className="text-slate-700">
                    Membership is open to all Indian citizens who support the party's ideology and objectives. Members must be at least 18 years of age and provide accurate information during registration.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Membership Fees</h3>
                  <p className="text-slate-700">
                    Membership fees are non-refundable except as provided in our refund policy. Annual membership fees are subject to change with prior notice to existing members.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Member Responsibilities</h3>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain membership in good standing</li>
                    <li>Adhere to party constitution and guidelines</li>
                    <li>Respect fellow members and party officials</li>
                    <li>Participate in party activities when possible</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Website Usage</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Permitted Use</h3>
                  <p className="text-slate-700">
                    You may use our website for personal, non-commercial purposes including:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Viewing party information and news</li>
                    <li>Registering for membership</li>
                    <li>Making donations to support party activities</li>
                    <li>Accessing member-only content (for registered members)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Prohibited Activities</h3>
                  <p className="text-slate-700">
                    You agree not to:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Use the website for any unlawful purpose</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Distribute malware or harmful code</li>
                    <li>Harass, abuse, or harm other users</li>
                    <li>Post false or misleading information</li>
                    <li>Violate intellectual property rights</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
              <p className="text-slate-700 leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property of National Ex-Servicemen Party or its content suppliers and is protected by Indian and international copyright laws. You may not reproduce, distribute, or create derivative works without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Disclaimer</h2>
              <p className="text-slate-700 leading-relaxed">
                The information on this website is provided on an "as is" basis. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
              <p className="text-slate-700 leading-relaxed">
                In no event will National Ex-Servicemen Party be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Governing Law</h2>
              <p className="text-slate-700 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to Terms</h2>
              <p className="text-slate-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this website. Your continued use of the website after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
              <p className="text-slate-700">
                For questions about these Terms & Conditions, please contact us:
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
