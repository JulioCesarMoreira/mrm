# Instruções de Instalação e Uso do Projeto

Este guia fornece instruções para instalar o Docker, iniciar o projeto e acessá-lo no localhost, bem como desligar o projeto quando não estiver em uso.

## Instalação do Docker

### Linux

1. Siga as instruções específicas para sua distribuição Linux:
   - [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
   - [CentOS](https://docs.docker.com/engine/install/centos/)
   - [Debian](https://docs.docker.com/engine/install/debian/)
2. Após a instalação, siga as instruções gerais abaixo.

### Windows

1. Baixe o Docker Desktop para Windows no [site oficial](https://www.docker.com/products/docker-desktop) e siga as instruções de instalação.

## Iniciar o Projeto

1. Clone este repositório em seu sistema.

2. Abra um terminal no diretório raiz do projeto.

### Windows

3. Execute o arquivo `scripts/deploy-local.bat` fornecido para iniciar o projeto:
   Ex: $ ./scripts/deploy-local.bat

### Linux

3. Execute o arquivo `scripts/deploy-local.sh` fornecido para iniciar o projeto:
   Ex: $ sh ./scripts/deploy-local.sh

## Desligar o Projeto

1. Executar no terminal: $ docker-compose down
