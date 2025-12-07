import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SudokuService } from './sudoku.service';

@Component({
  selector: 'app-sudoku-controls',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  templateUrl: './sudoku-controls.html',
  styleUrl: './sudoku-controls.scss',
})
export class SudokuControls {
  private sudokuService = inject(SudokuService);

  isPencilMode = this.sudokuService.isPencilMode;
  selectedCell = this.sudokuService.selectedCell;
  difficulty = this.sudokuService.difficulty;
  isGameComplete = this.sudokuService.isGameComplete;
  isDarkMode = this.sudokuService.isDarkMode;

  @HostListener('window:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent): void {
    const selected = this.selectedCell();
    if (!selected) return;

    if (event.key >= '1' && event.key <= '9') {
      event.preventDefault();
      this.onNumberClick(parseInt(event.key, 10));
    } else if (event.key === 'Backspace' || event.key === 'Delete' || event.key === '0') {
      event.preventDefault();
      this.onNumberClick(0);
    } else if (event.key === 'p' || event.key === 'P') {
      event.preventDefault();
      this.togglePencilMode();
    }
  }

  onNumberClick(value: number): void {
    const selected = this.selectedCell();
    if (!selected) return;

    this.sudokuService.setCellValue(selected.row, selected.col, value);
  }

  togglePencilMode(): void {
    this.sudokuService.togglePencilMode();
  }

  onNewGame(): void {
    const currentDifficulty = this.difficulty();
    this.sudokuService.newGame(currentDifficulty);
  }

  onDifficultyChange(difficulty: 'easy' | 'medium' | 'hard'): void {
    this.sudokuService.newGame(difficulty);
  }

  onClearCell(): void {
    const selected = this.selectedCell();
    if (!selected) return;

    this.sudokuService.clearCell(selected.row, selected.col);
  }

  toggleDarkMode(): void {
    this.sudokuService.toggleDarkMode();
  }
}
