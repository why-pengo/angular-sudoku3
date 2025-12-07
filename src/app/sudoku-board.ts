import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuService } from './sudoku.service';

@Component({
  selector: 'app-sudoku-board',
  imports: [CommonModule],
  templateUrl: './sudoku-board.html',
  styleUrl: './sudoku-board.scss',
})
export class SudokuBoard {
  private sudokuService = inject(SudokuService);

  board = this.sudokuService.board;
  selectedCell = this.sudokuService.selectedCell;
  isPencilMode = this.sudokuService.isPencilMode;

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
    const classes: string[] = ['cell'];
    const currentBoard = this.board();
    const cell = currentBoard[row][col];
    const selected = this.selectedCell();
    const highlighted = this.highlightedValue();

    if (cell.isFixed) {
      classes.push('fixed');
    }

    if (selected && selected.row === row && selected.col === col) {
      classes.push('selected');
    }

    if (cell.isCorrect === false) {
      classes.push('incorrect');
    } else if (cell.isCorrect === true) {
      classes.push('correct');
    }

    // Highlight matching values in pencil mode
    if (highlighted && cell.value === highlighted) {
      classes.push('highlighted');
    }

    // Highlight same row, column, or box
    if (selected) {
      if (selected.row === row || selected.col === col) {
        classes.push('same-group');
      }

      const boxRow = Math.floor(row / 3);
      const boxCol = Math.floor(col / 3);
      const selectedBoxRow = Math.floor(selected.row / 3);
      const selectedBoxCol = Math.floor(selected.col / 3);

      if (boxRow === selectedBoxRow && boxCol === selectedBoxCol) {
        classes.push('same-group');
      }
    }

    return classes;
  }

  getPencilMarks(row: number, col: number): number[] {
    const currentBoard = this.board();
    return Array.from(currentBoard[row][col].pencilMarks).sort();
  }

  trackByIndex(index: number): number {
    return index;
  }
}
