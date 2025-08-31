import { Suspense } from 'react';

import { Footer } from '@/components/footer';
import { Main } from '@/components/main';

function App() {
  return (
    <>
      <header>
        <h1> CO2 and Greenhouse Gas Emissions</h1>
      </header>
      <Suspense
        fallback={
          <main className="container center">
            <button aria-busy="true" className="outline secondary center">
              Loading…
            </button>
          </main>
        }
      >
        <Main />
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
