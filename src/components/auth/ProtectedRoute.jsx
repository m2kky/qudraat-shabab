import React from 'react';
import { useAuth } from './AuthProvider';
import LoginForm from './LoginForm';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm onLoginSuccess={() => window.location.reload()} />;
  }

  return children;
}
