-- Publica/atualiza o 2o artigo SEM truncar a tabela (preserva likes do 1o artigo).
-- Rode este arquivo inteiro no SQL Editor do Supabase.
-- Para apenas atualizar o texto sem publicar, remova a linha `status = 'published',`.

UPDATE blog_posts
SET
  status = 'published',
  reading_minutes = 8,
  content = $md$
A IA escreve código na velocidade que você pede. Inclusive o código inseguro.

Quando usamos inteligência artificial para acelerar o desenvolvimento, a produtividade aumenta, mas o risco de importar padrões de código vulneráveis cresce na mesma proporção. Modelos de linguagem são treinados em repositórios públicos, e esses repositórios estão cheios de más práticas de segurança. O modelo não distingue o código exemplar do código que apenas funcionava: ele reproduz o padrão mais comum, não o mais seguro.

Desenvolvimento seguro, na prática, se sustenta em três frentes que precisam estar automatizadas: como você guarda segredos, como você analisa o seu próprio código e como você confia no código que vem de terceiros.

## Gestão de segredos

### O erro mais fácil de cometer e o mais caro de pagar

O hardcoding de segredos, escrever senhas, chaves de API, tokens ou credenciais direto no código-fonte, é um dos erros mais devastadores justamente por ser o mais simples de cometer. Robôs varrem o GitHub o tempo todo atrás dessas chaves. O intervalo entre publicar um commit com uma chave exposta e a primeira tentativa de uso costuma ser de minutos, não de dias.

E não adianta apagar no commit seguinte: o segredo continua no histórico do Git. Uma vez exposto, ele precisa ser revogado e rotacionado, nunca apenas removido.

### Onde os segredos devem viver

A diretriz é simples: o código-fonte deve ser agnóstico em relação ao ambiente. O mesmo repositório roda na máquina do desenvolvedor e em produção, mudando apenas as variáveis injetadas em cada lugar. Credenciais existem só em variáveis de ambiente, com o `.env` fora do controle de versão, ou em cofres dedicados como AWS Secrets Manager, HashiCorp Vault ou as secrets do próprio provedor de deploy.

**Exemplo prático.** Em vez de `const apiKey = "sk_live_abc123"` no código, você lê `process.env.API_KEY`. O valor real fica no `.env` local (ignorado pelo Git) e nas secrets do ambiente de produção. Trocar a chave vira uma questão de configuração, não um novo deploy de código.

### A rede de proteção: secret scanning

Mesmo com a regra clara, um dia alguém vai colar uma chave no lugar errado. Por isso, ferramentas de secret scanning como Gitleaks ou TruffleHog devem rodar como hook de pré-commit e também no pipeline. O melhor momento de barrar um segredo é antes de ele entrar no histórico.

## Análise estática (SAST)

O SAST (Static Application Security Testing) analisa o código em repouso, de dentro para fora, procurando vulnerabilidades antes mesmo de o software ser executado. Ele intercepta as falhas mais comuns catalogadas pela OWASP, como injeção de SQL, Cross-Site Scripting (XSS) e uso de criptografia obsoleta.

Esse tipo de teste ganhou peso com a IA. Como os modelos costumam concatenar strings direto nas consultas ao banco, eles reintroduzem com frequência falhas que a indústria já sabia evitar. O SAST é o auditor automático que barra essas implementações antes do merge.

**Exemplo prático.** Uma sugestão de IA monta a query como `"SELECT * FROM users WHERE email = '" + email + "'"`. É injeção de SQL clássica. O SAST aponta o padrão já no Pull Request e exige a versão parametrizada, com placeholders, antes de deixar o código avançar.

Ferramentas como Semgrep, SonarQube ou Bandit devem estar integradas tanto na IDE, com feedback imediato ao desenvolvedor, quanto no pipeline, como guardrail que bloqueia o merge.

## Composição de software (SCA) e cadeia de suprimentos

A maior parte de um software moderno não é escrita pela sua equipe. Vem de bibliotecas de código aberto e dependências de terceiros, que por sua vez dependem de outras. Se uma biblioteca lá no fundo dessa árvore tem uma falha, o seu sistema herda essa falha sem nunca ter tocado naquele código.

O SCA (Software Composition Analysis) audita toda a árvore de dependências (`package.json`, `requirements.txt`, `pom.xml`) e cruza as versões com bancos de vulnerabilidades conhecidas (CVEs). É o que impede você de importar, sem perceber, uma falha pública para o núcleo do produto.

### Travar versões não é capricho

A diretriz principal é o pinning: travar as versões exatas das dependências, com lockfile versionado (`package-lock.json`, `poetry.lock`). Baixar "a última versão" automaticamente a cada build significa que uma atualização maliciosa em um único pacote entra no seu sistema no próximo deploy, sem revisão.

### Ataques de cadeia de suprimentos

Esse vetor deixou de ser teórico. Três padrões se repetem:

- **Typosquatting:** o atacante publica um pacote com nome parecido com um popular (`expresss` no lugar de `express`), apostando no erro de digitação.
- **Dependency confusion:** ele publica num repositório público um pacote com o mesmo nome de um pacote interno da sua empresa, e o gerenciador baixa o público por engano.
- **Conta comprometida:** um mantenedor legítimo tem a conta invadida e uma versão com backdoor é publicada sob um nome em que todo mundo confia.

A defesa combina pinning, verificação de integridade (hashes no lockfile), revisão das atualizações de dependência e, em estágios mais maduros, frameworks de proveniência como o SLSA.

## Conclusão

Segredos fora do código, SAST barrando o seu próprio código inseguro e SCA vigiando o código de terceiros. Essas três frentes são o piso do desenvolvimento seguro, não o teto.

O que elas têm em comum é a automação. No ritmo que a IA impõe, nenhuma funciona como revisão manual de fim de ciclo. Todas precisam estar na IDE e no pipeline, rodando a cada commit, para que a velocidade que a IA traz não venha acompanhada de uma dívida de segurança do mesmo tamanho.

## Referências

- OWASP (2021). OWASP Top 10.
- NIST (2022). Secure Software Development Framework (SSDF) Version 1.1 (NIST SP 800-218).
- OWASP. Software Component Verification Standard (SCVS).
- Ohm, M., Plate, H., Sykosch, A., & Meier, M. (2020). Backstabber's Knife Collection: A Review of Open Source Software Supply Chain Attacks. DIMVA.
- Ladisa, P., Plate, H., Martinez, M., & Barais, O. (2023). SoK: Taxonomy of Attacks on Open-Source Software Supply Chains. IEEE Symposium on Security and Privacy.
- Supply-chain Levels for Software Artifacts (SLSA) Framework.
- Sonatype (2023). State of the Software Supply Chain.
$md$
WHERE slug = 'segredos-sast-e-cadeia-de-suprimentos';
