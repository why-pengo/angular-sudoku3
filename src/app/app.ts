import { Component } from '@angular/core';
import { SudokuBoard } from './sudoku-board';
import { SudokuControls } from './sudoku-controls';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [SudokuBoard, SudokuControls, MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
