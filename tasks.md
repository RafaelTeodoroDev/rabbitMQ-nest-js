[X] Instale as dependências necessárias: MongoDB, RabbitMQ e Node.js.
[X] Crie um novo projeto Nest.js usando o CLI do Nest.js. Execute nest new meu-projeto no terminal.
[X] Instale as dependências necessárias para o projeto. Você precisará instalar @nestjs/mongoose, @nestjs/config, @nestjs/axios, amqplib e multer.
[] Configure a conexão do banco de dados MongoDB adicionando a URL do banco de dados ao arquivo .env.
[] Configure a conexão do RabbitMQ adicionando a string de conexão ao arquivo .env.
[] Crie um modelo User usando o Mongoose para definir o esquema dos dados do usuário.
[] Crie um UserController com as rotas e funções necessárias para cada um dos endpoints REST requeridos: POST /api/users, GET /api/user/{userId}, GET /api/user/{userId}/avatar e DELETE /api/user/{userId}/avatar.
[] Implemente a lógica para cada endpoint conforme descrito nos requisitos da tarefa.
[] Crie um produtor RabbitMQ para enviar um email e um evento RabbitMQ depois que o usuário é criado.
[] Escreva testes unitários e funcionais para cada endpoint e verifique se eles passam.
[] Execute npm run build para construir o projeto e depois npm run start para iniciar a aplicação.
[] Teste os endpoints usando o Postman ou uma ferramenta similar para garantir que eles estejam funcionando conforme o esperado.
[] Verifique se o seu projeto passa no eslint e está coberto por testes unitários/funcionais.
[] Compacte os arquivos do projeto (excluindo node_modules) e compartilhe-os com o RH, junto com um arquivo readme.md contendo instruções sobre como construir, executar e testar o projeto.