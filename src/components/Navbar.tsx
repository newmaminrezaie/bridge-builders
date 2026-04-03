import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const navLinks = [
  { to: '/', label: 'خانه' },
  { to: '/services', label: 'خدمات' },
  { to: '/about', label: 'درباره ما' },
  { to: '/blog', label: 'آموزش' },
  { to: '/contact', label: 'تماس' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between md:h-20 flex-row-reverse">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          <Link to="/consultation">
            <Button className="ml-2 bg-gradient-primary hover:opacity-90 transition-opacity">
              مشاوره رایگان
            </Button>
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="منو">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                  location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/consultation" onClick={() => setOpen(false)}>
              <Button className="mt-2 w-full bg-gradient-primary">مشاوره رایگان</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
