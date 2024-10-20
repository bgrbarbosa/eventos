# Projeto Cadastro de Eventos

Projeto desenvolvido na linguagem de programação JAVA com Javascript. É dividio em duas camadas, sendo a de BackEnd desenvolvida com SpringBoot e o FrontEnd desenvolvido com Angular versão 12. O objetivo da ferramenta é fazer o controle de eventos e publicar os mesmos em uma área que permita as pessoas interessadas em se cadastrar em um determinado evento. O sistema possui dois tipos de acesso, o público e o administrador. No acesso público, os usuários poderão visualizar os eventos disponíveis e realizar a sua incrição nos mesmo. Já na área administrativa, o sistema possui o controle como um todo dos dados da aplicação, não sendo permitido apenas a inscrição de um determinado usuário a um evento, tarefa essa só permitida para as pessoas que desejam realizar a inscrição.

Área pública
![image](https://github.com/user-attachments/assets/d7b6e8f5-042e-44b0-9c03-c30292728e4e)

![image](https://github.com/user-attachments/assets/2c2652f6-dbef-422f-9a83-c63c2715fdaf)

![image](https://github.com/user-attachments/assets/ea8f7cfb-0a52-4cf0-9a26-49d3b7c2f6e5)

Área restrita

![image](https://github.com/user-attachments/assets/335fc6cd-c4dd-4b63-bd57-ae8c8fd9fb3d)

![image](https://github.com/user-attachments/assets/14042903-952d-4cb6-be7e-82bae2671f05)

## 🚀 Montagem de Ambiente

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[Implantação](#-implanta%C3%A7%C3%A3o)** para saber como implantar o projeto.

### 📋 Pré-requisitos

Para que a aplicação rode localmente, devemos ter instalado na máquina os itens listados abaixo: <br>

Banco de Dados Postgress 16.1<br>
Java versão 17<br>
Node versão 14.17.1<br>
maven 3.8.7

### 🔧 Instalação passo a passo

1) Realizar o clone do projeto - git clone https://github.com/bgrbarbosa/eventos.git<br>
![image](https://github.com/user-attachments/assets/5f96fcaf-33a8-45ca-9740-42ff4bee558c)


2) Para a build do front-end

   2.1) Na pasta raiz do projeto rodar o comando: npm install<br>
   2.2) ng serve

3) Para buildar o back-end

   3.1) Na pasta raiz da api (eventos-api) rodar o comando: mvn clean install (Para instalar as bibliotecas do projeto) <br>
   3.2) Rodar o comando : spring-boot:run (Para startar o projeto) 
 
## ⚙️ Executando os testes

Após buildar o front-end e o back-end da aplicação, abrir o navegaor na url http://localhost:4200/home e a tela contendo os eventos cadastrados deverá ser exibida, caso exista evento cadastrado. Caso exista evento e o mesmo não apareca na tela, verifique se a api está de pé.


## 📦 Implantação

1) Criando um build de deploy do backend: mvn clean install -DskipTests
2) Criando um build de deploy do frontend: ng build

## 📌 Versão

V1.0.0 - Versão Beta. 

## ✒️ Autores

Projetado e Desenvolvido por: Bruno Gaspar Romeiro Barbosa.<br>
Contato: bgrbarbosa@hotmail.com - Cel: (24)98854-9631

## 📄 Licença

Este projeto foi criado para fins educativo, sendo livre para ser clonado e alterado de acordo com a necessidade dos usuários.





