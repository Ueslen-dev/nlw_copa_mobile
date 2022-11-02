import { createContext, ReactNode, useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSessions from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContexDataProps {
  user: UserProps;
  singIn: () => Promise<void>;
  isUserLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContexDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);


  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '837369814766-2adb49n8nqag8pfr235l867t2lp5movu.apps.googleusercontent.com',
    redirectUri: AuthSessions.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  async function singIn() {
    console.log('chamou')
    try {
       
      setIsUserLoading(true)
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function singInWithGoogle(access_token: string) {
    console.log('TOKEN DE AUTENTICAÇÃO ===>', access_token);
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken) {
      singInWithGoogle(response.authentication.accessToken);
    }
  },[response])

  return (
    <AuthContext.Provider value={{
      singIn,
      isUserLoading,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}