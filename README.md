# 🚀 Troca de Conhecimentos - Backend

Sistema backend desenvolvido para facilitar a troca de conhecimentos entre pessoas. O servidor permite o cadastro de perfis com habilidades específicas e a busca inteligente por esses conhecimentos.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** & **Express**
* **Prisma ORM**
* **PostgreSQL**
* **Thunder Client** (para testes de API)
## 🚀 Como Rodar o Projeto
### 1. Clone o repositório
```bash
git clone "link-do-repositorio"

3. **Instalar Dependencias**
   Instalar o Prisma CLI: npm install prisma --save-dev
   Instalar o Prisma Client: npm install @prisma/client
4. **Inicializar o Prisma**
      npx prisma init
6. **Configurar a Conexão com o Banco**
     Abra o arquivo .env e configure a sua URL de conexão:
        DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
8. **Sincronizar o Banco de Dados**
     ---Sempre que o schema.prisma for alterado:
     **Gerar uma Migração (Cria as tabelas no banco):**
        npx prisma migrate dev --name init
      **Gerar o Prisma Client (Atualiza o IntelliSense no código):**
        npx prisma generate


   
 **Comandos ultilizaveis:**
  npx prisma studio: Abre uma interface visual no navegador para visualizar e editar os dados do banco.


  🛠️ **Tecnologias Utilizadas**

**Node.js:** Ambiente de execução JavaScript.

**Express:** Framework para criação das rotas da API.

**Prisma:** ORM para modelagem do banco de dados.

**Git/GitHub:** Versionamento e controle de código.

   
