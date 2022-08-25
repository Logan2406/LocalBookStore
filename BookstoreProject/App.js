
import { AuthProvider } from './AuthContext';
import AppNav from './AppNav';

export default function App() {


  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  );
}

