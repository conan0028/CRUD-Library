# Sistema de Gerenciamento de Biblioteca

## Descrição

Este projeto é um sistema de gerenciamento de biblioteca desenvolvido como trabalho acadêmico para o curso de Ciências da Computação. Ele permite o gerenciamento de livros, incluindo operações como adicionar, buscar, atualizar, listar e excluir livros. Além disso, o sistema suporta o registro de empréstimos e a consulta da disponibilidade de livros.

A aplicação foi implementada utilizando **Node.js** com **Prisma ORM** para manipulação do banco de dados SQLite.

---

## Funcionalidades

- **Adicionar Livros**: Inserção de novos livros na biblioteca.
- **Buscar Livros**: Pesquisa por livros com filtros por ID, título, autor, ano de publicação, gênero e disponibilidade.
- **Atualizar Livros**: Atualização de informações dos livros.
- **Excluir Livros**: Remoção de livros do acervo.
- **Listar Livros**: Exibição de todos os livros cadastrados.
- **Registrar Empréstimos**: Alteração do status de disponibilidade para indicar que um livro foi emprestado.
- **Consultar Disponibilidade**: Verificação se um livro está disponível para empréstimo.

---

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução do JavaScript no backend.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Prisma ORM**: Ferramenta para manipulação de banco de dados.
- **SQLite**: Banco de dados relacional utilizado no projeto.
- **Postman**: Ferramenta de testes para APIs REST.

---

## Estrutura do Projeto

```
├── src
│   ├── prisma
│   │   ├── schema.prisma  # Definição do modelo de dados
│   │   └── migrations     # Diretório de migrações do Prisma
│   ├── biblioteca.ts      # Classe principal com as operações da biblioteca
│   └── server.ts          # Configuração do servidor e rotas
└── package.json           # Configurações do Node.js e dependências
```

---

## Configuração e Execução

### Pré-requisitos
- **Node.js** (v16 ou superior)
- **npm** (v7 ou superior)

### Passos
1. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/conan0028/CRUD-Library.git
   cd CRUD-Library
   ```

2. **Instalar Dependências**:
   ```bash
   npm install
   ```

3. **Configurar o Banco de Dados**:
   - Certifique-se de que o arquivo `schema.prisma` está configurado corretamente.
   - Execute as migrações para criar o banco de dados:
     ```bash
     npx prisma migrate dev
     ```

4. **Iniciar o Servidor**:
   ```bash
   npx ts-node src/server.ts
   ```

5. **Acessar a API**:
   - Utilize ferramentas como o Postman para interagir com o sistema.
   - Endereço padrão: `http://localhost:3000`

---

## Exemplos de Uso

### Adicionar um Livro
**POST** `/livros`
```json
{
  "titulo": "Dracula",
  "autor": "Bram Stoker",
  "anoPublicacao": 1897,
  "genero": "Ficção Gótica",
  "disponivel": true
}
```

### Buscar Livros por Autor
**GET** `/livros?autor=Bram%20Stoker`

### Registrar Empréstimo
**PUT** `/livros/emprestimo/{id}`

### Consultar Disponibilidade
**GET** `/livros/disponibilidade/{id}`

---

## Contribuições

Este projeto é acadêmico e, portanto, contribuições externas não são esperadas. No entanto, sugestões para melhorias podem ser enviadas através de issues no repositório.

---

## Licença

Projeto desenvolvido exclusivamente para fins educacionais e acadêmicos.

