from flask import Flask, request, jsonify, render_template
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sumar_matrices', methods=['POST'])
def sumar_matrices():
    data = request.json
    matriz1 = np.array(data['matriz1'])
    matriz2 = np.array(data['matriz2'])
    
    if matriz1.shape != matriz2.shape:
        return jsonify({'error': 'Las matrices deben tener el mismo tamaño'}), 400
    
    resultado = matriz1 + matriz2
    return jsonify({'resultado': resultado.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
