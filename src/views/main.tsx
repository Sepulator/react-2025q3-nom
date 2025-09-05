import { useEffect, useState } from 'react';

import Dialog from '@/components/dialog';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useFormStore } from '@/store';
import UncontrolledForm from '@/components/uncontrolled-form';
import HookForm from '@/components/hook-form';
import Card from '@/components/card';

export default function MainView() {
  const { isDialogOpen, closeDialog, isHookForm, formValues } = useFormStore();
  const [newCard, setNewCard] = useState('new-card');

  useEffect(() => {
    setNewCard('new-card');
    const timer = setTimeout(() => setNewCard(''), 4000);
    return () => clearTimeout(timer);
  }, [formValues]);

  return (
    <>
      <Header />
      <main className="container main">
        <Dialog
          isOpen={isDialogOpen}
          handleClose={closeDialog}
          title={isHookForm ? 'React Hook Form' : 'Uncontrolled Form'}
        >
          {isHookForm ? <HookForm /> : <UncontrolledForm />}
        </Dialog>

        <section className="cards-list" role="region">
          {formValues.map((formValue, index) => (
            <Card key={index} {...formValue} className={index === 0 ? newCard : ''} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
