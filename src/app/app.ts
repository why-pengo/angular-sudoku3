import { Component } from '@angular/core';
import { SudokuBoard } from './sudoku-board';
import { SudokuControls } from './sudoku-controls';
import { SudokuToolbar } from './sudoku-toolbar';

@Component({
  selector: 'app-root',
  imports: [SudokuBoard, SudokuControls, SudokuToolbar],
  templateUrl: './app.html',
})
export class App {}
