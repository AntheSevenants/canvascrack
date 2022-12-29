import os
import random

from flask import session, redirect, url_for, render_template, request, send_file
from . import main

from flask import current_app


@main.route('/')
@main.route('/overview')
def overview():
    return render_template('landing.html')

@main.route('/challenger')
def challenger():
    return render_template('game.html', game_mode="challenger")

@main.route('/crack')
def crack():
    return render_template('game.html', game_mode="crack")

@main.route('/presenter')
def presenter():
    return render_template('game.html', game_mode="presenter")

@main.route('/viewer')
def viewer():
    return render_template('game.html', game_mode="viewer")

@main.route('/resources/<string:filename>')
def display_resource(filename):
	global_questions_directory = current_app.config["questions_directory"]

	if not os.path.isabs(global_questions_directory):
		path = os.path.join("..", global_questions_directory, filename)
	else:
		path = os.path.join(global_questions_directory, filename)

	return send_file(path)