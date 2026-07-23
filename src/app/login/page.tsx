import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 gap-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2">
        {/* Poster — hidden on small screens */}
        <div className="relative hidden lg:flex flex-col justify-center px-12 bg-cream">
          <Image
            src="/images/ui-images/sign-page-bg.png"
            alt="Vilaura clothing"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
          <div className="relative z-10 max-w-sm">
            <h1 className="font-display text-4xl leading-tight text-ink">
              Welcome back to Vilaura
            </h1>
            <div className="flex items-center gap-3 my-5">
              <span className="h-px w-10 bg-accent-dark" />
              <span className="h-1.5 w-1.5 rotate-45 bg-accent-dark" />
              <span className="h-px w-10 bg-accent-dark" />
            </div>
            <p className="text-gray-700">
              Timeless style. Thoughtful comfort. Curated for the way you live.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-14">
          <div className="mx-auto w-full max-w-sm">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl text-ink">Customer Login</h1>
              <p className="mt-2 text-sm text-gray-500">Sign in to continue shopping</p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-500">
        <ShieldCheck size={18} className="text-accent-dark" />
        <div>
          <span className="font-medium text-ink">Secure login. </span>
          Your information is protected and encrypted.
        </div>
      </div>
    </div>
  );
}