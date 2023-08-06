# Projeto pizzaria - Backend
Projeto desenvolvido com uso do node js, prisma e postegres

## 🚀 Começando
### Requisitos
* Ter o  ```git```  instalado - Realizar o clone do projeto
* Ter o ```node js``` instalado - Instalar dependências e executar o projeto
* Você deve ter o ```Postgres``` instalado e em execução -  [Clique aqui para saber como.](https://www.devmedia.com.br/instalando-postgresql/23364)
### 🔧 Instalação


No seu terminal, execute: 

```
git clone https://github.com/Yanderalves/Pizzaria
```

E em seguida:


```
cd Pizzaria/backend
```

Agora, você deve criar um arquivo ```.env``` na raiz do projeto, e adicionar o seguinte conteúdo:

```
DATABASE_URL="SUA STRING DE CONEXÃO DO BANCO DE DADOS AQUI"

SECRET_JWT="pizzaria"

```
Exemplo de string de conexão:
 ```
"postgres://USUARIO:SENHA@URL:PORTA/pizzaria?schema=public"

```

Para garantir que o reconhecimento das variáveis de ambiente será um sucesso, execute:

```
npm rebuild
```

Com o banco de dados configurado, você deve fazer a criação das tabelas, isso pode ser alcançado com o seguinte comando:

``` 
prisma migrate dev
```


Feito isso, execute: 

```
npm install
```

```
npm run dev
```

Feito isso, o projeto já deve iniciar a execução

## 🛠️ Construído com

* [Node JS](https://nodejs.org/en) - Interpretador Javascript
* [Postgres](https://www.postgresql.org/) - Banco de dados
* [Prisma](https://www.postgresql.org/) - Kit de ferramentas para lidar com banco de dados

## ✒️ Autores

* **Yander Alves** - [Linkedin](https://www.linkedin.com/in/yanderalves/)