# Sudoku App (as3)

A modern, feature-rich Sudoku game built with Angular 21.

## Features

- ✅ **Angular 21** - Built with the latest Angular version
- ✅ **Signals-based** - Uses Angular Signals for reactive state management
- ✅ **Zoneless** - No zone.js dependency, using `provideZonelessChangeDetection()`
- ✅ **Angular Material 3** - Modern Material Design UI components
- ✅ **Responsive Design** - Full height and width layout with resizable game board
- ✅ **LocalStorage Persistence** - Automatically saves and restores game state
- ✅ **Pencil Mode** - Enter guesses/notes in cells with pencil marks
- ✅ **Pen Mode** - Enter final values with automatic correctness checking
- ✅ **Smart Highlighting** - When a cell is clicked in pencil mode, all matching values are highlighted
- ✅ **Visual Feedback** - Incorrect entries shown in red, correct in green
- ✅ **Multiple Difficulties** - Easy, Medium, and Hard difficulty levels
- ✅ **Keyboard Support** - Use number keys (1-9), Backspace/Delete to clear, 'P' to toggle pencil mode
- ✅ **Vitest Testing** - Unit tests using Vitest (no Karma or Jasmine)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
cd as3
npm install
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
npm test
```

Run tests in watch mode:

```bash
npm test:ui
```

## How to Play

1. **Select a Cell** - Click on any cell to select it
2. **Enter Numbers** - Use the number pad or keyboard (1-9) to enter values
3. **Pen vs Pencil Mode**:
   - **Pen Mode** (default): Enter final answers. The app will check if your answer is correct
   - **Pencil Mode**: Add notes/guesses to cells. Multiple pencil marks can be added per cell
4. **Clear a Cell** - Press the Clear button or Backspace/Delete key
5. **New Game** - Click "New Game" to start fresh with the current difficulty
6. **Change Difficulty** - Select Easy, Medium, or Hard from the dropdown

## Game Features

### Visual Indicators

- **Fixed cells** (puzzle givens) are shown in bold black
- **Selected cell** is highlighted in blue
- **Same row/column/box** as selected cell are highlighted in light blue
- **Matching values** in pencil mode are highlighted in green
- **Incorrect entries** (pen mode) are shown with red background
- **Correct entries** (pen mode) show the number in green

### Keyboard Shortcuts

- `1-9`: Enter number in selected cell
- `0`, `Backspace`, `Delete`: Clear selected cell
- `P`: Toggle between Pen and Pencil mode

## Architecture

### Components

- **App** - Main application container with toolbar and layout
- **SudokuBoard** - Game board display with 9x9 grid
- **SudokuControls** - Control panel with mode toggles, number pad, and game controls

### Services

- **SudokuService** - Core game logic, state management, and Sudoku puzzle generation

### Key Technologies

- **Signals** - All state is managed using Angular Signals for fine-grained reactivity
- **Zoneless Change Detection** - Better performance without zone.js overhead
- **Standalone Components** - No NgModules, using standalone component architecture
- **SCSS** - Styling with Sass for better maintainability
- **Material 3** - Modern Material Design components and theming

## Testing

The app uses Vitest for unit testing, configured to work with Angular's zoneless architecture. Tests include:

- Service unit tests
- State management tests
- Game logic tests

## File Naming Convention

All components and files follow the naming convention without "Component" suffix:
- `sudoku-board.ts` (not `sudoku-board.component.ts`)
- `SudokuBoard` class (not `SudokuBoardComponent`)

## License

This project is licensed under the MIT License.

