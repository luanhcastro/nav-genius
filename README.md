# Nav Genius

## Funcionalidades

- Cadastrar cliente
- Listar clientes
- Remover clientes
- Filtrar clientes 
- Exibir a sequência que representa a rota mais curta para visitar todos clientes, saindo do ponto (0,0)

## Ferramentas e versões:

docker: v23.0.3

nodeJs: v18.15.0

express: v4.18.2

joi: v17.12.0

dotenv: v16.3.1

pg: v8.11.3

reactJs: v18.2.0

antd: v5.13.1

## Estrutura/Construção

A aplicação é dividida em duas partes, o servidor e o cliente. Para criar uma nova instância do banco de dados Postgres, foi utilizado o docker, o servidor possui uma API utilizando express com as rotas necessárias para o cliente. As consultas foram feitas com SQL puro. O cliente foi desenvolvido com ReactJs e utiliza componentes do antdesign.

## Como rodar

### Banco de dados
Abra um novo terminal no diretório `./server` e use o comando:

 `$docker-compose up` 
 
 ou crie uma instância do postgres como preferir (lembrando em utilizar as credenciais disponíveis em `server/database/db.js`).
Para usar o docker-compose é preciso o ter instalado em sua máquina, veja em: https://docs.docker.com/compose/

## Servidor
No diretório raiz do servidor (`./server`) crie um arquivo `.env` (exemplo em `server/.env.example`), e utilize os comandos:

`$npm install`

`$npm start`

Caso a tabela `users` não exista, o servidor irá criá-la automaticamente. (disponível em `server/database/db-tables,js`) 

## Cliente
No diretório raiz do cliente (`./client`) crie um arquivo `.env` (exemplo em `server/.env.example`), e utilize os comandos:

`$npm install`

`$npm start`