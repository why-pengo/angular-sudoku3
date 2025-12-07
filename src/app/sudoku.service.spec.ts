import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { SudokuService } from './sudoku.service';

describe('SudokuService', () => {
  let service: SudokuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SudokuService],
    });
    service = TestBed.inject(SudokuService);

    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should create a service instance', () => {
    expect(service).toBeDefined();
  });

  it('should initialize with an empty board', () => {
    const board = service.board();
    expect(board).toHaveLength(9);
    expect(board[0]).toHaveLength(9);
  });

  it('should generate a new game', () => {
    service.newGame('easy');
    const board = service.board();
    const solution = service.solution();

    expect(solution).toHaveLength(9);
    expect(solution[0]).toHaveLength(9);

    // Count non-empty cells
    let filledCells = 0;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].value !== 0) {
          filledCells++;
        }
      }
    }

    // Easy difficulty should have around 51 filled cells (81 - 30)
    expect(filledCells).toBeGreaterThan(40);
    expect(filledCells).toBeLessThan(60);
  });

  it('should toggle pencil mode', () => {
    const initialMode = service.isPencilMode();
    service.togglePencilMode();
    expect(service.isPencilMode()).toBe(!initialMode);
  });

  it('should select a cell', () => {
    service.selectCell(3, 4);
    const selected = service.selectedCell();
    expect(selected).toEqual({ row: 3, col: 4 });
  });

  it('should set cell value in pen mode', () => {
    service.newGame('easy');
    service.isPencilMode.set(false);

    // Find an empty cell
    const board = service.board();
    let emptyRow = -1;
    let emptyCol = -1;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (!board[row][col].isFixed) {
          emptyRow = row;
          emptyCol = col;
          break;
        }
      }
      if (emptyRow !== -1) break;
    }

    if (emptyRow !== -1) {
      service.setCellValue(emptyRow, emptyCol, 5);
      const updatedBoard = service.board();
      expect(updatedBoard[emptyRow][emptyCol].value).toBe(5);
    }
  });

  it('should add pencil marks in pencil mode', () => {
    service.newGame('easy');
    service.isPencilMode.set(true);

    // Find an empty cell
    const board = service.board();
    let emptyRow = -1;
    let emptyCol = -1;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (!board[row][col].isFixed) {
          emptyRow = row;
          emptyCol = col;
          break;
        }
      }
      if (emptyRow !== -1) break;
    }

    if (emptyRow !== -1) {
      service.setCellValue(emptyRow, emptyCol, 5);
      service.setCellValue(emptyRow, emptyCol, 7);

      const updatedBoard = service.board();
      expect(updatedBoard[emptyRow][emptyCol].pencilMarks.has(5)).toBe(true);
      expect(updatedBoard[emptyRow][emptyCol].pencilMarks.has(7)).toBe(true);
    }
  });

  it('should clear a cell', () => {
    service.newGame('easy');

    // Find an empty cell and set a value
    const board = service.board();
    let emptyRow = -1;
    let emptyCol = -1;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (!board[row][col].isFixed) {
          emptyRow = row;
          emptyCol = col;
          break;
        }
      }
      if (emptyRow !== -1) break;
    }

    if (emptyRow !== -1) {
      service.setCellValue(emptyRow, emptyCol, 5);
      service.clearCell(emptyRow, emptyCol);

      const updatedBoard = service.board();
      expect(updatedBoard[emptyRow][emptyCol].value).toBe(0);
      expect(updatedBoard[emptyRow][emptyCol].pencilMarks.size).toBe(0);
    }
  });

  it('should toggle dark mode', () => {
    const initialMode = service.isDarkMode();
    service.toggleDarkMode();
    expect(service.isDarkMode()).toBe(!initialMode);

    // Toggle again
    service.toggleDarkMode();
    expect(service.isDarkMode()).toBe(initialMode);
  });

  it('should save and load dark mode preference', () => {
    // Set dark mode
    service.isDarkMode.set(true);
    service.toggleDarkMode(); // This will save it

    // Check localStorage
    const saved = localStorage.getItem('sudoku-dark-mode');
    expect(saved).toBe('false');
  });

  it('should initialize dark mode from localStorage', () => {
    // Set a preference in localStorage
    localStorage.setItem('sudoku-dark-mode', 'true');

    // Create a new service instance
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [SudokuService],
    });
    const newService = TestBed.inject(SudokuService);

    expect(newService.isDarkMode()).toBe(true);
  });
});
