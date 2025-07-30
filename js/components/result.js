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
    "text-gray-600",
    "text-xl",
    "mb-2",
    "msg"
  ]);
  msg.textContent = 'Your Guess ?';

  const scoreP = createElement("p", ["font-semibold","score"]);
   score=0
  scoreP.textContent = `Your score is: ${score}/10`;

  elementsAppender(resultDiv, [msg, scoreP]);

  return resultDiv;
}
