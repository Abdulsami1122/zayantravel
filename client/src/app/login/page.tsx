import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:[grid-template-columns:45%_55%] bg-white text-slate-900">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block border-3 border-slate-200 bg-slate-50">
        <img
          src="/zayan_poster.png"
          alt="Zayan Travel Consultants Poster"
          className="absolute inset-0 h-full w-full object-contain p-4"
        />
      </div>
    </div>
  )
}
