window.correct = [];

const findAnswers = async (quizId) => {
  const URL = `https://kahoot.it/rest/kahoots/${quizId}`; // for testing use eaa0f12b-5a34-47fe-bb71-fffdf41040ec
  const req = await (await fetch(URL)).json();

  if ("error" in req) {
    console.error("Invalid quiz id, check all the characters");
    return;
  }

  const answers = req["answers"];
  for (const answer of answers) {
    const obj = {};

    obj["question"] = answer["queston"];
    const answers = [];

    for (const choice of answer["choices"]) {
      if (choice["correct"]) {
        answers.push(choice.answer);
      }
    }

    obj["answers"] = answers;
    window.correct.push(obj);
  }
}
