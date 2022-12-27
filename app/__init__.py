from flask import Flask
from flask_socketio import SocketIO

from herman.canvascrack import Canvascrack

socketio = SocketIO()


def create_app(questions_directory, debug=False):
    """Create an application."""
    app = Flask(__name__)
    app.debug = debug
    app.config['SECRET_KEY'] = 'miep'

    app.config['game'] = Canvascrack(
        ["Uitdager", "Crack"], f"{questions_directory}/questions.json")

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint, url_prefix='/')

    socketio.init_app(app)
    return app
