import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function RefundPage() {
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
            REFUND & CANCELLATION POLICY
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: 26 November 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Standard Refund Policy
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>Entrext follows Paddle's 14-day refund policy.</p>
                <p>Refunds apply if requested within 14 days from date of purchase.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Subscription Cancellations
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Cancel anytime via Paddle</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Access remains active till the end of the billing cycle</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>No prorated refunds after 14 days</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Refund Request Process
              </h2>
              <p className="text-gray-700 mb-3">You may request a refund via:</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Paddle portal (link in your receipt)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>
                    Email:{" "}
                    <a
                      href="mailto:support@entrext.in"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      support@entrext.in
                    </a>
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Exceptional Cases
              </h2>
              <p className="text-gray-700 mb-3">Refunds may be granted for:</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Duplicate charges</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Accidental renewal</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-blue-600 font-bold">•</span>
                  <span>Technical issues preventing usage</span>
                </li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              For any questions regarding refunds, please contact us at{" "}
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
