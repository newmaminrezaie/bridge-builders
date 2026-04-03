import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import ExitIntentPopup from './ExitIntentPopup';
import TawkChat from './TawkChat';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
      <ExitIntentPopup />
      <TawkChat />
    </div>
  );
}
