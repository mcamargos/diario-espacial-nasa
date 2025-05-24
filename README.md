# 🔭 Diário Espacial NASA

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Framework-Flask-black?style=flat&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/Frontend-JavaScript-yellow?style=flat&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/Web-HTML5-orange?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/Web-CSS3-blue?style=flat&logo=css3&logoColor=white)
![APIs](https://img.shields.io/badge/API-NASA%20APIs-red?style=flat&logo=nasa&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Um projeto web que deixa muito mais fácil e interativa a exploração do espaço em uma experiência visual. Utilize o **Diário Espacial NASA** para descobrir a Imagem Astronômica do Dia do seu nascimento ou alguma data marcante (APOD) e se divirta com as paisagens marcianas através das fotos do rover Curiosity (algumas datas não possuem fotos pois seu lançamento foi em 26 de novembro de 2011, se atente a isso)

Este projeto demonstra a utilização da APIs externas (NASA APIs), desenvolvimento de backend com Python Flask e criação de um frontend simples e responsivo com HTML, CSS e JavaScript puro

## ✨ Funcionalidades Principais

* **🌌 Imagem Astronômica do Dia (APOD):**
    * Exibe a foto ou vídeo astronômico diário tirado pela NASA com título, explicação e créditos
    * Navegação intuitiva para dias anteriores e futuros (até a data atual) ou seleção de data específica
    * Imagem/vídeo APOD como fundo dinâmico da página para uma experiência mais completa
    * Visualização em tela cheia via modal para observar os detalhes


* **📸 Galeria de Fotos de Marte:**
    * Explore uma coleção de fotos tiradas pelo rover Curiosity em Marte
    * Miniaturas clicáveis que se expandem para visualização detalhada


* **🚀 Interface Intuitiva e Diferenciada:**
    * Design minimalista com paleta de cores escura e tipografia limpa
    * Transições e animações suaves
    * Layout responsivo para garantir boa visualização em dispositivos móveis e desktops

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias e ferramentas:

### Backend (Python)

[![Python](https://img.shields.io/badge/Python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Requests](https://img.shields.io/badge/Requests-282C34?style=for-the-badge&logo=requests&logoColor=white)](https://docs.python-requests.org/)
[![python-dotenv](https://img.shields.io/badge/python--dotenv-DDDDDD?style=for-the-badge&logo=dot-env&logoColor=black)](https://pypi.org/project/python-dotenv/)

* **[Python](https://www.python.org/):** Linguagem de programação principal
* **[Flask](https://flask.palletsprojects.com/):** Microframework web leve e flexível
* **[Requests](https://docs.python-requests.org/):** Biblioteca HTTP
* **[python-dotenv](https://pypi.org/project/python-dotenv/):** Essencial para gerenciar variáveis de ambiente e manter a chave da API segura


### Frontend (Web)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

* **[HTML5](https://developer.mozilla.org/pt-BR/docs/Web/HTML/HTML5):** Estrutura semântica da página
* **[CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS):** Para estilização moderna 
* **[JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript):** Lógica interativa do lado de quem visualiza, incluindo o consumo da API do backend Flask e a manipulação dinâmica do DOM

### APIs Externas

[![NASA](https://img.shields.io/badge/NASA%20APIs-0B3D91?style=for-the-badge&logo=nasa&logoColor=white)](https://api.nasa.gov/)

* **[NASA APOD API](https://api.nasa.gov/api.html#apod):** Utilizada para buscar a Imagem Astronômica do Dia, incluindo fotos e vídeos
* **[NASA Mars Rover Photos API](https://api.nasa.gov/api.html#mars-photos):** Permite acesso a coleção de imagens capturadas pelo rover Curiosity

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o **Diário Espacial NASA** em sua máquina.

### Pré-requisitos

* **Python 3.8+**: Certifique-se de ter o Python instalado.
    * Você pode baixá-lo em [python.org](https://www.python.org/downloads/).
    * Verifique a instalação com `python3 --version` (macOS/Linux) ou `python --version` (Windows).


* **pip**: O gerenciador de pacotes do Python (geralmente vem com o Python).


* **Git**: Para clonar o repositório.
    * Baixe em [git-scm.com](https://git-scm.com/downloads).

### 1. Clonar o Repositório

Abra seu terminal e execute:

```bash
git clone [https://github.com/mcamargos/diario-espacial-nasa.git](https://github.com/mcamargos/diario-espacial-nasa.git)
cd diario-espacial-nasa 
```
### 2. Chave da API da NASA

Para que possa acessar os dados da NASA, é necessário obter uma chave de API gratuita:

1.  Vá para [https://api.nasa.gov/](https://api.nasa.gov/).
2.  Preencha o formulário para "Generate API Key" (Gerar Chave API) com seu nome e e-mail.
3.  Você receberá uma chave API por e-mail.
4.  Crie um novo arquivo chamado **`.env`** na raiz do seu projeto (`diario-espacial-nasa/.env`).
5.  Adicione sua chave API a este arquivo no seguinte formato:

    ```
    NASA_API_KEY=SUA_CHAVE_DA_API_AQUI
    ```


### 3. Configurar o Ambiente Python

É recomendável utilizar um ambiente virtual para isolar as dependências do projeto e evitar conflitos com outras instalações Python no seu sistema.

1.  **Criar o Ambiente Virtual:**
    Abra o terminal na pasta raiz do seu projeto (`diario-espacial-nasa`) e execute:

    ```bash
    python3 -m venv venv
    ```

2.  **Ativar o Ambiente Virtual:**
    Após a criação, ative o ambiente virtual para que as bibliotecas sejam instaladas nele:

    * **macOS / Linux:**
        ```bash
        source venv/bin/activate
        ```
    * **Windows :**
        ```cmd
        venv\Scripts\activate.bat
        ```
    * O ambiente está ativo quando `(venv)` aparecer no início da linha de comando no seu terminal.

3.  **Instalar Dependências:**
    Com o ambiente virtual **ativado**, instale as bibliotecas Python necessárias para o backend executando:

    ```bash
    pip install -r requirements.txt
    ```

### 4. Executar a Aplicação

Com o ambiente virtual ativado e todas as dependências instaladas, você pode iniciar o servidor web do Diário Espacial NASA.

No terminal, dentro da pasta raiz do projeto, execute:

```bash
python app.py
```
Você verá uma mensagem no terminal indicando que o servidor Flask está rodando.
Abra seu navegador e acesse esta URL para ver a aplicação em funcionamento: http://127.0.0.1:5000
