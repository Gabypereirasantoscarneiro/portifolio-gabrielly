# GameStore — E-commerce acadêmico em PHP e MySQL

Projeto de loja virtual para execução local no Apache/XAMPP. O sistema usa PHP, PDO, MySQL/MariaDB, Bootstrap 5, HTML5, CSS3 e JavaScript.

## Funcionalidades da loja

- Catálogo dinâmico de produtos consultados no MySQL.
- Busca por nome/descrição e filtro por categoria.
- Página individual com descrição, preço, imagem e disponibilidade.
- Carrinho persistido na sessão PHP (`$_SESSION`), com adicionar, alterar quantidade e remover.
- Validação da quantidade em relação ao estoque disponível.
- Cadastro e login; senhas armazenadas com `password_hash()` e verificadas com `password_verify()`.
- Checkout autenticado com simulação de PIX, boleto ou cartão.
- Criação de pedido e itens; baixa de estoque dentro de transação SQL e bloqueio das linhas (`FOR UPDATE`).
- Painel de administração (`/admin`) (pasta `admin/`) protegido por validação de sessão e perfil administrativo no servidor.
- CRUD de produtos: cadastrar, listar, editar e desativar (exclusão lógica).
- Consulta de pedidos e seus itens.
- PDO com prepared statements, token CSRF, escape de saída, regeneração de sessão no login e configurações fora do código.

## Requisitos para executar

- Windows com XAMPP (Apache, PHP 8.1+ e MySQL/MariaDB).
- Extensão PHP `pdo_mysql` habilitada.
- Navegador atualizado e conexão à internet para carregar Bootstrap e imagens externas.

## Como instalar no XAMPP

1. Extraia o ZIP.
2. Copie a pasta `gamestore` para `C:\xampp\htdocs\gamestore`.
3. Abra o XAMPP Control Panel e clique em **Start** no Apache e no MySQL.
4. Acesse `http://localhost/phpmyadmin`.
5. Clique em **Importar**, selecione `gamestore/database/schema.sql` e execute.
6. Na pasta do projeto, faça uma cópia de `.env.example` e renomeie a cópia para `.env`.
7. Confira os dados do banco no `.env`. Em uma instalação padrão do XAMPP, normalmente o usuário local é `root` e a senha pode ficar vazia; confirme a configuração do seu computador.
8. Abra `http://localhost/gamestore/`.

> O arquivo `.env` contém configurações locais e não deve ser enviado ao GitHub. O `.gitignore` já o exclui. O `.env.example` é o modelo que deve permanecer no repositório.

## Como criar o primeiro administrador

1. Crie uma conta pela opção **Criar conta** na loja.
2. No phpMyAdmin, selecione o banco `gamestore` e abra a aba SQL.
3. Execute o comando abaixo, substituindo pelo e-mail usado no cadastro:

```sql
UPDATE users SET role = 'admin' WHERE email = 'seu-email@exemplo.com';
```

4. Saia da conta e entre novamente. O link **Admin** aparecerá no menu. O painel também pode ser acessado em `http://localhost/gamestore/admin/`.

## Como publicar o projeto no GitHub

No terminal aberto dentro da pasta `gamestore`, execute (substitua a URL pela URL do repositório que você criar no GitHub):

```bash
git init
git add .
git status
git commit -m "feat: implementa e-commerce GameStore"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/gamestore.git
git push -u origin main
```

Antes de `git commit`, confira que `.env` não aparece na lista de arquivos. Nunca publique credenciais reais.

## Observações importantes

- O pagamento é uma simulação escolar: não há cobrança real nem integração com gateway.
- As imagens de demonstração usam endereços externos e podem ser trocadas por imagens próprias.
- A exclusão de produtos é lógica (`active = 0`) para preservar o histórico de pedidos.
- Este projeto é destinado a demonstração acadêmica local; antes de uso público, é necessária revisão adicional de segurança, HTTPS, política de upload, logs e controles contra tentativas automatizadas de login.
