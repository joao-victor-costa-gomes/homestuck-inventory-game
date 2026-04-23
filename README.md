# Homestuck Inventory Game 

## Tecnologias Utilizadas

* **Backend:** Python 3.x com Flask.
* **Frontend:** HTML5, CSS3  e JavaScript.
* **Persistência:** Leitura de dados via arquivo de texto.


## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
* [Python 3.8+](https://www.python.org/downloads/)
* [Pip](https://pip.pypa.io/en/stable/installation/) (Gerenciador de pacotes do Python)

## 🔧 Como Baixar e Rodar o Projeto

1.  **Extraia o projeto:**
    Certifique-se de que a estrutura de pastas está conforme o esperado:
    ```text
    /
    ├── app.py
    ├── itens.txt
    ├── templates/
    │   ├── index.html
    │   └── game.html
    └── static/
        ├── css/style.css
        ├── js/
        │   ├── ui_controller.js
        │   ├── PilhaInventory.js
        │   ├── FilaInventory.js
        │   ├── TabelaHashInventory.js
        │   └── ArvoreInventory.js
        ├── img/
        │   └── itens/ (Imagens dos itens .png)
        └── audio/ (Música de fundo)
    ```

2.  **Instale as dependências:**
    Abra o terminal na pasta raiz do projeto e execute:
    ```bash
    pip install flask
    ```

3.  **Inicie o servidor:**
    Ainda no terminal, execute o comando:
    ```bash
    python app.py
    ```

4.  **Acesse no navegador:**
    Abra o seu navegador e acesse o endereço:
    `http://127.0.0.1:5000`