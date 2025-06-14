// app/auth/verify/page.tsx

"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmail } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";

function VerificationComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState(
    "Verifying your account, please wait..."
  );

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    if (!token || !userId) {
      setMessage("Invalid verification link.");
      setStatus("error");
      return;
    }

    const handleVerification = async () => {
      try {
        const response = await verifyEmail(token, userId);
        setMessage(
          response.message ||
            "Account verified successfully! You will be redirected to login page shortly."
        );
        setStatus("success");

        setTimeout(() => {
          router.push("/auth/login");
        }, 5000);
      } catch (err: any) {
        setMessage(
          err.message ||
            "Verification failed. The link might be invalid or has expired."
        );
        setStatus("error");
      }
    };

    handleVerification();
  }, [searchParams, router]);

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader className="items-center space-y-3">
        {status === "loading" && (
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        )}
        {status === "success" && (
          <CheckCircle className="h-12 w-12 text-green-500" />
        )}
        {status === "error" && (
          <XCircle className="h-12 w-12 text-destructive" />
        )}

        <CardTitle className="mt-4 text-2xl">
          {status === "loading" && "Verifying..."}
          {status === "success" && "Verification Successful!"}
          {status === "error" && "Verification Failed"}
        </CardTitle>
        <CardDescription className="text-base">{message}</CardDescription>
      </CardHeader>
      <CardContent>
        {status !== "loading" && (
          <Button asChild className="w-full text-white">
            <Link href="/auth/login">Go to Login</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function VerifyPage() {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <Card>
            <CardHeader>
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
              <CardDescription className="mt-2">
                Loading verification...
              </CardDescription>
            </CardHeader>
          </Card>
        }
      >
        <VerificationComponent />
      </Suspense>
    </AuthLayout>
  );
}
