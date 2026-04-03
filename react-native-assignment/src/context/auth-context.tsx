import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type AuthInitialRoute = 'Splash' | 'Welcome';

interface AuthContextValue {
  isAuthenticated: boolean;
  phoneDigits: string | null;
  authInitialRoute: AuthInitialRoute;
  login: (phoneDigits: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phoneDigits, setPhoneDigits] = useState<string | null>(null);
  const [authInitialRoute, setAuthInitialRoute] =
    useState<AuthInitialRoute>('Splash');

  const login = useCallback((digits: string) => {
    setPhoneDigits(digits);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setAuthInitialRoute('Welcome');
    setPhoneDigits(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      phoneDigits,
      authInitialRoute,
      login,
      logout,
    }),
    [isAuthenticated, phoneDigits, authInitialRoute, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
