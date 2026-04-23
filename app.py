from flask import Flask, render_template, request
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game')
def game():
    character = request.args.get('character', 'John Egbert')
    inv_type = request.args.get('type', 'Pilha')

    colors = {
        'John Egbert': '#0715cd',
        'Rose Lalonde': '#b536da',
        'Dave Strider': '#e00707',
        'Jade Harley': '#4ac925'
    }
    char_color = colors.get(character, '#000000')
    
    # Lógica de leitura do arquivo de texto
    items_list = []
    filepath = 'itens.txt'
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as file:
            for line in file:
                if '=' in line:
                    name, weight = line.strip().split('=')
                    items_list.append({
                        'name': name,
                        'weight': int(weight),
                        'img_filename': f"{name}.png"
                    })

    return render_template('game.html', 
                           character=character, 
                           inv_type=inv_type, 
                           color=char_color, 
                           items=items_list)

if __name__ == '__main__':
    app.run(debug=True)