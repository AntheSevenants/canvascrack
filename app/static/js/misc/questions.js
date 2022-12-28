class Questions {
    static renderState(state) {
        let challengerResponseIndex = -1;
        if (state.crack_response_time) {
            challengerResponseIndex = state.challenger_response_history[state.challenger_response_history.length - 1];
        }

        for (let i = 0; i < state.current_question.answers.length; i++) {
            const answer = state.current_question.answers[i];
            const answerElement = document.getElementById(`question_option_inner_${i}`);

            answerElement.innerHTML = answer;

            const answerElementOuter = document.getElementById(`question_option_${i}`);
            if (host) {
                answerElementOuter.onclick = () => { canvascrack.challengerRespond(i); };
            }

            answerElementOuter.classList.remove("greyed");
            if (state.crack_response_time && i != challengerResponseIndex) {
                answerElementOuter.classList.add("greyed");
            }
        }

        const questionText = state.current_question.short;
        document.getElementById("question").innerHTML = questionText;

        document.getElementById("question_no").innerHTML = `${state.current_subround + 1}.`;
    }
}