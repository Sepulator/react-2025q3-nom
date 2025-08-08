import Dialog from '@/components/dialog';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useFormStore } from '@/store';

export default function MainView() {
  const { isDialogOpen, closeDialog } = useFormStore();

  return (
    <>
      <Header />
      <main className="container main">
        <Dialog isOpen={isDialogOpen} handleClose={closeDialog} title="React From">
          <h4>React form body</h4>
        </Dialog>
      </main>
      <Footer />
    </>
  );
}
