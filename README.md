# ApexPy Tasks – React To-Do List

Projeto `frontend_to_do_list` é uma aplicação SPA em React (Vite) para gerenciar tarefas com sincronização via API REST.

## Visão Geral

- Frontend: React, Vite, GSAP, lucide-react.
- API: http://localhost:8000 (baseURL configurável em `API_URL`).
- Funcionalidades: listar, criar, atualizar status, filtrar, deletar tarefas.

## Funcionalidades

1. Criar tarefa com título e descrição opcional.
2. Marcar como concluída/pendente (toggle status).
3. Deletar tarefa com animação GSAP.
4. Filtro por all/pending/completed.
5. Loading e sync indicator.

## Tecnologias

- React 18
- Vite
- GSAP
- lucide-react
- Fetch API

## Estrutura

- `src/App.jsx`: lógica UI e API
- `src/main.jsx`: mount React
- `src/index.css`: estilos globais

## Requisitos

- Node.js 18+
- npm/yarn
- Backend rodando em `http://localhost:8000`

## Instalação

```bash
npm install
npm run dev
```

## API Endpoints (backend esperados)

- GET `/items/` – lista tarefas
- POST `/` – cria tarefa: `{ title, description, status, id }`
- PUT `/items/:id` – atualiza tarefa (status)
- DELETE `/items/:id` – remove tarefa

## Como usar

1. Acesse `http://localhost:5173`
2. Adicione título e descrição.
3. Clique `Add` para criar.
4. Clique no ícone para marcar concluída.
5. Clique lixeira para deletar.
6. Alterne filtro para ver pendentes/concluídas.

## Desenvolvimento

- `npm run dev`: servidor de desenvolvimento.
- `npm run build`: build de produção.
- `npm run preview`: pré-visualizar build.

## Próximos passos sugeridos

- Melhorar tratamento de erros de rede com alertas visuais.
- Suporte a edição inline de tarefa.
- Paginação para grande volume de tarefas.
- Configuração de backend via variáveis de ambiente.

## Contribuição

1. Fork
2. Branch `feature/*`
3. PR com descrição e testes

## Licença

MIT
