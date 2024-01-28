import { createSignal, createEffect, onMount, on } from "https://esm.sh/solid-js@1.8.12";
import { createStore, produce } from "https://esm.sh/solid-js@1.8.12/store";
import html from "https://esm.sh/solid-js@1.8.12/html";
import { Chessboard2 } from "https://unpkg.com/@chrisoakman/chessboard2@0.5.0/dist/chessboard2.min.mjs";

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8]

function randInt(n) {
  return Math.floor(Math.random() * n)
}

function randSquare() {
  return `${FILES[randInt(FILES.length)]}${RANKS[randInt(RANKS.length)]}`
}

// see https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#type-annotations
/**
 * @typedef {{
 *  position: Function
 * }}
 */
let Chessboard;

export function App() {
  const [chessboard, setChessboard] = createSignal();
  const [clickedSquare, setClickedSquare] = createSignal(
    undefined,
    // Important, or we won't notice if you click the same
    // square twice in a row!
    { equals: false }
  );
  const [desiredSquare, setDesiredSquare] = createSignal(randSquare(), {
    equals: false,
  });
  const [history, setHistory] = createStore([]);
  onMount(() => {
    setChessboard(Chessboard2("chessboard", {
      onMouseupSquare: (event, domEvent) => {
        setClickedSquare(event.square);
      }
    }));
  });
  createEffect(on(clickedSquare, sq => {
    if (!sq) {
      return;
    }
    setHistory(produce(history => {
      history.push(desiredSquare() === sq ? "✅" : "❌");
    }));
    setDesiredSquare(randSquare());
  }));
  return html`
<div class="board">
  <p>Click on the following square:</p>
  <h2>${() => desiredSquare()}</h2>
  <h3>Record so far: ${() => history.join(" ")}</h3>
  <div id="chessboard"></div>
</div>

  `;
};