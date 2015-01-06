app.factory("game", function() {

    var shuffleArray = function(arr) {
          // shuffles flat array in place
          var len = arr.length;
          for (var i = 0; i < len; i++) {
            // ensure equal chance of getting index within unshuffled portion
            var randI = Math.floor(Math.random() * (len - i));
            var randItem = arr.splice(randI, 1)[0];
            arr.push(randItem);
          }
        };

     var generateMatrix = function(flatArr, rows, cols) {
        // converts flat array into m x n dimensional array
        var grid = [];

        var gridI = 0;
        for (var r = 0; r < rows; r++) {
          grid.push([]);
          for (var c = 0; c < cols; c++) {
            grid[r].push(flatArr[gridI]);
            gridI++;
          }
        }

        return grid;
      };

    var iterateAllCells = function(grid, callbackOperation) {
        // faciitate iterating thru cells
        var rows = grid.length;
        var cols = grid[0].length;
        for (var r = 0; r < rows; r++) {
          for (var c = 0; c < cols; c++) {
            callbackOperation(grid[r][c], grid, r, c);
          }
        }
      };

   // [xShift, yShift]
  var traversalPath = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1]];

    var countNearbyMines = function(rowI, colI, grid) {
        var count = 0;
        for (var i = 0; i < traversalPath.length; i++) {
          var row = rowI + traversalPath[i][0];
          var col = colI + traversalPath[i][1];
          // check that the point on the exists on the grid
          // use first row for column, just to check if column index is valid
          if (grid[row] && grid[0][col]) {
            if (grid[row][col].isMined) {
              count++;
            }
          }
        }
        return count;
      };

      var aroundCellForEach = function(rowI, colI, grid, cb) {
        for (var i = 0; i < traversalPath.length; i++) {
          var row = rowI + traversalPath[i][0];
          var col = colI + traversalPath[i][1];
          // check that the point on the exists on the grid
          // use first row for column, just to check if column index is valid
          if (grid[row] && grid[0][col]) {
            cb(row, col, grid, grid[row][col]);
          }
        }
      };

      var generateGameGrid = function(rows, cols, mines) {
        // set up flat array
        var gridSetup = [];

        for (var i = 0; i < rows * cols; i++) {
          var isMined = i < mines;
          var nearbyMines = isMined ? null : 0;
          gridSetup.push({
            isMined: isMined,
            nearbyMines: nearbyMines,
            isRevealed: false
          });
        }

        // randomize order and transform to grid
        shuffleArray(gridSetup);

        var grid = generateMatrix(gridSetup, rows, cols);

        // set the nearbyMines property of each non-mine field
        iterateAllCells(grid, function(cell, grid, row, col) {
          if (!cell.isMined) {
            cell.nearbyMines = countNearbyMines(row, col, grid);
          }
        });

        return grid;
      };

    return {
      aroundCellForEach: aroundCellForEach,
      iterateAllCells: iterateAllCells,
      generateGameGrid: generateGameGrid
    };
});

