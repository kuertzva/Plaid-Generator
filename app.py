#! python3

from flask import Flask, render_template

app = Flask(__name__, static_folder='build/static',
template_folder='build')

@app.route('/')
def plaid():
    return render_template('index.html')
