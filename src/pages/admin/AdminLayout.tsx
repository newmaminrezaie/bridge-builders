import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, FileText, Mail, Settings, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const links = [
  { to: '/admin', icon: <LayoutDashboard size={18} />, label: 'داشبورد' },
  { to: '/admin/leads', icon: <Users size={18} />, label: 'سرنخ‌ها' },
  { to: '/admin/consultations', icon: <CalendarCheck size={18} />, label: 'مشاوره‌ها' },
  { to: '/admin/blog', icon: <FileText size={18} />, label: 'مقالات' },
  { to: '/admin/subscribers', icon: <Mail size={18} />, label: 'مشترکین' },
  { to: '/admin/settings', icon: <Settings size={18} />, label: 'تنظیمات' },
];

export default function AdminLayout() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setAuthed(false);
        navigate('/admin/login');
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
      return;
    }
    const { data } = await supabase.from('user_roles').select('role').eq('user_id', session.user.id).eq('role', 'admin').single();
    if (!data) {
      await supabase.auth.signOut();
      navigate('/admin/login');
      return;
    }
    setAuthed(true);
    setChecking(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (checking) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">در حال بررسی دسترسی...</div>;
  if (!authed) return null;

  return (
    <div className="min-h-screen flex" style={{ direction: 'rtl' }}>
      {/* Sidebar */}
      <aside className="w-64 border-l border-border bg-card hidden md:flex flex-col">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground font-bold text-sm">IB</div>
            <span className="font-bold text-sm">پنل مدیریت</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                location.pathname === link.to ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {link.icon}{link.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted w-full transition-colors">
            <LogOut size={18} />خروج
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col">
        <div className="md:hidden border-b border-border p-3 flex items-center justify-between">
          <Link to="/admin" className="font-bold text-sm">پنل مدیریت</Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut size={16} /></Button>
        </div>
        <div className="md:hidden border-b border-border overflow-x-auto">
          <div className="flex gap-1 p-2">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs whitespace-nowrap ${location.pathname === link.to ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                {link.icon}{link.label}
              </Link>
            ))}
          </div>
        </div>
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
