'use strict';

/**
 * @ngdoc function
 * @name minesweeperApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Main controller for the minesweeper game
 */
app.controller('MainCtrl', function($scope, notificationHelper, game) {
    // set some defaults
    var gridRows = 8;
    var gridCols = 8;
    var numMines = 10;

    $scope.gameStatus = 'inactive';

    $scope.showCell = function(row, col, grid, cell) {
      if ($scope.gameStatus === 'active') {
        if (cell.isMined) {
          gameOver();
        } else if (!cell.isRevealed) {
          cell.isRevealed = true;
          if (cell.nearbyMines === 0) {
            game.aroundCellForEach(row, col, grid, function(r, cl, g, c) {
              $scope.showCell(r, cl, g, c);
            });
          }
        }
      }
    };

    $scope.revealAllMines = function(toggle) {
      game.iterateAllCells($scope.grid, function(cell) {
        if (cell.isMined) {
          if (toggle) {
            cell.isRevealed = !cell.isRevealed;
          } else {
            cell.isRevealed = true;
          }
        }
      });
    };

    $scope.validateGame = function(grid) {
      var lost = false;
      game.iterateAllCells(grid, function(cell) {
        if (!cell.isRevealed && !cell.isMined) {
          lost = true;
        }
      });
      if (lost) {
        gameOver();
      } else {
        $scope.gameStatus = 'inactive';
        notificationHelper.displayWin();
      }
    };

    $scope.restartGame = function() {
      $scope.grid = game.generateGameGrid(gridRows, gridCols, numMines);
      $scope.gameStatus = 'active';
    };

    var gameOver = function() {
      $scope.revealAllMines();
      $scope.gameStatus = 'inactive';
      notificationHelper.displayLoss();
    };

    $scope.restartGame();
  });