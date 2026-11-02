import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SudokuService } from './sudoku.service';

@Component({
  selector: 'app-sudoku-toolbar',
  imports: [MatButtonModule, MatIconModule, MatSelectModule, MatToolbarModule, MatTooltipModule],
  templateUrl: './sudoku-toolbar.html',
})
export class SudokuToolbar {
  private sudokuService = inject(SudokuService);

  difficulty = this.sudokuService.difficulty;
  isDarkMode = this.sudokuService.isDarkMode;

  onNewGame(): void {
    this.sudokuService.newGame(this.difficulty());
  }

  onDifficultyChange(difficulty: 'easy' | 'medium' | 'hard'): void {
    this.sudokuService.newGame(difficulty);
  }

  toggleDarkMode(): void {
    this.sudokuService.toggleDarkMode();
  }
}
