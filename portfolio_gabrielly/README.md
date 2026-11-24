# Portfólio acadêmico — Gabrielly Pereira

Projeto desenvolvido com **HTML5, CSS3, JavaScript puro e Bootstrap 5**.

## Arquivos
- `index.html`: estrutura e conteúdo das seções.
- `style.css`: identidade visual responsiva.
- `script.js`: formulário, LocalStorage, registros de teste e painel administrativo.

## Como abrir
1. Extraia o ZIP.
2. Abra `index.html` em um navegador.
3. É necessário ter conexão com a internet para carregar Bootstrap, fontes e a biblioteca EmailJS pelos CDNs.

## Funcionalidades implementadas
- Seções de apresentação, áreas do conhecimento, tendências tecnológicas, projetos, atividades e contato.
- Formulário com validação e armazenamento local.
- CRUD de mensagens no painel: criar (pelo formulário), visualizar, editar e excluir.
- Inserção automática de 20 registros fictícios quando a chave do LocalStorage ainda não existe.
- Painel administrativo de demonstração no ícone de engrenagem no rodapé.
- Layout responsivo para celular e computador.

## Testar o CRUD
1. Abra o site e envie uma mensagem no formulário de contato.
2. Role até o rodapé e toque no ícone de engrenagem.
3. PIN demonstrativo inicial: `1234`.
4. No painel, confira a mensagem, edite ou exclua.
5. Para restaurar os 20 registros fictícios, use o botão correspondente.

**Importante:** os registros ficam no LocalStorage do navegador e não são enviados para um banco de dados. Limpar os dados do navegador pode apagá-los. Os 20 registros são fictícios e servem apenas para teste.

## Configurar notificação real por e-mail (EmailJS)
O envio por e-mail está preparado, mas **não funciona até ser configurado**.

1. Crie uma conta no EmailJS e configure um serviço de e-mail e um template.
2. No template, utilize as variáveis `{{from_name}}`, `{{reply_to}}` e `{{message}}`.
3. Copie a Public Key, Service ID e Template ID da sua conta.
4. Abra `script.js` e preencha:
   - `EMAILJS_PUBLIC_KEY`
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
5. Salve e teste o formulário. O site só informará que a notificação foi enviada se o serviço responder com sucesso.

Não publique chaves privadas ou senhas. A Public Key do EmailJS é própria para uso no navegador, mas configure limites e proteção contra spam no painel do serviço.

## Limitações importantes
- O PIN do painel é apenas uma barreira demonstrativa no front-end; não é autenticação segura.
- Qualquer pessoa com acesso ao navegador pode inspecionar o código e o LocalStorage.
- Para um sistema real com dados pessoais, seria necessário backend, autenticação segura e banco de dados.
- A publicação estática (por exemplo, GitHub Pages) não transforma o LocalStorage em banco compartilhado: cada navegador terá seus próprios dados.

## Publicar gratuitamente no GitHub Pages
1. Crie uma conta no GitHub.
2. Crie um repositório público novo.
3. Envie `index.html`, `style.css` e `script.js` para a raiz do repositório.
4. Abra **Settings → Pages**.
5. Em Build and deployment, escolha **Deploy from a branch**, selecione `main` e `/ (root)` e salve.
6. Aguarde a publicação e abra o endereço fornecido pelo GitHub Pages.

## Antes da entrega
- Adicione sua foto no espaço reservado em `index.html` (substitua o bloco `.profile-photo` por uma imagem sua e ajuste o CSS).
- Adicione atividades reais na seção de atividades, com imagens, títulos e descrições.
- Revise as competências pessoais e técnicas para refletirem somente o que você realmente domina.
- Confirme com o professor se o painel front-end e LocalStorage atendem à proposta de avaliação.
