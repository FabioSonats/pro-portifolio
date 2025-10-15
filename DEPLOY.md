# 🚀 Guia de Deploy - Portfólio Fábio Ferreira

Este guia explica como fazer o deploy do portfólio no GitHub Pages.

## 📋 Pré-requisitos

- Conta no GitHub
- Git instalado
- Node.js 18+ instalado
- Conta no Supabase (para ChatBot)

## 🔧 Configuração Inicial

### 1. Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em "New repository"
3. Nome: `pro-portifolio`
4. Descrição: "Professional portfolio - Fábio Ferreira"
5. Marque como **Public**
6. **NÃO** inicialize com README (já temos um)

### 2. Configurar Repositório Local

```bash
# Inicializar Git (se não estiver)
git init

# Adicionar remote
git remote add origin https://github.com/FabioSonats/pro-portifolio.git

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "feat: initial portfolio setup with React, TypeScript and Tailwind"

# Push para GitHub
git push -u origin main
```

## ⚙️ Configuração do GitHub Pages

### 1. Configurar Pages

1. Vá para **Settings** do repositório
2. Role até **Pages** (lado esquerdo)
3. Em **Source**, selecione **GitHub Actions**
4. Salve as configurações

### 2. Configurar Secrets (Opcional - para ChatBot)

1. Vá para **Settings** > **Secrets and variables** > **Actions**
2. Adicione os secrets:
   - `VITE_SUPABASE_URL`: Sua URL do Supabase
   - `VITE_SUPABASE_ANON_KEY`: Sua chave anônima do Supabase

## 🚀 Deploy Automático

### 1. Push para Ativar Deploy

```bash
# Fazer mudanças
git add .
git commit -m "feat: add new features"
git push origin main
```

### 2. Verificar Deploy

1. Vá para a aba **Actions** do repositório
2. Verifique se o workflow está rodando
3. Aguarde a conclusão (2-3 minutos)
4. Acesse: `https://fabiosonats.github.io/pro-portifolio/`

## 🔍 Verificação Pós-Deploy

### ✅ Checklist

- [ ] Site carrega corretamente
- [ ] Design responsivo funciona
- [ ] Navegação entre seções funciona
- [ ] Botão "Ver Mais Informações" expande seções
- [ ] Links dos projetos funcionam
- [ ] ChatBot responde (se configurado)
- [ ] Troca de idioma funciona
- [ ] Links de contato funcionam

### 🐛 Troubleshooting

#### Site não carrega
- Verifique se o base URL está correto no `vite.config.ts`
- Confirme se o repositório é público
- Verifique os logs na aba Actions

#### ChatBot não funciona
- Configure as variáveis de ambiente no Supabase
- Verifique se a Edge Function está deployada
- Teste localmente primeiro

#### Estilos não carregam
- Verifique se o Tailwind está configurado
- Confirme se o build está gerando os CSS corretos

## 📊 Monitoramento

### GitHub Actions
- **Status**: Verifique na aba Actions
- **Logs**: Clique no workflow para ver detalhes
- **Tempo**: Deploy leva ~2-3 minutos

### Analytics (Opcional)
- Configure Google Analytics
- Adicione tracking no `index.html`
- Monitore visitantes e páginas mais acessadas

## 🔄 Atualizações Futuras

### Deploy de Mudanças
```bash
# Fazer mudanças no código
git add .
git commit -m "feat: update portfolio content"
git push origin main
# Deploy automático será ativado
```

### Rollback (se necessário)
```bash
# Voltar para commit anterior
git log --oneline  # Ver commits
git reset --hard <commit-hash>
git push --force origin main
```

## 📱 URLs Importantes

- **Site**: https://fabiosonats.github.io/pro-portifolio/
- **Repositório**: https://github.com/FabioSonats/pro-portifolio
- **Actions**: https://github.com/FabioSonats/pro-portifolio/actions

## 🎯 Próximos Passos

1. **Customizar domínio** (opcional)
2. **Configurar analytics**
3. **Otimizar SEO**
4. **Adicionar mais projetos**
5. **Configurar CI/CD avançado**

---

**🎉 Parabéns! Seu portfólio está no ar!** 

Agora você pode compartilhar o link com recrutadores e clientes.
