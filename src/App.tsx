import ThemeProvider from '@/components/theme-provider';
import { router } from '@/router';
import { RouterProvider } from 'react-router';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

export default App;
