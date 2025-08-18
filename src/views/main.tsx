import Dialog from '@/components/dialog';
import Footer from '@/components/footer';

import Header from '@/components/header';
import { useFormStore } from '@/store';
import UncontrolledForm from '@/components/uncontrolled-form';
import HookForm from '@/components/hook-form';
import Card from '@/components/card';

export default function MainView() {
  const { isDialogOpen, closeDialog, isHookForm, formValues } = useFormStore();

  return (
    <>
      <Header />
      <main className="container main">
        {isDialogOpen && (
          <Dialog
            isOpen={isDialogOpen}
            handleClose={closeDialog}
            title={isHookForm ? 'React Hook Form' : 'Uncontrolled Form'}
          >
            {isHookForm ? <HookForm /> : <UncontrolledForm />}
          </Dialog>
        )}
        <section className="cards-list">
          {formValues.map((formValue, index) => (
            <Card key={index} {...formValue} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
