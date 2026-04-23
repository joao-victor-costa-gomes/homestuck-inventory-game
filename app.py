from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Rota principal que carrega a tela de seleção de personagens
@app.route('/')
def index():
    return render_template('index.html')

# Rota preparada para receber a escolha do personagem e iniciar o jogo
@app.route('/select_character', methods=['POST'])
def select_character():
    data = request.json
    character = data.get('character')
    inventory_type = data.get('type')
    return jsonify({"status": "success", "redirect": "/game"})

if __name__ == '__main__':
    app.run(debug=True)