-- Seed do blog: artigos do Fabio quebrados por topico.
-- Conteudo em Markdown (dollar-quoted). Textos do proprio autor, sem jargao de IA.
-- Re-executavel: limpa a tabela e recarrega os artigos atuais.

TRUNCATE blog_posts;

INSERT INTO blog_posts (slug, title, excerpt, category, tags, reading_minutes, status, published_at, content)
VALUES
(
  'shift-left-e-modelagem-de-ameacas',
  'Shift-Left e modelagem de ameaças: segurança começa no desenho',
  'Corrigir uma falha de arquitetura no quadro branco custa minutos. Em produção, custa meses e multa de LGPD. Como antecipar a segurança para a fase de concepção.',
  'Segurança',
  ARRAY['Segurança', 'SDLC', 'STRIDE', 'Zero Trust'],
  5,
  'published',
  '2026-06-05T12:00:00Z',
$md$
O erro mais caro na engenharia de software é tratar a segurança como um selo de aprovação que ocorre momentos antes do deploy em produção. Em sistemas modernos, segurança não é uma etapa final: é um requisito não funcional que deve nascer junto com a ideia do produto.

## O princípio do Shift-Left

Imagine o cronograma do projeto como uma linha do tempo que vai da concepção (esquerda) até a produção (direita). Tradicionalmente, os testes de segurança ficam na extrema direita. O Shift-Left antecipa a descoberta de vulnerabilidades para as fases iniciais. Corrigir uma falha de arquitetura na fase de desenho custa minutos. Corrigir a mesma falha depois do banco populado em produção pode custar meses de refatoração e multas regulatórias, como LGPD ou GDPR.

## Modelagem de ameaças com STRIDE

Antes de escrever a primeira linha de código, a equipe deve realizar a modelagem de ameaças: identificar os vetores de ataque a partir da arquitetura proposta. Uso a metodologia STRIDE, da Microsoft, avaliando o desenho contra seis categorias:

- **Spoofing (falsificação de identidade):** autenticação robusta (MFA) e gestão rígida de sessões.
- **Tampering (adulteração):** criptografia em trânsito (TLS) e em repouso.
- **Repudiation (repúdio):** logs imutáveis e trilhas de auditoria.
- **Information Disclosure (vazamento):** mascaramento de dados e tratamento genérico de erros para o cliente.
- **Denial of Service:** rate limiting, paginação obrigatória e dimensionamento elástico.
- **Elevation of Privilege:** controle de acesso por função (RBAC) validado no backend, nunca apenas no frontend.

## Menor privilégio e Zero Trust

No planejamento, estabeleço a premissa de que nenhum usuário e nenhum sistema é confiável por padrão. Se um módulo processa pagamentos, ele deve acessar apenas as tabelas de pagamento, com permissão estrita de leitura e escrita nelas. Ele não herda permissões globais de administrador. Se esse módulo for comprometido, o raio de explosão fica contido.
$md$
),
(
  'segredos-sast-e-cadeia-de-suprimentos',
  'Desenvolvimento seguro: segredos, SAST e cadeia de suprimentos',
  'A IA acelera o desenvolvimento, mas importa padrões inseguros na mesma proporção. Gestão de segredos, análise estática e os riscos das dependências de terceiros.',
  'Segurança',
  ARRAY['Segurança', 'SAST', 'SCA', 'IA'],
  5,
  'published',
  '2026-06-06T12:00:00Z',
$md$
Quando usamos inteligência artificial para acelerar o desenvolvimento, a produtividade aumenta, mas o risco de importar padrões de código vulneráveis cresce na mesma proporção. Modelos de linguagem são treinados em repositórios públicos, que estão repletos de más práticas de segurança.

## Gestão de segredos

Um dos erros mais devastadores é o hardcoding de segredos: escrever senhas, chaves de API, tokens ou credenciais direto no código-fonte. Ferramentas automatizadas varrem o GitHub constantemente em busca dessas chaves, e o comprometimento é imediato.

A diretriz é simples: o código-fonte deve ser agnóstico em relação ao ambiente. O mesmo repositório roda na máquina do desenvolvedor e em produção, mudando apenas as variáveis injetadas. Credenciais devem existir só em variáveis de ambiente (o `.env` jamais vai para o repositório) ou em cofres dedicados como AWS Secrets Manager ou HashiCorp Vault. Use também secret scanning (Gitleaks, TruffleHog) como hook de pré-commit, para impedir que um token seja salvo no controle de versão.

## Análise estática (SAST)

O SAST analisa o código-fonte em repouso, de dentro para fora, buscando vulnerabilidades antes mesmo de o software ser executado. Ele intercepta as falhas mais comuns catalogadas pela OWASP, como injeção de SQL, Cross-Site Scripting (XSS) e algoritmos de criptografia obsoletos. Como as LLMs costumam concatenar strings direto nas consultas de banco, o SAST atua como o auditor automático que barra essas implementações. Ferramentas como Semgrep, SonarQube ou Bandit devem ser integradas à IDE e ao pipeline.

## Composição de software (SCA) e cadeia de suprimentos

Hoje, a maior parte de um software moderno não é escrita pela sua equipe: vem de bibliotecas de código aberto e dependências de terceiros. Se uma biblioteca tem uma falha, o seu sistema herda essa vulnerabilidade. O SCA audita todas as bibliotecas do projeto (`package.json`, `requirements.txt`, `pom.xml`) e cruza com bancos de dados de vulnerabilidades (CVEs). A diretriz principal é o travamento (pinning) das versões: nunca baixe a versão mais recente automaticamente, porque uma atualização maliciosa em um pacote pode comprometer todo o ambiente no próximo build.
$md$
),
(
  'dast-protecao-de-apis-e-pentest',
  'Análise dinâmica, proteção de APIs e testes de invasão',
  'O SAST olha o código em repouso. Mas muitas falhas só aparecem com a aplicação no ar. DAST, blindagem de APIs e o papel insubstituível do pentest.',
  'Segurança',
  ARRAY['Segurança', 'DAST', 'API', 'Pentest'],
  5,
  'published',
  '2026-06-07T12:00:00Z',
$md$
A análise estática examina o código em repouso. Mas a segurança de uma aplicação só é validada de verdade quando ela é compilada, implantada e exposta à rede. Muitas vulnerabilidades surgem da interação entre o código, o servidor, o banco e a infraestrutura.

## Análise dinâmica (DAST)

O DAST avalia a aplicação em tempo de execução, de fora para dentro, simulando um atacante que não tem acesso ao código (caixa preta). Ele interage com formulários, parâmetros de URL e cookies, injetando cargas maliciosas para ver se a aplicação responde de forma vulnerável ou expõe informação demais em mensagens de erro. Diferente do SAST, o DAST detecta falhas de configuração de rede, ausência de cabeçalhos de segurança HTTP e problemas em certificados TLS. Ele costuma rodar no ambiente de homologação, antes de a versão avançar para produção.

## Blindagem de APIs

A API é a porta da frente da infraestrutura. Se ela não for protegida, o sistema inteiro fica exposto.

- **Validação de entrada:** nunca confie nos dados do cliente. Toda validação no frontend é cosmética. O backend deve usar allowlisting, aceitando só os tipos e formatos esperados e rejeitando entrada anômala antes da lógica de negócio.
- **Rate limiting:** limite quantas requisições um IP ou usuário pode fazer por minuto, para mitigar força bruta e exaustão de recursos.
- **API Gateway:** centralize a autenticação e autorização num gateway, em vez de repetir a verificação de token em cada serviço, garantindo que requisições não autorizadas nem cheguem à aplicação.

## Testes de invasão (pentest)

Ferramentas automatizadas não entendem a lógica de negócio. Elas não sabem que um usuário com perfil de comprador não deveria conseguir mudar o preço de um item no carrinho. O pentest insere a inteligência humana: especialistas realizam ataques direcionados para subverter regras de negócio e explorar falhas de autorização, como acessar a fatura de outro usuário trocando o ID na URL. Para um MVP, o caminho pragmático é um pentest focado nos fluxos críticos: autenticação, redefinição de senha e transações sensíveis.
$md$
),
(
  'devsecops-observabilidade-assume-breach',
  'DevSecOps, observabilidade e a mentalidade Assume Breach',
  'Segurança que depende de ação manual a cada PR é negligenciada em prol da velocidade. Como automatizar os portões e operar assumindo que a invasão vai acontecer.',
  'Segurança',
  ARRAY['DevSecOps', 'Observabilidade', 'CI/CD', 'Segurança'],
  5,
  'published',
  '2026-06-08T12:00:00Z',
$md$
O desenvolvimento moderno é um fluxo contínuo de atualizações. Se as verificações de segurança dependerem de ação manual a cada Pull Request, a segurança vai ser negligenciada em prol da velocidade. O DevSecOps resolve isso transformando segurança em parte automática da esteira de CI/CD.

## Portões de segurança na esteira

A diretriz é a automação inflexível. Os testes não devem ser rodados de forma ad-hoc pelo desenvolvedor, mas orquestrados por uma máquina a cada alteração no repositório.

- **Infraestrutura como código segura:** quando os servidores e redes são definidos por código (Terraform, Kubernetes), ferramentas como Checkov ou Trivy varrem os scripts em busca de configurações perigosas, como portas SSH abertas para a internet ou banco sem criptografia.
- **Security gates:** se o SAST achar uma vulnerabilidade crítica ou o secret scanner encontrar uma credencial no commit, o pipeline falha e impede o merge ou o deploy.

## Observabilidade de segurança

O lançamento não é a linha de chegada, é o início da exposição real. A infraestrutura deve emitir registros estruturados de toda atividade relevante (falhas de login, mudança de privilégios, acesso a dados sensíveis) e enviá-los para uma plataforma central (SIEM), onde padrões anômalos são identificados. E atenção a um erro comum em MVPs: vazar dados pessoais (CPF, cartão) nos logs. Implemente filtros que mascarem ou anonimizem dados sensíveis antes da gravação.

## Assume Breach

Mesmo com as melhores práticas, vulnerabilidades desconhecidas e erros operacionais acontecem. A doutrina Assume Breach parte da certeza de que a rede será invadida, e foca em minimizar o impacto. O banco de dados nunca deve ter rota direta para a internet pública: ele fica em sub-rede privada, acessível só pelos servidores autorizados. E, antes do lançamento, a equipe precisa de um plano de resposta a incidentes: se o sistema for comprometido num domingo à noite, quem é notificado e como o ambiente afetado é isolado sem destruir evidências? Ter um procedimento de contenção, erradicação e recuperação transforma o caos de uma violação em um processo gerenciável.

Aplicar segurança de ponta a ponta não atrasa o MVP. Significa trocar o risco catastrófico e oculto por um esforço de configuração inicial.
$md$
),
(
  'fim-do-code-review-manual-e-o-auditor-de-ia',
  'O fim do code review manual e o auditor de IA',
  'Se metade do código já é gerado por máquina, revisar linha por linha vira gargalo. As 4 métricas que validam qualidade no CI em segundos.',
  'Code Review',
  ARRAY['Code Review', 'IA', 'CI/CD', 'Qualidade'],
  5,
  'published',
  '2026-06-09T12:00:00Z',
$md$
O Uncle Bob (Robert C. Martin) declarou recentemente que não revisa mais código escrito por humanos. O argumento dele: humanos são lentos no código, e para ganhar produtividade devemos deixar a geração para a IA e focar em gerenciar o software num nível mais alto. É uma tendência real: os especialistas estão deixando de ser programadores tradicionais para virar auditores de software gerado por IA.

Como metade do código atual pode ser gerada por máquina, a revisão linha por linha fica inviável. É impossível revisar com rigor milhares de linhas geradas por dia. Em vez de focar na sintaxe, a qualidade passa a ser validada por provas objetivas que rodam no CI em poucos segundos.

## As 4 técnicas para automatizar o review

### 1. Complexidade ciclomática
Conta quantos caminhos diferentes (if, else) existem dentro de uma função. As LLMs adoram escrever funções gigantes com vários ifs aninhados para cobrir todos os casos. A prática é definir um limite no CI: se a complexidade passar de 20, o Pull Request é bloqueado.

### 2. Cobertura e mutation testing
A cobertura tradicional só diz qual porcentagem do código passou por algum teste. O mutation testing prova que o teste é eficaz: ele altera pequenas partes do código, como trocar um "maior que" por "menor que", e verifica se algum teste falha. Se a mutação sobrevive, há um bug que os testes não detectam. Uma meta possível: 85% de cobertura com 60% de kill rate.

### 3. Tamanho de módulos
Evita os arquivos deus, que acumulam milhares de linhas. Dá para barrar no pipeline arquivos que passem de um limite saudável, como 300 linhas.

### 4. Estrutura de dependências
Detecta acoplamento e erros arquiteturais, como injeções circulares (um arquivo importa outro que importa o primeiro) e camadas invertidas (um controller chamando um model direto, em vez de passar pelo serviço).

Nenhuma dessas técnicas é nova. O que mudou é que, com o volume de código gerado por IA, aplicar análise estática e testes rigorosos no CI/CD virou o único caminho viável para manter a qualidade em escala.
$md$
),
(
  'quality-gate-e-estrategia-ratchet',
  'Quality Gate e a estratégia Ratchet',
  'Como deixar a IA escrever código em larga escala sem degradar a base. A catraca que só permite o repositório melhorar ou empatar, nunca piorar.',
  'Engenharia',
  ARRAY['Engenharia de Software', 'Quality Gate', 'CI/CD', 'IA'],
  5,
  'published',
  '2026-06-10T12:00:00Z',
$md$
Para viabilizar a escrita de código em larga escala por agentes de IA sem degradar a base no curto prazo, uso o conceito de Quality Gate: um filtro mandatório no pipeline de Integração Contínua, onde cada Pull Request passa por uma bateria de verificações automáticas antes da aprovação para o merge.

## A estratégia Ratchet (catraca)

A espinha dorsal é a catraca. Abordagens tradicionais exigem corrigir todo o legado de uma vez, o que inviabiliza projetos existentes pelo volume de falhas acumuladas. A catraca foca no baseline:

- **Baseline:** uma fotografia das métricas atuais do repositório (por exemplo, 483 violações de lint, 2,2% de duplicação, 7% de cobertura).
- **Não-regressão:** o script do Quality Gate compara o resultado do PR com o baseline.
- **A regra:** um PR pode adicionar funcionalidade, mas não pode aumentar as métricas negativas nem diminuir as positivas, nem por uma linha.
- **Movimento unidirecional:** o repositório só pode melhorar ou empatar. Se uma refatoração melhora os índices, esse valor vira o novo baseline, impedindo retrocessos.

## Por que automatizar

O revisor humano virou o gargalo. Quando agentes de IA geram centenas de linhas por hora, é impossível fazer code review manual mantendo o rigor. O Quality Gate protege a arquitetura contra falhas de revisão, garantindo que o sistema não vire uma bagunça em poucos meses.

As métricas que costumo monitorar no baseline: complexidade e manutenibilidade (arquivos que excedem limites de linhas), auditoria de segurança (bloquear dependências com vulnerabilidades críticas via npm audit) e cobertura de testes (garantir que novos módulos mantenham ou elevem a cobertura).
$md$
),
(
  'babysitting-e-codigo-para-a-ia-ler',
  'Babysitting e código otimizado para a IA ler',
  'O papel do engenheiro muda: de escritor de código a arquiteto de qualidade. Como agentes corrigem o próprio trabalho e por que legibilidade agora é para máquina.',
  'Engenharia',
  ARRAY['Engenharia de Software', 'IA', 'Automação', 'CI/CD'],
  5,
  'published',
  '2026-06-11T12:00:00Z',
$md$
Quando um agente de IA gera código, o resultado esperado não é só o texto: é a criação de uma branch e a abertura de um Pull Request que passa por um escrutínio automatizado. O pipeline dá feedback imediato tanto para o humano quanto para o agente.

## Babysitting: o agente que corrige o próprio código

O Babysitting redefine o papel da IA no ciclo. Em vez de um modelo que apenas sugere código, usamos agentes que monitoram o status do CI e os comentários de revisão. Se o CI falha por uma violação de regra ou um teste quebrado, o agente entra em um loop de correção:

- **Monitorar o status:** o agente verifica se o pipeline está verde.
- **Endereçar comentários:** ele analisa os comentários do PR, aplica as melhorias e resolve as conversas de forma programática, para o revisor humano acompanhar o progresso.
- **Autocorreção guiada:** dá para instruir o agente a modularizar arquivos que passaram do limite de tamanho ou aplicar DRY quando há duplicação detectada.

Esse ciclo consome tokens, mas é o que permite escalar a entrega sem sacrificar a sanidade técnica do projeto.

## Código legível para a máquina

Historicamente o código era escrito para humanos entenderem. Em desenvolvimento autônomo, ele também precisa ser otimizado para o agente navegar e modificar:

- **Comentários próximos ao código:** explicam o porquê de certas decisões, algo que a lógica pura nem sempre comunica, e ajudam a IA a entender o contexto sem ler documentação externa gigante.
- **Nomes descritivos e estrutura modular:** os agentes usam busca por texto para localizar funções e arquivos; nomes claros facilitam modificações precisas.
- **Modularização recorrente:** arquivos que crescem demais estouram os limites de contexto. O agente é instruído a identificar esse crescimento e extrair lógica para manter testabilidade.

O papel do engenheiro sênior muda: de escritor de código para arquiteto de controle de qualidade, definindo as catracas dentro das quais a IA opera. O humano define as regras, a máquina trabalha dentro delas.
$md$
);
