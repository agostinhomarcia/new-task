# Gerenciador de Tarefas

## Introdução

Este é um Gerenciador de Tarefas desenvolvido utilizando **Next.js/React** no front-end e **Node.js** no back-end. O objetivo principal é permitir que os usuários possam criar, editar, concluir e excluir tarefas de forma eficiente. A aplicação foi projetada para ser responsiva, proporcionando uma excelente experiência tanto em dispositivos móveis quanto em desktops.

## Tabela de Conteúdos

- [Instalação](#instalação)
- [Uso](#uso)
- [Recursos](#recursos)
- [Dependências](#dependências)
- [Configuração](#configuração)
- [Exemplos](#exemplos)
- [Contribuidores](#contribuidores)
- [Licença](#licença)

## Instalação

### Requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/gerenciador-de-tarefas.git
   cd gerenciador-de-tarefas
   ```

# Front-end

```cd frontend
npm install
```

# Back-end

```cd ../backend
npm install
```

##### Uso

Após a instalação, você pode acessar a aplicação abrindo o navegador e navegando até `http://localhost:3000` .

O front-end será servido no ambiente de desenvolvimento, permitindo a criação, edição, conclusão e exclusão de tarefas de forma intuitiva.

##### Recursos

Front-end com Next.js/React: Interface responsiva e moderna.

Tailwind CSS: Estilização ágil e personalizada para uma UI limpa e organizada.

CRUD de Tarefas: Crie, edite, marque como concluída e exclua tarefas.

Back-end com Node.js/Express: API robusta para gerenciamento de tarefas.

Deploy na Vercel: Integração contínua e deploy automático utilizando Vercel para escalabilidade e performance.

##### Dependências

Front-end
Next.js
React
Tailwind CSS
Back-end
Node.js
Express

#### Configuração

Para o funcionamento correto da API no back-end, será necessário configurar variáveis de ambiente. Crie um arquivo .env no diretório backend com as seguintes informações:

##### Exemplo de variáveis de ambiente

```
DATABASE_URL=your-database-url
PORT=5000
```

Se você estiver utilizando uma base de dados externa, configure a URL do banco de dados para conectar corretamente.

##### Contribuidores

[Márcia](https://www.linkedin.com/in/marcia-agostinho-developer/)

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

#### Licença

Este projeto está licenciado sob a licença [MIT]().
