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
