import ThemeProvider from '@/components/theme-provider';
import MainView from '@/views/main';

function App() {
  return (
    <ThemeProvider>
      <MainView />
    </ThemeProvider>
  );
}

export default App;
