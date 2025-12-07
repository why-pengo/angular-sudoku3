import { Injectable, signal, computed } from '@angular/core';

export interface Cell {
  value: number; // 0 means empty
  isFixed: boolean;
  pencilMarks: Set<number>;
  isCorrect?: boolean;
}

export interface GameState {
  board: Cell[][];
  solution: number[][];
  difficulty: 'easy' | 'medium' | 'hard';
  startTime: number;
  elapsedTime: number;
}

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  private readonly STORAGE_KEY = 'sudoku-game-state';

  board = signal<Cell[][]>(this.createEmptyBoard());
  solution = signal<number[][]>([]);
  selectedCell = signal<{ row: number; col: number } | null>(null);
  isPencilMode = signal<boolean>(false);
  difficulty = signal<'easy' | 'medium' | 'hard'>('medium');
  startTime = signal<number>(Date.now());
  elapsedTime = signal<number>(0);

  isGameComplete = computed(() => {
    const currentBoard = this.board();
    const currentSolution = this.solution();

    if (!currentSolution.length) return false;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentBoard[row][col].value !== currentSolution[row][col]) {
          return false;
        }
      }
    }
    return true;
  });

  constructor() {
    this.loadGameState();
  }

  private createEmptyBoard(): Cell[][] {
    return Array(9)
      .fill(null)
      .map(() =>
        Array(9)
          .fill(null)
          .map(() => ({
            value: 0,
            isFixed: false,
            pencilMarks: new Set<number>(),
            isCorrect: undefined,
          })),
      );
  }

  newGame(difficulty: 'easy' | 'medium' | 'hard' = 'medium'): void {
    this.difficulty.set(difficulty);
    const { puzzle, solution } = this.generateSudoku(difficulty);

    const newBoard = this.createEmptyBoard();
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        newBoard[row][col].value = puzzle[row][col];
        newBoard[row][col].isFixed = puzzle[row][col] !== 0;
      }
    }

    this.board.set(newBoard);
    this.solution.set(solution);
    this.selectedCell.set(null);
    this.startTime.set(Date.now());
    this.elapsedTime.set(0);
    this.saveGameState();
  }

  setCellValue(row: number, col: number, value: number): void {
    const currentBoard = this.board();
    const cell = currentBoard[row][col];

    if (cell.isFixed) return;

    if (this.isPencilMode()) {
      // Toggle pencil mark
      if (value === 0) {
        cell.pencilMarks.clear();
      } else {
        if (cell.pencilMarks.has(value)) {
          cell.pencilMarks.delete(value);
        } else {
          cell.pencilMarks.add(value);
        }
      }
    } else {
      // Pen mode - set the value
      cell.value = value;
      cell.pencilMarks.clear();

      // Check if correct
      if (value !== 0) {
        const currentSolution = this.solution();
        cell.isCorrect = value === currentSolution[row][col];
      } else {
        cell.isCorrect = undefined;
      }
    }

    this.board.set([...currentBoard]);
    this.saveGameState();
  }

  selectCell(row: number, col: number): void {
    this.selectedCell.set({ row, col });
  }

  togglePencilMode(): void {
    this.isPencilMode.update((mode) => !mode);
  }

  clearCell(row: number, col: number): void {
    const currentBoard = this.board();
    const cell = currentBoard[row][col];

    if (cell.isFixed) return;

    cell.value = 0;
    cell.pencilMarks.clear();
    cell.isCorrect = undefined;

    this.board.set([...currentBoard]);
    this.saveGameState();
  }

  saveGameState(): void {
    const state: GameState = {
      board: this.board().map((row) =>
        row.map((cell) => ({
          ...cell,
          pencilMarks: Array.from(cell.pencilMarks),
        })),
      ) as any,
      solution: this.solution(),
      difficulty: this.difficulty(),
      startTime: this.startTime(),
      elapsedTime: this.elapsedTime(),
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  loadGameState(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const state: GameState = JSON.parse(saved);

        const loadedBoard = state.board.map((row) =>
          row.map((cell: any) => ({
            ...cell,
            pencilMarks: new Set(cell.pencilMarks),
          })),
        );

        this.board.set(loadedBoard);
        this.solution.set(state.solution);
        this.difficulty.set(state.difficulty);
        this.startTime.set(state.startTime);
        this.elapsedTime.set(state.elapsedTime);
      } catch (e) {
        console.error('Failed to load game state', e);
        this.newGame();
      }
    } else {
      this.newGame();
    }
  }

  clearGameState(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Sudoku generation logic
  private generateSudoku(difficulty: 'easy' | 'medium' | 'hard'): {
    puzzle: number[][];
    solution: number[][];
  } {
    // Generate a complete valid Sudoku board
    const solution = this.generateCompleteSudoku();

    // Create puzzle by removing numbers
    const puzzle = solution.map((row) => [...row]);
    const cellsToRemove = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 40 : 50;

    let removed = 0;
    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);

      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0;
        removed++;
      }
    }

    return { puzzle, solution };
  }

  private generateCompleteSudoku(): number[][] {
    const board = Array(9)
      .fill(null)
      .map(() => Array(9).fill(0));
    this.fillBoard(board);
    return board;
  }

  private fillBoard(board: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

          for (const num of numbers) {
            if (this.isValid(board, row, col, num)) {
              board[row][col] = num;

              if (this.fillBoard(board)) {
                return true;
              }

              board[row][col] = 0;
            }
          }

          return false;
        }
      }
    }
    return true;
  }

  private isValid(board: number[][], row: number, col: number, num: number): boolean {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }

    // Check 3x3 box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) return false;
      }
    }

    return true;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}
