import os
import random

from flask import session, redirect, url_for, render_template, request, send_from_directory
from . import main


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
