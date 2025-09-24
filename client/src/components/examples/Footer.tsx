import Footer from '../Footer';

export default function FooterExample() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-display text-muted-foreground">Page Content Above Footer</h1>
      </div>
      <Footer />
    </div>
  );
}