import json

# Flask stuff
from flask import session
from flask_socketio import emit, join_room, leave_room
from .. import socketio

from flask import current_app

namespace = ""


@socketio.on('connect', namespace=namespace)
def io_connect():
    print("Client connected")
    broadcast_state()

def broadcast_state():
    game = current_app.config["game"]

    socketio.emit("state", game.as_dict())

@socketio.on('challenger_response', namespace=namespace)
def io_challenger_response(answer_index):
    game = current_app.config["game"]

    game.challenger_receive_answer(answer_index)
    broadcast_state()

@socketio.on('crack_response', namespace=namespace)
def io_crack_response(answer):
    game = current_app.config["game"]

    game.crack_receive_answer(answer)
    broadcast_state()


@socketio.on('advance', namespace=namespace)
def io_advance():
    game = current_app.config["game"]

    game.advance()
    broadcast_state()
