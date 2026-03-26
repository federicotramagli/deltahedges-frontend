import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthPage } from "@/components/ui/auth-page";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState<"login" | "signup" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [email, password, firstName, lastName, username, country, phone, isRegistering]);

  if (!loading && user) {
    return <Navigate to="/app" replace />;
  }

  async function handleLogin() {
    setSubmitting("login");
    setErrorMessage("");
    setInfoMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setSubmitting(null);
  }

  async function handleSignUp() {
    setSubmitting("signup");
    setErrorMessage("");
    setInfoMessage("");

    const missing = [];
    if (!firstName.trim()) missing.push("nome");
    if (!lastName.trim()) missing.push("cognome");
    if (!username.trim()) missing.push("username");
    if (!country.trim()) missing.push("nazione");
    if (!phone.trim()) missing.push("telefono");

    if (missing.length > 0) {
      setErrorMessage(`Compila prima: ${missing.join(", ")}.`);
      setSubmitting(null);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          full_name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          username: username.trim(),
          country: country.trim(),
          phone: phone.trim(),
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setSubmitting(null);
      return;
    }

    if (!data.session) {
      setInfoMessage(
        "Controlla la tua email per confermare l'account prima di accedere.",
      );
      setFirstName("");
      setLastName("");
      setUsername("");
      setCountry("");
      setPhone("");
      setEmail("");
      setPassword("");
      setIsRegistering(false);
    }

    setSubmitting(null);
  }

  return (
    <AuthPage
      isRegistering={isRegistering}
      email={email}
      password={password}
      firstName={firstName}
      lastName={lastName}
      username={username}
      country={country}
      phone={phone}
      submitting={submitting}
      errorMessage={errorMessage}
      infoMessage={infoMessage}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onFirstNameChange={setFirstName}
      onLastNameChange={setLastName}
      onUsernameChange={setUsername}
      onCountryChange={setCountry}
      onPhoneChange={setPhone}
      onModeChange={setIsRegistering}
      onLogin={handleLogin}
      onSignUp={handleSignUp}
    />
  );
}
