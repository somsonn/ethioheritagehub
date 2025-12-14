import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { user, profile, role, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (role === 'tourist') return '/dashboard/tourist';
    if (role && ['guide', 'hotel', 'transport', 'artisan'].includes(role)) {
      return '/dashboard/provider';
    }
    return '/dashboard/tourist';
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">E</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              EthioHeritageHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/guides" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.guides')}
            </Link>
            <Link to="/hotels" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.hotels')}
            </Link>
            <Link to="/transports" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.transport')}
            </Link>
            <Link to="/artisans" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.artisans')}
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span>{profile?.full_name || 'User'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardLink()} className="cursor-pointer">
                      {t('nav.dashboard')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      {t('nav.profile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('nav.signOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">{t('nav.signIn')}</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth?mode=signup">{t('nav.getStarted')}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/guides" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.guides')}
              </Link>
              <Link to="/hotels" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.hotels')}
              </Link>
              <Link to="/transports" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.transport')}
              </Link>
              <Link to="/artisans" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.artisans')}
              </Link>
              <div className="border-t border-border pt-4 flex flex-col gap-2">
                {user ? (
                  <>
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to={getDashboardLink()}>{t('nav.dashboard')}</Link>
                    </Button>
                    <Button variant="ghost" onClick={handleSignOut} className="justify-start text-destructive">
                      {t('nav.signOut')}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to="/auth">{t('nav.signIn')}</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/auth?mode=signup">{t('nav.getStarted')}</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}