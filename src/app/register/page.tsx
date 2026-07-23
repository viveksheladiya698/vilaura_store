import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2">
        {/* Poster — hidden on small screens */}
        <div className="relative hidden lg:block aspect-auto">
          <Image
            src="/images/ui-images/sign-page-bg.png"
            alt="Vilaura clothing"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>

        {/* Form */}
        <div className="flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-14">
          <div className="mx-auto w-full max-w-sm">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <span className="font-display text-2xl tracking-wide">VILAURA</span>
              </Link>
              <h1 className="mt-4 font-display text-3xl text-ink">Create your account</h1>
              <p className="mt-2 text-sm text-gray-500">
                Join Vilaura and discover timeless style curated for the way you live.
              </p>
            </div>

            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}