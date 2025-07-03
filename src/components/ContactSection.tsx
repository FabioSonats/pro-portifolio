
import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ContactSection = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      subtitle: "ferreirafabio51@gmail.com",
      action: "mailto:ferreirafabio51@gmail.com"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      subtitle: "Conecte-se",
      action: "#"
    },
    {
      icon: Github,
      title: "GitHub",
      subtitle: "Projetos",
      action: "#"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-6">
            Vamos Trabalhar Juntos?
          </h2>
          <div className="w-16 h-1 bg-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estou sempre interessado em novos projetos e oportunidades. Entre em 
            contato para discutirmos como posso contribuir com seu projeto.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <Card key={index} className="bg-slate-900 border-green-500/20 hover:border-green-400/40 transition-all hover:transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <method.icon className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-gray-300 mb-6">{method.subtitle}</p>
                <Button 
                  asChild
                  className="bg-green-500 hover:bg-green-600 text-white w-full"
                >
                  <a href={method.action} target="_blank" rel="noopener noreferrer">
                    {method.title === "Email" ? "Enviar Email" : "Acessar"}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
