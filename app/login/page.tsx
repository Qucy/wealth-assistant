import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
         style={{backgroundImage: "url('/images/login-background.jpg')"}}>
      <LoginForm />
      <div className="absolute bottom-5 text-white text-sm">
        © 2024 Wealth Assistant. All rights reserved.
      </div>
    </div>
  );
}