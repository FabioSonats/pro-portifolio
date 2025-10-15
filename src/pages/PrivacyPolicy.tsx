import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Eye, Database, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  


  const content = {

    
    'pt-BR': {
      title: 'Política de Privacidade e Termos de Uso',
      lastUpdated: 'Última atualização: 8 de janeiro de 2025',
      sections: [
        {
          icon: Shield,
          title: 'Proteção de Dados Pessoais',
          content: `Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), este documento informa como coletamos, utilizamos e protegemos seus dados pessoais.

**Responsável pelo Tratamento:**
Fábio Ferreira Paula dos Santos
Email: ferreirafabio51@gmail.com

**Dados Coletados:**
- Informações de navegação (IP, navegador, sistema operacional)
- Dados de interação com o chatbot
- Estatísticas de visitas e tempo de permanência
- Cookies essenciais para funcionamento do site`
        },
        {
          icon: Eye,
          title: 'Finalidade do Tratamento',
          content: `Os dados coletados são utilizados para:
- Análise estatística de visitação
- Melhoria da experiência do usuário
- Funcionamento do chatbot de portfólio
- Segurança e prevenção de fraudes
- Cumprimento de obrigações legais`
        },
        {
          icon: Database,
          title: 'Armazenamento e Segurança',
          content: `**Armazenamento:**
- Dados são armazenados em servidores seguros (Supabase)
- Localização: Estados Unidos (com adequação LGPD)
- Tempo de retenção: 12 meses para dados analíticos

**Medidas de Segurança:**
- Criptografia de dados em trânsito e repouso
- Autenticação segura para acesso aos dados
- Monitoramento de segurança 24/7
- Backups regulares e recuperação de desastres`
        },
        {
          icon: UserCheck,
          title: 'Seus Direitos',
          content: `Conforme a LGPD, você tem direito a:
- **Acesso:** Confirmar se seus dados estão sendo tratados
- **Correção:** Corrigir dados incompletos ou incorretos
- **Eliminação:** Solicitar exclusão de dados desnecessários
- **Portabilidade:** Receber seus dados em formato estruturado
- **Oposição:** Opor-se ao tratamento de dados
- **Revisão:** Revisão de decisões automatizadas

**Para exercer seus direitos:**
Email: p.sonats@gmail.com
Prazo de resposta: até 15 dias úteis`
        }
      ],
      cookiesSection: {
        title: 'Política de Cookies',
        content: `**Cookies Essenciais:**
- Funcionamento básico do site
- Preferências de idioma
- Sessão do usuário

**Cookies Analíticos:**
- Google Analytics (opcional)
- Estatísticas de uso
- Comportamento de navegação

**Gerenciamento:**
Você pode gerenciar cookies através das configurações do seu navegador ou através do banner de consentimento.`
      },
      termsSection: {
        title: 'Termos de Uso',
        content: `**Propriedade Intelectual:**
Todo o conteúdo deste portfólio, incluindo textos, imagens, código e design, é de propriedade exclusiva de Fábio Henrique Nunes, protegido pela Lei de Direitos Autorais (Lei 9.610/98).

**Uso Permitido:**
- Visualização pessoal do portfólio
- Compartilhamento de links para fins profissionais
- Contato para oportunidades de trabalho

**Uso Proibido:**
- Reprodução sem autorização
- Modificação do conteúdo
- Uso comercial não autorizado
- Engenharia reversa do código

**Responsabilidade:**
O usuário é responsável pelo uso adequado do site e pelo respeito aos direitos autorais.`
      },
      contact: {
        title: 'Contato',
        content: `**Dúvidas sobre Privacidade:**
Email: ferreirafabio51@gmai.com

**Contato Geral:**
Email: ferreirafabio51@gmail.com
LinkedIn: https://www.linkedin.com/in/ferreira-f%C3%A1bio-98b4304a/

**Denúncias LGPD:**
Você pode reportar violações à ANPD (Autoridade Nacional de Proteção de Dados) através do site: gov.br/anpd`
      }
    },
    'en-US': {
      title: 'Privacy Policy and Terms of Use',
      lastUpdated: 'Last updated: January 8, 2025',
      sections: [
        {
          icon: Shield,
          title: 'Personal Data Protection',
          content: `In compliance with the General Data Protection Law (LGPD - Law 13.709/2018), this document informs how we collect, use and protect your personal data.

**Data Controller:**
Fábio Ferreira Paula dos Santos
Email: ferreirafabio51@gmail.com

**Data Collected:**
- Navigation information (IP, browser, operating system)
- Chatbot interaction data
- Visit statistics and time spent
- Essential cookies for site functionality`
        },
        {
          icon: Eye,
          title: 'Purpose of Processing',
          content: `The collected data is used for:
- Statistical analysis of visits
- User experience improvement
- Portfolio chatbot functionality
- Security and fraud prevention
- Compliance with legal obligations`
        },
        {
          icon: Database,
          title: 'Storage and Security',
          content: `**Storage:**
- Data stored on secure servers (Supabase)
- Location: United States (with LGPD compliance)
- Retention period: 12 months for analytical data

**Security Measures:**
- Data encryption in transit and at rest
- Secure authentication for data access
- 24/7 security monitoring
- Regular backups and disaster recovery`
        },
        {
          icon: UserCheck,
          title: 'Your Rights',
          content: `According to LGPD, you have the right to:
- **Access:** Confirm if your data is being processed
- **Correction:** Correct incomplete or incorrect data
- **Deletion:** Request deletion of unnecessary data
- **Portability:** Receive your data in structured format
- **Opposition:** Object to data processing
- **Review:** Review automated decisions

**To exercise your rights:**
Email: ferreirafabio51@gmail.com
Response time: up to 15 business days`
        }
      ],
      cookiesSection: {
        title: 'Cookie Policy',
        content: `**Essential Cookies:**
- Basic site functionality
- Language preferences
- User session

**Analytical Cookies:**
- Google Analytics (optional)
- Usage statistics
- Navigation behavior

**Management:**
You can manage cookies through your browser settings or through the consent banner.`
      },
      termsSection: {
        title: 'Terms of Use',
        content: `**Intellectual Property:**
All content in this portfolio, including texts, images, code and design, is the exclusive property of Fábio Henrique Nunes, protected by Copyright Law (Law 9.610/98).

**Permitted Use:**
- Personal viewing of the portfolio
- Sharing links for professional purposes
- Contact for job opportunities

**Prohibited Use:**
- Reproduction without authorization
- Content modification
- Unauthorized commercial use
- Reverse engineering of code

**Responsibility:**
The user is responsible for proper use of the site and respect for copyright.`
      },
      contact: {
        title: 'Contact',
        content: `**Privacy Questions:**
Email: ferreirafabio51@gmail.com

**General Contact:**
Email: ferreirafabio51@gmail.com
LinkedIn: https://www.linkedin.com/in/ferreira-f%C3%A1bio-98b4304a/

**LGPD Reports:**
You can report violations to ANPD (National Data Protection Authority) through the website: gov.br/anpd`
      }
    }
  };
  
  

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="mb-4 border-green-500/30 text-green-400 hover:bg-green-500/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'pt-BR' ? 'Voltar ao Portfólio' : 'Back to Portfolio'}
            </Button>
            
            <h1 className="text-4xl font-bold text-green-400 mb-2">
              {currentContent.title}
            </h1>
            <p className="text-gray-400">{currentContent.lastUpdated}</p>
          </div>

          <div className="space-y-6">
            {currentContent.sections.map((section, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <section.icon className="w-5 h-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-300 whitespace-pre-line">
                    {section.content}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-green-400">
                  {currentContent.cookiesSection.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-300 whitespace-pre-line">
                  {currentContent.cookiesSection.content}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-green-400">
                  {currentContent.termsSection.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-300 whitespace-pre-line">
                  {currentContent.termsSection.content}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-green-400">
                  {currentContent.contact.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-300 whitespace-pre-line">
                  {currentContent.contact.content}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;