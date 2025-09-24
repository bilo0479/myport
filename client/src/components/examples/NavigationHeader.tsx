import NavigationHeader from '../NavigationHeader';

export default function NavigationHeaderExample() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader 
        onSectionChange={(section) => console.log('Section changed to:', section)} 
      />
      <div className="pt-20 p-8">
        <div className="space-y-8">
          <div id="home" className="h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
            <h1 className="text-4xl font-display">Home Section</h1>
          </div>
          <div id="about" className="h-screen flex items-center justify-center bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg">
            <h1 className="text-4xl font-display">About Section</h1>
          </div>
          <div id="work" className="h-screen flex items-center justify-center bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg">
            <h1 className="text-4xl font-display">Work Section</h1>
          </div>
          <div id="lab" className="h-screen flex items-center justify-center bg-gradient-to-br from-destructive/10 to-secondary/10 rounded-lg">
            <h1 className="text-4xl font-display">Lab Section</h1>
          </div>
          <div id="contact" className="h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-destructive/10 rounded-lg">
            <h1 className="text-4xl font-display">Contact Section</h1>
          </div>
        </div>
      </div>
    </div>
  );
}