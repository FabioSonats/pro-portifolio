import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Cookie, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('consentDate', new Date().toISOString());
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('consentDate', new Date().toISOString());
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="bg-card border border-border backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <Cookie className="w-6 h-6 text-foreground" />
                <Shield className="w-6 h-6 text-foreground" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {language === 'pt-BR' ? 'Política de Privacidade e Cookies' : 'Privacy Policy and Cookies'}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                {language === 'pt-BR' 
                  ? 'Este site coleta dados de visitas para análise estatística e melhoria da experiência do usuário. Utilizamos cookies essenciais para o funcionamento do site e analytics para compreender como você interage com nosso conteúdo. Seus dados são tratados conforme a LGPD.' 
                  : 'This website collects visit data for statistical analysis and user experience improvement. We use essential cookies for site functionality and analytics to understand how you interact with our content. Your data is processed according to LGPD.'}
              </p>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleAccept}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  size="sm"
                >
                  {language === 'pt-BR' ? 'Aceitar' : 'Accept'}
                </Button>
                
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  className="border border-border bg-transparent text-foreground hover:bg-muted"
                  size="sm"
                >
                  {language === 'pt-BR' ? 'Recusar' : 'Decline'}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => window.open('/privacy-policy', '_blank')}
                >
                  {language === 'pt-BR' ? 'Política de Privacidade' : 'Privacy Policy'}
                </Button>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDecline}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;