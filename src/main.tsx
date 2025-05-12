import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { baseApi } from './utils/api';
import { useAuthStore } from './stores/auths/authStore.ts';

const initializeApp = async () => {
  try {
    const response = await baseApi.post('/main/auth/init');

    const isLoggedIn = response.data?.isLoggedIn || false;

    const { setIsLoggedIn } = useAuthStore.getState();
    setIsLoggedIn(isLoggedIn);

    console.log('Token init success', isLoggedIn);
    console.log('Auth init success:', response.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(`Auth init failed: ${error.message}`);
    } else {
      alert('An unknown error occurred during auth init');
    }
  }

  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
};

initializeApp();
