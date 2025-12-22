'use client';

import { useLanguage } from '@/context/language-context';
import Link from 'next/link';

export default function CancellationPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-primary hover:underline mb-6 inline-flex items-center gap-2">
          <span>←</span> {t('common_back_to_home') || 'Back to Home'}
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-slate-900">
            Cancellation Policy
          </h1>
          <p className="text-slate-600 mb-8 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Membership Cancellation</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Voluntary Cancellation</h3>
                  <p className="text-slate-700">
                    Members may request cancellation of their membership at any time. However, membership fees are non-refundable as per our refund policy. Cancelled memberships will remain inactive and cannot be reactivated.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">How to Cancel</h3>
                  <p className="text-slate-700">
                    To cancel your membership, please contact us through one of the following methods:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Email: <a href="mailto:allindianep@gmail.com" className="text-primary hover:underline">allindianep@gmail.com</a> with subject "Membership Cancellation"</li>
                    <li>Phone: <a href="tel:+919176101115" className="text-primary hover:underline">+91 91761 01115</a> or <a href="tel:+919176102229" className="text-primary hover:underline">+91 91761 02229</a></li>
                    <li>Written request sent to our office address</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Required Information</h3>
                  <p className="text-slate-700">
                    Include the following details in your cancellation request:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Full name and membership ID</li>
                    <li>Reason for cancellation (optional)</li>
                    <li>Date of original registration</li>
                    <li>Contact information for confirmation</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Service Cancellation</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Ongoing Services</h3>
                  <p className="text-slate-700">
                    If you have any ongoing services or subscriptions with NEP, you may cancel them by contacting our support team. Cancellation will be effective immediately, but fees paid for the current period are non-refundable.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Event Registrations</h3>
                  <p className="text-slate-700">
                    Event registration cancellations must be made at least 7 days before the event date for a full refund. Cancellations made within 7 days of the event may be subject to cancellation fees.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Automatic Cancellation</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Non-Payment</h3>
                  <p className="text-slate-700">
                    Memberships may be automatically cancelled if annual renewal fees are not paid within the grace period specified in renewal notices.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Violation of Terms</h3>
                  <p className="text-slate-700">
                    NEP reserves the right to cancel memberships that violate our terms of service, code of conduct, or engage in activities detrimental to the party.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Inactive Accounts</h3>
                  <p className="text-slate-700">
                    Accounts that remain inactive for an extended period may be subject to automatic cancellation. Members will be notified before such action is taken.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Effects of Cancellation</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Access Rights</h3>
                  <p className="text-slate-700">
                    Upon cancellation, you will lose access to:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Member-only content and resources</li>
                    <li>Party communications and newsletters</li>
                    <li>Voting rights in party elections</li>
                    <li>Participation in member-exclusive events</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Data Retention</h3>
                  <p className="text-slate-700">
                    We will retain your basic membership information for record-keeping purposes as required by law. Personal data will be handled according to our Privacy Policy.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Rejoining</h3>
                  <p className="text-slate-700">
                    Cancelled members who wish to rejoin must submit a new membership application and pay the current membership fees. Previous membership history may be considered.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Processing Timeline</h2>
              <p className="text-slate-700 leading-relaxed">
                Cancellation requests are typically processed within 3-5 business days. You will receive a confirmation email once the cancellation is complete. During this processing period, your membership status may remain active.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Appeals Process</h2>
              <p className="text-slate-700 leading-relaxed">
                If you believe your membership was cancelled in error or disagree with an automatic cancellation, you may appeal the decision by contacting our administrative office within 30 days of the cancellation notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
              <p className="text-slate-700">
                For cancellation requests and related queries, please contact us:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-slate-700">
                  <strong>Email:</strong> <a href="mailto:allindianep@gmail.com" className="text-primary hover:underline">allindianep@gmail.com</a>
                </p>
                <p className="text-slate-700">
                  <strong>Phone:</strong> <a href="tel:+919176101115" className="text-primary hover:underline">+91 91761 01115</a>
                </p>
                <p className="text-slate-700">
                  <strong>Address:</strong> A4, Vishwaa Pride Apartment, Nookampalayam Main Road, Perumbakkam, Chennai - 600100, Tamil Nadu, India
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
