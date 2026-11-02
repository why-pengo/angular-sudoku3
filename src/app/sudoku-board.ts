import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuService } from './sudoku.service';

@Component({
  selector: 'app-sudoku-board',
  imports: [CommonModule],
  templateUrl: './sudoku-board.html',
})
export class SudokuBoard {
  private sudokuService = inject(SudokuService);

  board = this.sudokuService.board;
  selectedCell = this.sudokuService.selectedCell;
  isPencilMode = this.sudokuService.isPencilMode;
  readonly digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // For highlighting matching values in pencil mode
  highlightedValue = computed(() => {
    const selected = this.selectedCell();
    const isPencil = this.isPencilMode();

    if (!selected || !isPencil) return null;

    const currentBoard = this.board();
    const cell = currentBoard[selected.row][selected.col];

    return cell.value !== 0 ? cell.value : null;
  });

  onCellClick(row: number, col: number): void {
    this.sudokuService.selectCell(row, col);
  }

  getCellClass(row: number, col: number): string[] {
    const classes: string[] = ['sudoku-board__cell'];
    const currentBoard = this.board();
    const cell = currentBoard[row][col];
    const selected = this.selectedCell();
    const highlighted = this.highlightedValue();

    if (cell.isFixed) {
      classes.push('sudoku-board__cell--fixed');
    }

    if (selected && selected.row === row && selected.col === col) {
      classes.push('sudoku-board__cell--selected');
    }

    if (cell.isCorrect === false) {
      classes.push('sudoku-board__cell--incorrect');
    } else if (cell.isCorrect === true) {
      classes.push('sudoku-board__cell--correct');
    }

    // Highlight matching values in pencil mode
    if (highlighted && cell.value === highlighted) {
      classes.push('sudoku-board__cell--highlighted');
    }

    // Highlight same row, column, or box
    if (selected) {
      if (selected.row === row || selected.col === col) {
        classes.push('sudoku-board__cell--same-group');
      }

      const boxRow = Math.floor(row / 3);
      const boxCol = Math.floor(col / 3);
      const selectedBoxRow = Math.floor(selected.row / 3);
      const selectedBoxCol = Math.floor(selected.col / 3);

      if (boxRow === selectedBoxRow && boxCol === selectedBoxCol) {
        classes.push('sudoku-board__cell--same-group');
      }
    }

    return classes;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
