import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('exitShown')) {
        setShow(true);
        sessionStorage.setItem('exitShown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShow(false)}>
      <div className="relative w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setShow(false)} className="absolute top-4 left-4 text-muted-foreground hover:text-foreground">
          <X size={20} />
        </button>
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold">قبل از رفتن!</h3>
          <p className="text-muted-foreground">مشاوره رایگان ۳۰ دقیقه‌ای دریافت کنید — بدون هیچ تعهدی</p>
          <Link to="/consultation" onClick={() => setShow(false)}>
            <Button className="w-full bg-gradient-primary text-lg py-6 mt-2">دریافت مشاوره رایگان</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
