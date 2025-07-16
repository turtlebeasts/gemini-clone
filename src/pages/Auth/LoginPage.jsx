import { useState } from "react";
import LoginForm from "../../components/Auth/LoginForm";
import OtpVerificationPage from "../../components/Auth/OtpVerification";
import SuccessCard from "../../components/Auth/SuccessCard";

export default function LoginPage() {
  const [isFormSubmit, setSubmit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) return <SuccessCard />;
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      {isFormSubmit ? (
        <OtpVerificationPage onSubmit={setLoggedIn} />
      ) : (
        <LoginForm setSubmit={setSubmit} />
      )}
    </div>
  );
}
