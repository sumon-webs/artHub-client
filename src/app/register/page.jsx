import { SignupForm } from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50 dark:bg-slate-950 transition-colors">
      <SignupForm />
    </div>
  );
};

export default RegisterPage;