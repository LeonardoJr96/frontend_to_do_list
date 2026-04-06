# Nexus Todo — Frontend

Interface web do projeto **Gerenciador de Tarefas**, desenvolvida com React, TypeScript e Vite. Consome a API REST do backend para gerenciar tarefas via CRUD completo.

## Visão Geral

A aplicação oferece um dashboard com métricas em tempo real e páginas dedicadas para cada operação sobre as tarefas. O layout conta com sidebar de navegação, animações com Framer Motion e estilo dark com Tailwind CSS.

## Tecnologias

- **React 19** — biblioteca de UI
- **TypeScript** — tipagem estática
- **Vite** — bundler e dev server
- **Tailwind CSS v4** — estilização utilitária
- **React Router DOM v7** — roteamento client-side
- **Axios** — cliente HTTP para consumo da API
- **Framer Motion** — animações de transição
- **Lucide React** — ícones
- **React Hot Toast** — notificações de feedback

## Pré-requisitos

- Node.js ≥ 18
- Backend da API rodando em `http://localhost:8000`

## Instalação e Execução

```bash
# 1. Clone o repositório e entre na pasta do frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Visualiza o build de produção localmente |
| `npm run lint` | Executa o ESLint no projeto |

## Estrutura de Pastas

```
src/
├── api/
│   └── taskApi.ts          # Funções de integração com a API REST
├── components/
│   ├── Layout.tsx           # Layout base com sidebar de navegação
│   ├── TaskCard.tsx         # Card de exibição de tarefa
│   └── TaskForm.tsx         # Formulário reutilizável de tarefa
├── pages/
│   ├── Dashboard.tsx        # Visão geral com métricas
│   ├── CreateTask.tsx       # Criar nova tarefa
│   ├── ListTasks.tsx        # Listar todas as tarefas
│   ├── GetTask.tsx          # Buscar tarefa por ID
│   ├── UpdateTask.tsx       # Editar tarefa existente
│   ├── DeleteTask.tsx       # Deletar tarefa por ID
│   ├── DeleteAll.tsx        # Deletar todas as tarefas
│   └── HealthCheck.tsx      # Status da API
├── styles/
│   └── global.css           # Estilos globais
├── App.tsx                  # Configuração de rotas
└── main.tsx                 # Ponto de entrada da aplicação
```

## Rotas da Aplicação

| Rota | Página | Descrição |
|---|---|---|
| `/` | Dashboard | Métricas gerais e tarefas recentes |
| `/create` | Create | Formulário para criar nova tarefa |
| `/list` | List Tasks | Listagem de todas as tarefas |
| `/get` | Search | Busca de tarefa por ID |
| `/update` | Update | Edição de tarefa existente |
| `/delete` | Delete | Remoção de tarefa por ID |
| `/delete-all` | Purge | Remoção de todas as tarefas |
| `/health` | API Health | Verificação de status da API |

## Integração com o Backend

Todas as chamadas à API estão centralizadas em `src/api/taskApi.ts`. A URL base pode ser ajustada nesse arquivo:

```ts
const API_BASE_URL = 'http://localhost:8000';
```

Os endpoints consumidos seguem a documentação da API do backend. Consulte o `README.md` do backend ou `docs/API.md` para detalhes dos contratos.

## Estrutura do Objeto Task

```ts
interface Task {
  id: number | null;
  title: string;
  description: string;
  status: boolean; // true = concluída, false = pendente
}
```

## Observações

- O CORS do backend precisa permitir a origem `http://localhost:5173` para que a integração funcione corretamente.
- A aplicação não possui autenticação — todos os endpoints são públicos.
- As animações de transição entre páginas utilizam Framer Motion com efeito de fade + blur.
