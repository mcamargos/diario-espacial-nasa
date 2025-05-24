import os
from dotenv import load_dotenv
import requests
from flask import Flask, render_template, jsonify, request

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Obtém a chave da API da NASA das variáveis de ambiente
NASA_API_KEY = os.getenv("NASA_API_KEY")

if not NASA_API_KEY:
    print("Erro: A chave da API da NASA não está configurada. Crie um arquivo .env com NASA_API_KEY=SUA_CHAVE_AQUI")
    exit() # Interrompe a execução se a chave não for encontrada

app = Flask(__name__)

# URL base da API da NASA
APOD_API_URL = "https://api.nasa.gov/planetary/apod"
MARS_ROVER_API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos"

@app.route('/')
def index():
    """Rota principal que renderiza a página HTML."""
    return render_template('index.html')

@app.route('/api/apod')
def get_apod_data():
    """
    Rota para buscar a Astronomy Picture of the Day (APOD).
    Pode receber um parâmetro 'date' via query string.
    """
    date = request.args.get('date') # Pega a data da URL (ex: /api/apod?date=2023-01-01)
    params = {"api_key": NASA_API_KEY, "thumbs": True}
    if date:
        params["date"] = date

    try:
        response = requests.get(APOD_API_URL, params=params)
        response.raise_for_status() # Lança um erro para status de resposta HTTP ruins (4xx ou 5xx)
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar APOD: {e}")
        return jsonify({"error": "Não foi possível buscar a APOD", "details": str(e)}), 500

@app.route('/api/mars-rover')
def get_mars_rover_data():
    """
    Rota para buscar fotos do Mars Rover Curiosity.
    Requer um parâmetro 'date' via query string.
    """
    date = request.args.get('date')
    if not date:
        return jsonify({"error": "Data é obrigatória para buscar fotos de Marte"}), 400

    params = {"api_key": NASA_API_KEY, "earth_date": date}

    try:
        response = requests.get(MARS_ROVER_API_URL, params=params)
        response.raise_for_status()
        data = response.json()
        return jsonify(data.get("photos", [])) # Retorna apenas a lista de fotos
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar fotos de Marte: {e}")
        return jsonify({"error": "Não foi possível buscar fotos de Marte", "details": str(e)}), 500

if __name__ == '__main__':
    # Define a porta como 5000 por padrão. Debug=True é bom para desenvolvimento,
    # mas deve ser False em produção.
    if __name__ == '__main__':
     port = int(os.environ.get("PORT", 5000)) # Pega a porta da variável de ambiente 'PORT', ou usa 5000 como fallback
     app.run(debug=True, host='0.0.0.0', port=port) # host='0.0.0.0' permite que o servidor seja acessível externamente