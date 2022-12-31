# canvascrack
A Python version of "De Canvascrack"

![Canvascrack preview](https://user-images.githubusercontent.com/84721952/210135968-4b5499e4-3a54-4654-9851-87b6517ad788.png)

## Features

- faithful Canvascrack gameplay
- easy for players to use
- classic Canvascrack sound effects
- four different views: challenger, crack, presenter and viewer

## Motivation

In July of 2017, I created a version of "De Canvascrack" for use at home. I was just discovering websockets in Python, so my technology stack was at least somewhat alright for this type of project. Still, I was in a transitional phase from PHP, so my code was awkward to say the least. To not let all my past efforts go to waste, I decided to build a new version in Python with socket.io while reusing all the assets I created back then. The visual identity is based on the last version of De Canvascrack aired on television.

Also, shout out to the GOAT Herman Van Molle.

## Instructions

I'l try to also provide a Windows binary soon. Here's how to use the program from the source code:

### Preparation

These instructions only have to be run once.

1. Download and install [Python](https://www.python.org/).
2. `git clone` this repository, or download and unzip [this archive](https://github.com/AntheSevenants/canvascrack/archive/refs/heads/main.zip).
3. Open a terminal window. Navigate to the `canvascrack` directory:  
    `cd canvascrack`
4. Create a new virtual environment:  
    `python -m venv venv` or `python3 -m venv venv`
5. Activate the virtual environment:  
    `venv/Scripts/activate` (Windows), `source venv\bin\activate` (unix)
6. Install all dependencies:  
    `pip install -r requirements.txt`

### Running

These instructions need to be followed every time you want to run the quiz program.

1. Open a terminal window. Navigate to the `canvascrack` directory:  
    `cd canvascrack`
2. Activate the virtual environment:  
    `venv/Scripts/activate` (Windows), `source venv\bin\activate` (unix)
3. Run `canvascrack.py`:  
    `python3 canvascrack.py listen questions_directory`  
    `questions_directory` is the path to the directory where your questions are stored

## Question set design

Each question set belongs to its own directory. For example, you could create a directory "Episode 1" for the first episode, "Episode 2" for the second episode and so on.

Inside your question set directory, there should be a file called `questions.json`. The structure is as follows:

```json
[
	[
		{
			"short": "What is one afraid of when one has brontophobia?",
			"image": "brontophobia.png",
			"answers": [
				"Dinosaurs",
				"Lightning and thunder",
				"Water"
			],
			"correct": 1
		},
```

1. The outer list contains the questions for each Canvascrack "table" (round). Each element is a list of questions for that table. Currently, the quiz program will only play the first table, so there is no use in specifying questions for further tables.
2. The inner list contains the questions for that specific table. Each question is a simple dictionary.
    - `short`: the question as it will appear in the quiz interface
    - `image`: optional, the image accompanying the question;  
            you can leave out this key or set it to null if no image is required
    - `answers`: a list of the three possible answers to this question
    - `correct`: the index of the correct answer, 0-indexed
        - in the example, "Lightning and thunder" is the correct answer, which is answer 1 (second answer starting from zero)

## To-do

* Implement other tables
* Implement audio and video player
* Add Herman Van Molle