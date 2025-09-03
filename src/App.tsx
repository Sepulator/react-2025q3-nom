import ThemeProvider from '@/providers/theme-provider';
import { router } from '@/router';
import { RouterProvider } from 'react-router';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
