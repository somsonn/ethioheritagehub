import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-ethiopia-earth text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-xl font-bold">E</span>
              </div>
              <span className="font-display text-xl font-semibold">EthioHeritageHub</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              {t('footer.aboutText')}
            </p>
            <div className="flex items-center gap-4 text-primary-foreground/70">
              <MapPin className="w-4 h-4" />
              <span>Lalibela, Ethiopia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/guides" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {t('nav.guides')}
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {t('nav.hotels')}
                </Link>
              </li>
              <li>
                <Link to="/transports" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {t('nav.transport')}
                </Link>
              </li>
              <li>
                <Link to="/artisans" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {t('nav.artisans')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/70">
                <Mail className="w-4 h-4" />
                <span>somsonengda@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/70">
                <Phone className="w-4 h-4" />
                <span>+251930925984</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>© {new Date().getFullYear()} EthioHeritageHub. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}