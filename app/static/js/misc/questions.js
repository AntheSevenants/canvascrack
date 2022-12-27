class Questions {
    static renderState(state) {
        for (let i = 0; i < state.current_question.answers.length; i++) {
            const answer = state.current_question.answers[i];
            const answerElement = document.getElementById(`question_option_inner_${i}`).innerHTML = answer;
        }

        const questionText = state.current_question.short;
        const questionElement = document.getElementById("question").innerHTML = questionText;
    }
}