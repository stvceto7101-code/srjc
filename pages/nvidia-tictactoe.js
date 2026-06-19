import Head from 'next/head';
import { useEffect, useRef } from 'react';

export default function NvidiaTictactoe() {
  const boardRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const statusEl = statusRef.current;
    const cells = boardRef.current.querySelectorAll('.cell');
    let board = Array(9).fill(null);
    const human = 'X';
    const ai = 'O';

    function checkWinner(b) {
      const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      for (let combo of wins) {
        if (b[combo[0]] && b[combo[0]] === b[combo[1]] && b[combo[0]] === b[combo[2]]) return b[combo[0]];
      }
      return b.includes(null) ? null : 'tie';
    }

    function minimax(newBoard, depth, isMaximizing) {
      let result = checkWinner(newBoard);
      if (result === ai) return 10 - depth;
      if (result === human) return depth - 10;
      if (result === 'tie') return 0;
      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (!newBoard[i]) {
            newBoard[i] = ai;
            let score = minimax(newBoard, depth + 1, false);
            newBoard[i] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
          if (!newBoard[i]) {
            newBoard[i] = human;
            let score = minimax(newBoard, depth + 1, true);
            newBoard[i] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
        return bestScore;
      }
    }

    function aiMove() {
      let bestScore = -Infinity;
      let move;
      for (let i = 0; i < 9; i++) {
        if (!board[i]) {
          board[i] = ai;
          let score = minimax(board, 0, false);
          board[i] = null;
          if (score > bestScore) { bestScore = score; move = i; }
        }
      }
      if (move !== undefined) makeMove(move, ai);
    }

    function makeMove(index, player) {
      board[index] = player;
      const cell = cells[index];
      const span = document.createElement('span');
      span.innerText = player;
      span.className = player.toLowerCase();
      cell.appendChild(span);
      cell.classList.add('taken');

      let result = checkWinner(board);
      if (result) {
        if (result === 'tie') {
          statusEl.innerHTML = "It's a Tie!<br><small>Click any cell to explore NVIDIA.</small>";
        } else {
          const nvidiaName = cell.querySelector('.nvidia-name').innerText;
          statusEl.innerHTML = `${nvidiaName} Wins!<br><small>Click the green cell to visit.</small>`;
        }
        cells.forEach(c => {
          c.classList.add('game-over');
          c.onclick = () => window.open(c.dataset.url, '_blank');
        });
      } else if (player === human) {
        statusEl.innerText = "Thinking...";
        setTimeout(aiMove, 500);
      } else {
        statusEl.innerText = "Your Turn (X)";
      }
    }

    function handleClick(e) {
      const cell = e.currentTarget;
      const index = cell.dataset.index;
      if (!board[index] && !checkWinner(board)) {
        makeMove(parseInt(index), human);
      }
    }

    cells.forEach(cell => {
      cell.addEventListener('click', handleClick);
    });

    window.resetNvidiaGame = function() {
      board = Array(9).fill(null);
      statusEl.innerText = "Your Turn (X)";
      cells.forEach(cell => {
        cell.classList.remove('taken', 'game-over');
        const existingSpan = cell.querySelector('span:not(.nvidia-name)');
        if (existingSpan) cell.removeChild(existingSpan);
        cell.onclick = null;
      });
    };

    return () => {
      cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
      });
    };
  }, []);

  const cellData = [
    { url: 'https://developer.nvidia.com/ai', name: 'AI Models & Frameworks' },
    { url: 'https://developer.nvidia.com/embedded-computing', name: 'Embedded & Edge AI' },
    { url: 'https://developer.nvidia.com/vera-rubin', name: 'Vera Rubin AI Pod' },
    { url: 'https://developer.nvidia.com/tsmc-vulnerabilities', name: 'TSMC Security Vulnerabilities' },
    { url: 'https://developer.nvidia.com/cuda-zone', name: 'CUDA & Parallel Computing' },
    { url: 'https://developer.nvidia.com/omniverse', name: 'Omniverse Platform' },
    { url: 'https://developer.nvidia.com/drive', name: 'DRIVE Autonomous Vehicles' },
    { url: 'https://developer.nvidia.com/isaac', name: 'Isaac Robotics' },
    { url: 'https://developer.nvidia.com/jetson', name: 'Jetson AI at the Edge' },
  ];

  return (
    <>
      <Head>
        <title>NVIDIA Developer Tic-Tac-Toe</title>
      </Head>
      <style jsx global>{`
        .nvidia-page {
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #000000;
          color: #ffffff;
          padding: 20px;
          min-height: 100vh;
        }
        .nvidia-page .top-nav { margin-bottom: 20px; display: flex; gap: 10px; }
        .nvidia-page .reset-btn {
          text-decoration: none;
          color: white;
          background: #2f2f2f;
          padding: 10px 20px;
          border-radius: 30px;
          font-weight: bold;
          font-size: 0.9rem;
          box-shadow: 0 4px 15px rgba(47, 47, 47, 0.3);
          transition: 0.3s;
          border: none;
          cursor: pointer;
        }
        .nvidia-page .reset-btn:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }
        .nvidia-page .status {
          margin: 20px;
          font-size: 1.2rem;
          font-weight: bold;
          height: 50px;
          text-align: center;
          max-width: 320px;
          color: #ffffff;
        }
        .nvidia-page .status small {
          font-size: 0.8rem;
          color: #cccccc;
        }
        .nvidia-page .grid {
          display: grid;
          grid-template-columns: repeat(3, 100px);
          gap: 10px;
        }
        .nvidia-page .cell {
          width: 100px;
          height: 100px;
          background: #1a3a76;
          border: 2px solid #76B900;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          font-weight: bold;
          border-radius: 12px;
          position: relative;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          color: white;
        }
        .nvidia-page .cell:not(.taken):not(.game-over):hover {
          background: #2a4a86;
          border-color: #99cc00;
        }
        .nvidia-page .cell.taken { cursor: default; pointer-events: none; }
        .nvidia-page .cell.game-over {
          cursor: pointer;
          pointer-events: auto;
          border-color: #76B900;
          background: #0f2a4a;
        }
        .nvidia-page .nvidia-name {
          position: absolute;
          bottom: 5px;
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.8);
          text-align: center;
          width: 90%;
        }
        .nvidia-page .x { color: #76B900; }
        .nvidia-page .o { color: #ffffff; }
        .nvidia-page .comment-section {
          margin-top: 40px;
          width: 100%;
          max-width: 340px;
          border-top: 2px solid #76B900;
          padding-top: 20px;
        }
        .nvidia-page .form-control {
          width: 100%;
          height: 80px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #76B900;
          border-radius: 5px;
          box-sizing: border-box;
          margin-bottom: 10px;
          color: #ffffff;
          font-family: sans-serif;
        }
        .nvidia-page .btn-success {
          width: 100%;
          background-color: #76B900;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s;
        }
        .nvidia-page .btn-success:hover {
          background-color: #99cc00;
        }
      `}</style>

      <div className="nvidia-page">
        <div className="top-nav">
          <button className="reset-btn" onClick={() => window.resetNvidiaGame && window.resetNvidiaGame()}>RESET GAME</button>
        </div>

        <div className="status" ref={statusRef}>Your Turn (X)</div>

        <div className="grid" ref={boardRef}>
          {cellData.map((item, index) => (
            <div key={index} className="cell" data-index={index} data-url={item.url}>
              <span className="nvidia-name">{item.name}</span>
            </div>
          ))}
        </div>

        <div className="comment-section">
          <form action="https://yulbrinner.pythonanywhere.com/" method="POST">
            <textarea name="contents" placeholder="THANK YOU FOR CONTACTING NVIDIA DEVELOPER. PLEASE LEAVE YOUR COMMENT..." className="form-control"></textarea>
            <input type="submit" className="btn-success" value="Post comment" />
          </form>
        </div>
      </div>
    </>
  );
}
