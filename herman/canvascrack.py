import json

from gameshow.gameshow import Gameshow


class Canvascrack(Gameshow):
    def __init__(self, players, questions_file):
        super().__init__("De Canvascrack", ["Tafel 1"], 2)

        self.player_names = players 

        # The specific question asked review stage
        # 0 = nothing revealed
        # 1 = question reveal
        # 2 = sound / video play
        # 3 = first answer revealed
        # 4 = second answer revealed
        # 5 = third answer revelaed
        self.question_stage_inner = 0

        # Whether we're in the review stage of the questions
        self.review_stage = False
        # The specific review stage
        # 0 = no reveal yet
        # 1 = reveal crack follow/no follow
        # 2 = reveal correct answer (and add scores)
        self.review_stage_inner = 0
        # Whether the score has been revealed yet
        self.score_released = False
        # Whether it's time for the crack to follow or not
        self.crack_response_time = False 

        self.load_questions(questions_file)

        self.set_current_question()

        self.reset_challenger_response_history()
        self.reset_crack_response_history()

    #
    # Question loading
    #

    def load_questions(self, questions_file):
        with open(questions_file, "rt") as reader:
            self.questions = json.loads(reader.read())

        # Question checking
        for question_set_index, question_set in enumerate(self.questions):
            question_set_index_human = question_set_index
            if len(question_set) != 5:
                print(
                    f"Warning: question set {question_set_index_human} does not contain five questions")

            for question_index, question in enumerate(question_set):
                question_index_human = question_index + 1

                if "answers" not in question:
                    print(
                        f"Warning: question set {question_set_index_human}, question {question_index_human} does not have answer key")
                else:
                    if len(question["answers"]) < 3:
                        print(
                            f"Warning: question set {question_set_index_human}, question {question_index_human} does not three defined answers")

    #
    # Round logic
    #

    def set_current_question(self):
        self.current_question = self.questions[self.current_round][self.current_subround]

    def advance(self):
        if not self.review_stage:
            # Increment inner question stage
            if self.question_stage_inner < 5:
                self.question_stage_inner += 1

            return

        # All information revealed for this subround, move to next one
        if self.review_stage_inner == 3:
            self.advance_subround()
            return

        if self.review_stage_inner == 2:
            self.release_score()

    def advance_subround(self):
        if not self.review_stage:
            self.advance_subround_answering_stage()
        else:
            self.advance_subround_review_stage()

    def advance_subround_answering_stage(self):
        if not (self.check_response_prohibited(self.challenger_response_history) and self.check_response_prohibited(self.crack_response_history)):
            print("Not all players have answered yet. Advancement rejected")
            return

        self.question_stage_inner = 0

        # All questions for this round have been asked
        if self.current_subround == 4:
            if not self.review_stage:
                self.review_stage = True
                self.current_subround = 0
                self.set_current_question()
                return

        super().advance_subround()
        self.set_current_question()

    def advance_subround_review_stage(self):
        self.review_stage_inner = 0

        # All questions for this round have been reviewed
        if self.current_subround == 4:
            # TODO: implement logic
            pass
            return

        super().advance_subround()
        self.set_current_question()

    #
    # Response logic
    #

    # Reset the responses given by the challenger
    def reset_challenger_response_history(self):
        self.challenger_response_history = []

    # Reset the responses given by the crack
    def reset_crack_response_history(self):
        self.crack_response_history = []

    def check_response_prohibited(self, history):
        return len(history) == self.current_subround + 1

    # Challenger responses
    def challenger_receive_answer(self, answer_index):
        # If the challenger has already responded to this round, do not accept a response
        if self.check_response_prohibited(self.challenger_response_history):
            print("Challenger has already responded for this round. Rejecting response")
            return

        self.challenger_response_history.append(answer_index)
        self.crack_response_time = True

    # Crack responses
    def crack_receive_answer(self, answer):
        # If it's not yet crack response time, do not accept a response
        if not self.crack_response_time:
            print("Not yet crack response time")
            return

        # If the crack has already responded to this round, do not accept a response
        if self.check_response_prohibited(self.crack_response_history):
            print("Crack has already responded for this round. Rejecting response")
            return

        self.crack_response_history.append(answer)
        self.crack_response_time = False

        self.advance_subround()

    #
    # Scoring
    #
    
    def release_score(self):
        challenger_response_index = self.challenger_response_history[self.current_subround]
        correct_response_index = self.questions[self.current_round][self.current_subround]["correct"]
        
        crack_response = self.crack_response_history[self.current_subround]

        # Challenger is correct
        if challenger_response_index == correct_response_index:
            self.players[0].points += 1
            
            # Crack has followed
            if crack_response:
                self.players[1].points += 1
        # Challenger is wrong
        else:
            # Crack can still gain points if they did not follow
            if not crack_response:
                self.players[1].points += 1
        
        self.score_released = True