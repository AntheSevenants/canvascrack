# dsmtw
# by Anthe Sevenants
# started on 2022-12-26
# based on the 2017 version in Python


from flask_socketio import SocketIO
import argparse

from app import create_app, socketio


#
# Arguments
#

parser = argparse.ArgumentParser(description='Play De Canvascrack')
parser.add_argument('function', type=str,
					help='listen')
parser.add_argument('questions_directory', type=str,
					help='tafelquiz')

args = parser.parse_args();

if args.function == "listen":
	app = create_app(debug=True)
	app.jinja_env.auto_reload = True
	app.config['TEMPLATES_AUTO_RELOAD'] = True

	socketio.run(app, port=10966, debug=True)