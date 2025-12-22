'use client';

import { useLanguage } from '@/context/language-context';
import Link from 'next/link';

export default function RefundPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-primary hover:underline mb-6 inline-flex items-center gap-2">
          <span>←</span> {t('common_back_to_home') || 'Back to Home'}
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-slate-900">
            Refund Policy
          </h1>
          <p className="text-slate-600 mb-8 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
              <p className="text-slate-700 leading-relaxed">
                National Ex-Servicemen Party (NEP) is committed to providing quality services to our members and supporters. This Refund Policy outlines the conditions under which refunds may be granted for membership fees, donations, and other services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Membership Fees</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">General Policy</h3>
                  <p className="text-slate-700">
                    Membership fees are generally non-refundable once the membership application has been approved and the membership card has been issued. This policy ensures the sustainability of party operations and activities.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Exceptional Circumstances</h3>
                  <p className="text-slate-700">
                    Refunds may be considered in the following exceptional cases:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Technical errors in payment processing</li>
                    <li>Duplicate payments</li>
                    <li>Membership applications rejected due to administrative errors</li>
                    <li>Death of the member (with proper documentation)</li>
                    <li>Court orders or legal requirements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Processing Fees</h3>
                  <p className="text-slate-700">
                    In cases where refunds are approved, a processing fee of ₹100 may be deducted to cover administrative costs. Payment gateway charges are non-refundable.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Donations</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Voluntary Contributions</h3>
                  <p className="text-slate-700">
                    All donations to NEP are voluntary contributions made to support our mission and activities. Donations are generally non-refundable as they are used to fund party operations, community service, and welfare activities.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Exceptional Cases</h3>
                  <p className="text-slate-700">
                    Refund requests for donations may be considered in rare circumstances such as:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Payment made under duress or fraudulent circumstances</li>
                    <li>Technical errors in the donation process</li>
                    <li>Donations made for specific purposes that were not fulfilled</li>
                    <li>Legal requirements or court orders</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Event Registrations and Tickets</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Cancellation Timeline</h3>
                  <ul className="list-disc list-inside text-slate-700 space-y-2">
                    <li><strong>More than 30 days before event:</strong> Full refund</li>
                    <li><strong>15-30 days before event:</strong> 75% refund</li>
                    <li><strong>7-14 days before event:</strong> 50% refund</li>
                    <li><strong>Less than 7 days before event:</strong> No refund</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Event Cancellations</h3>
                  <p className="text-slate-700">
                    If NEP cancels or postpones an event, full refunds will be provided. Alternative arrangements will be offered where possible.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Request a Refund</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Contact Information</h3>
                  <p className="text-slate-700">
                    To request a refund, please contact us with the subject "Refund Request":
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-slate-700">
                      <strong>Email:</strong> <a href="mailto:allindianep@gmail.com" className="text-primary hover:underline">allindianep@gmail.com</a>
                    </p>
                    <p className="text-slate-700">
                      <strong>Phone:</strong> <a href="tel:+919176101115" className="text-primary hover:underline">+91 91761 01115</a>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Required Information</h3>
                  <p className="text-slate-700">
                    Please include the following details in your refund request:
                  </p>
                  <ul className="list-disc list-inside text-slate-700 mt-2 space-y-2">
                    <li>Full name and contact information</li>
                    <li>Transaction ID or receipt number</li>
                    <li>Date and amount of payment</li>
                    <li>Detailed reason for the refund request</li>
                    <li>Any supporting documentation</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Processing Timeline</h2>
              <p className="text-slate-700 leading-relaxed">
                Refund requests are reviewed within 7-10 business days of receipt. Approved refunds are processed within 14-21 business days, depending on your payment method and bank processing times. You will receive email confirmation once the refund is initiated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Refund Methods</h2>
              <p className="text-slate-700 leading-relaxed">
                Refunds will be processed using the same payment method used for the original transaction where possible. In cases where the original payment method is unavailable, refunds may be issued via bank transfer or other secure methods.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Appeals Process</h2>
              <p className="text-slate-700 leading-relaxed">
                If your refund request is denied, you may appeal the decision by providing additional documentation or information. Appeals must be submitted within 30 days of the denial notification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
              <p className="text-slate-700">
                For refund requests and related queries, please contact us:
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
