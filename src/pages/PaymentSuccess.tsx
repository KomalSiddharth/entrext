"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { verifyStripePayment } from "@/db/api";
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setStatus("error");
      setErrorMessage("No payment session found");
      return;
    }

    verifyPayment(sessionId);
  }, [searchParams]);

  const verifyPayment = async (sessionId: string) => {
    try {
      const response = await verifyStripePayment(sessionId);

      if (response.data?.verified) {
        setStatus("success");
        setPaymentDetails(response.data);
      } else {
        setStatus("error");
        setErrorMessage("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to verify payment. Please contact support."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full bg-card border-border">
        <CardHeader className="text-center">
          {status === "loading" && (
            <>
              <div className="flex justify-center mb-4">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
              </div>
              <CardTitle className="text-2xl xl:text-3xl text-foreground">
                Verifying Payment...
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Please wait while we confirm your payment
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl xl:text-3xl text-foreground">
                Payment Successful! 🎉
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Thank you for subscribing to Companion
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-destructive" />
                </div>
              </div>
              <CardTitle className="text-2xl xl:text-3xl text-foreground">
                Payment Failed
              </CardTitle>
              <p className="text-muted-foreground mt-2">{errorMessage}</p>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {status === "success" && paymentDetails && (
            <>
              <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-foreground text-lg">Payment Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Amount Paid:</span>
                    <span className="font-semibold text-foreground">
                      ${(paymentDetails.amount / 100).toFixed(2)} {paymentDetails.currency?.toUpperCase()}
                    </span>
                  </div>
                  {paymentDetails.customerEmail && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-semibold text-foreground">
                        {paymentDetails.customerEmail}
                      </span>
                    </div>
                  )}
                  {paymentDetails.customerName && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-semibold text-foreground">
                        {paymentDetails.customerName}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Payment ID:</span>
                    <span className="font-mono text-xs text-foreground">
                      {paymentDetails.sessionId?.slice(0, 20)}...
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your email address. You can now access all premium features!
                </p>
              </div>

              <div className="flex flex-col xl:flex-row gap-3">
                <Button
                  onClick={() => navigate("/")}
                  className="flex-1"
                  size="lg"
                >
                  Go to Home
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  onClick={() => navigate("/#pricing")}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  View Pricing
                </Button>
              </div>
            </>
          )}

          {status === "error" && (
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => navigate("/billing")}
                className="w-full"
                size="lg"
              >
                Try Again
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Go to Home
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
