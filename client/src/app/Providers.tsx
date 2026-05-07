"use client";

import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { store } from '../redux/store';
import GoogleOAuthProviderWrapper from '../components/GoogleOAuthProvider';
import { SettingsProvider } from '../context/SettingsContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <GoogleOAuthProviderWrapper>
        <SettingsProvider>
          {children}
          <Toaster position="top-right" />
        </SettingsProvider>
      </GoogleOAuthProviderWrapper>
    </Provider>
  );
}
