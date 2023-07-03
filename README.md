# Projeto Nuxt.js com Vuetify - One Punch Man Heroes

Este é um projeto em Nuxt.js com Vuetify para gerenciar os heróis do anime/mangá One Punch Man. O projeto possui as seguintes páginas:

- Página principal: exibe a lista de heróis cadastrados.
- Página de criação: permite adicionar um novo herói.
- Página de edição: permite editar os detalhes de um herói existente.

## Requisitos

- Node.js (versão 12 ou superior)
- NPM (ou Yarn)
- Docker

## Como rodar o projeto

1. Clone este repositório:
https://github.com/Amospk2/heroes-crud


2. Navegue até o diretório do servidor do projeto:

    cd server

3. Para subir os container do projeto, use:

    ```bash
    docker compose up -d

    # e depois

    ./setup.sh
    ```

    Note: O script dentro do setup servirá para configurar o pRest da forma dequada.


4. Instale as dependências do node:

```bash
cd front/heroes-crud
# e
npm install
# ou
yarn install
```

## Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Acesse o projeto no seu navegador:

```bash
http://localhost:3000
```


# Estrutura do projeto

O projeto possui a seguinte estrutura de arquivos:

    pages/
        index.vue: Página principal que lista os heróis.
        create.vue: Página de criação de um novo herói.
        edit.vue: Página de edição de um herói existente.
    components/: Contém os componentes reutilizáveis.
    layouts/: Layouts globais para as páginas.
    plugins/: Plugins utilizados no projeto.
    static/: Arquivos estáticos, como imagens e fontes.
    store/: Gerenciamento de estado com Vuex.

# Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema, bug ou tiver alguma melhoria para sugerir, sinta-se à vontade para abrir uma issue ou enviar um pull request.