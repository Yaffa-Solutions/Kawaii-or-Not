import { createElement ,elementsAppender} from "./header.js";

export const createResultSection=(score, isCorrect) =>{
  const resultDiv = createElement("div", [
    "bg-white",
    "rounded-xl",
    "shadow",
    "p-6",
    "max-w-xs",
    "text-center",
  ]);

  const msg = createElement("p", [
    "font-bold",
    isCorrect ? "text-green-600" : "text-red-600",
    "text-xl",
    "mb-2",
  ]);
  msg.textContent = isCorrect ? "You got it right!" : "Try again!";

  const scoreP = createElement("p", ["font-semibold"]);
  scoreP.textContent = `Your score is: ${score}`;

  elementsAppender(resultDiv, [msg, scoreP]);

  return resultDiv;
}
