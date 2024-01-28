import { onCleanup, createSignal, createEffect } from "https://esm.sh/solid-js@1.8.12";
import html from "https://esm.sh/solid-js@1.8.12/html";
import { Chessboard2 } from "https://unpkg.com/@chrisoakman/chessboard2@0.5.0/dist/chessboard2.min.mjs";

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export function App() {
  const [rank, setRank] = createSignal(0);
  const [file, setFile] = createSignal(0);
  const [chessboard, setChessboard] = createSignal(null);
  const rankTimer = setInterval(() => setRank(Math.floor(Math.random() * FILES.length)), 777);
  const fileTimer = setInterval(() => setFile(Math.floor(Math.random() * FILES.length)), 1337);
  onCleanup(() => {
    clearInterval(rankTimer);
    clearInterval(fileTimer);
  });
  createEffect(() => {
    setChessboard(Chessboard2("chessboard"));
  });
  createEffect(() => {
    let board = chessboard();
    if (!board) {
      return;
    }

    board.position(
      {
        [`${FILES[file()]}${rank() + 1}`]: 'wN'
      }
    )
  });
  return html`
<div class="board">
  <p>This is a chessboard with a knight moving around randomly:</p>
  <div id="chessboard"></div>
</div>

  `;
};