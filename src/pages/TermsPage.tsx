"use client";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero relative">
      <div className="relative z-10 container mx-auto px-4 py-8 xl:py-16">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-white hover:text-white/80 hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 xl:p-12">
          <h1 className="text-3xl xl:text-4xl font-bold text-blue-600 mb-2">
            TERMS & CONDITIONS
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: 26 November 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Introduction
              </h2>
              <p className="text-gray-700">
                Welcome to Companion, a product operated by Entrext, a startup based in Mumbai, Maharashtra. By accessing or using our website, mobile application, or any service ("Services"), you agree to these Terms & Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Definitions
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>"Company", "we", "our" → Entrext</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>"App" → Companion</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>"User", "you" → Anyone accessing or using the Services</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>"Platform" → All websites, apps, dashboards, features, and tools operated by Entrext</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Eligibility & Use of Services
              </h2>
              <p className="text-gray-700 mb-3">Users must be at least 13 years old.</p>
              <p className="text-gray-700 mb-3">You agree not to:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Reverse-engineer, copy, or misuse the app</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Upload harmful or abusive content</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Violate intellectual property rights</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Attempt unauthorized access</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-3">We may suspend or terminate accounts violating any terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. User Accounts
              </h2>
              <p className="text-gray-700 mb-3">You are responsible for:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Keeping your login secure</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Providing accurate information</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>All activity under your account</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Intellectual Property Rights
              </h2>
              <p className="text-gray-700 mb-3">
                All design, content, branding, code, and materials belong to Entrext and are protected by copyright and trademark laws.
              </p>
              <p className="text-gray-700">
                You may not reproduce, copy, or distribute our content without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Payments & Billing
              </h2>
              <p className="text-gray-700 mb-3">
                All payments are processed securely through Paddle, our Merchant of Record (MoR).
              </p>
              <p className="text-gray-700 mb-3">By making a purchase, you agree to:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Paddle's Buyer Terms</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Taxes & VAT handled by Paddle</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>No card details stored by Entrext</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Subscriptions renew automatically unless cancelled</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Subscription Rules
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Cancel anytime through Paddle</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Access remains active until period ends</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>No partial refunds after the 14-day window</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Refund Policy
              </h2>
              <p className="text-gray-700 mb-3">
                We follow Paddle's standard 14-day refund policy.
              </p>
              <p className="text-gray-700">
                Refund may be requested if claimed within 14 days of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-gray-700 mb-3">Entrext is not responsible for:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Indirect losses</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Data loss</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Third-party issues</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Service outages or interruptions</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Changes to Terms
              </h2>
              <p className="text-gray-700 mb-3">
                Terms may be updated anytime.
              </p>
              <p className="text-gray-700">
                Continued use of the platform = acceptance of changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Contact Information
              </h2>
              <p className="text-gray-700 mb-2">
                Email:{" "}
                <a
                  href="mailto:support@entrext.in"
                  className="text-blue-600 hover:underline font-medium"
                >
                  support@entrext.in
                </a>
              </p>
              <p className="text-gray-700">
                Location: Mumbai, Maharashtra
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              For any questions regarding these terms, please contact us at{" "}
              <a
                href="mailto:support@entrext.in"
                className="text-blue-600 hover:underline font-medium"
              >
                support@entrext.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
