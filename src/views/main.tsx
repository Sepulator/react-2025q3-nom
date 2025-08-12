import Dialog from '@/components/dialog';
import Footer from '@/components/footer';
import ControlledForm from '@/components/form';
import Header from '@/components/header';
import { useFormStore } from '@/store';

export default function MainView() {
  const { isDialogOpen, closeDialog } = useFormStore();

  return (
    <>
      <Header />
      <main className="container main">
        {isDialogOpen && (
          <Dialog isOpen={isDialogOpen} handleClose={closeDialog} title="React From">
            <ControlledForm />
          </Dialog>
        )}
      </main>
      <Footer />
    </>
  );
}
