import Dialog from '@/components/dialog';
import Footer from '@/components/footer';

import Header from '@/components/header';
import { useFormStore } from '@/store';
import UncontrolledForm from '@/components/uncontrolled-form';
import HookForm from '@/components/hook-form';

export default function MainView() {
  const { isDialogOpen, closeDialog, isHookForm } = useFormStore();

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
      </main>
      <Footer />
    </>
  );
}
