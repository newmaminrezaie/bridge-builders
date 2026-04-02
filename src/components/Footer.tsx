import { Link } from 'react-router-dom';
import { services } from '@/lib/persian';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground font-bold text-lg">
                IB
              </div>
              <span className="text-lg font-bold">IntlBridges</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              پل میان کسب‌وکار ایرانی و دنیا — تحول دیجیتال برای ورود به بازارهای جهانی
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-bold">خدمات</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 font-bold">لینک‌ها</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">درباره ما</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">دانش‌نامه</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">تماس با ما</Link></li>
              <li><Link to="/consultation" className="text-sm text-muted-foreground hover:text-primary transition-colors">مشاوره رایگان</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-bold">ارتباط با ما</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@intlbridges.ir</li>
              <li>واتساپ: ۰۹۱۵۰۶۱۶۷۸۸</li>
              <li>تلگرام: @maminre</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} IntlBridges — تمامی حقوق محفوظ است
        </div>
      </div>
    </footer>
  );
}
