import { useEffect, useRef, useState } from 'react';

// Contador de modulo para gerar ids validos (mermaid nao aceita ':' do useId).
let mermaidIdCounter = 0;

interface MermaidProps {
  code: string;
}

// Renderiza um diagrama Mermaid a partir do texto do bloco ```mermaid``` do artigo.
// O mermaid e pesado, entao e carregado sob demanda (import dinamico) so quando
// um post realmente contem um diagrama.
const Mermaid = ({ code }: MermaidProps) => {
  const idRef = useRef(`mermaid-${mermaidIdCounter++}`);
  const [svg, setSvg] = useState<string>('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'strict',
          fontFamily: 'inherit',
        });
        const { svg } = await mermaid.render(idRef.current, code.trim());
        if (!cancelled) setSvg(svg);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [code]);

  // Se o diagrama falhar, mostra o codigo cru para nao engolir o conteudo.
  if (failed) {
    return (
      <pre className="bg-muted border border-border overflow-x-auto">
        <code>{code.trim()}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="my-8 flex justify-center text-sm text-muted-foreground">
        Carregando diagrama...
      </div>
    );
  }

  return (
    <div
      className="my-8 flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default Mermaid;
