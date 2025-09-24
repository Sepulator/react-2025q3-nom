import { Suspense } from 'react';

import { Footer } from '@/components/footer';
import { Loading } from '@/components/loading';
import { Main } from '@/components/main';

function App() {
  return (
    <>
      <header>
        <h1> CO2 and Greenhouse Gas Emissions</h1>
      </header>
      <main className="container">
        <Suspense fallback={<Loading />}>
          <Main />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
