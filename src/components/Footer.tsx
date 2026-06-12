
const Footer = () => {
  return (
    <footer className="border-t border-border py-10 px-4 bg-background">
      <div className="container max-w-6xl mx-auto text-center space-y-2">
        <p className="text-foreground font-medium">
          Fábio Ferreira Paula dos Santos
        </p>
        <p className="text-sm text-muted-foreground">
          CNPJ 64.174.898/0001-05
        </p>
        <p className="text-sm text-muted-foreground">
          <a
            href="mailto:ferreirafabio51@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            ferreirafabio51@gmail.com
          </a>
          <span className="mx-2">·</span>
          <a
            href="https://wa.me/5542991643802"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            (42) 99164-3802
          </a>
        </p>
        <p className="text-xs text-muted-foreground pt-2">
          © 2026 · Desenvolvido com React e Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
