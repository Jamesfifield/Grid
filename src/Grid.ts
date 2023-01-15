export default class Grid<T> {
  private _grid: Array<T[]>;
  private _cols: number;
  private _rows: number;

  public get length() {
    return [this._rows, this._cols];
  }

  constructor(columns: number, rows: number) {
    if (columns < 1 || rows < 1)
      throw new Error("Grid can not be smaller than 1x1");
    this._grid = new Array(rows);

    for (let row = 0; row < rows; row++) {
      this._grid[row] = new Array<T>(columns);
    }

    this._cols = columns;
    this._rows = rows;
  }

  private _withinGridBoundaries(columns: number, rows: number) {
    if (columns >= this._cols || rows >= this._rows) {
      throw new Error("The position in the grid does not exist");
    }
    return true;
  }

  fill(dataSource: any) {
    if (typeof dataSource !== "object") {
      this._grid.forEach((row) => row.fill(dataSource));
      return;
    }
    //must be an object.
    for (let row = 0; row < this._grid.length; row++) {
      this._grid[row] = new Array(this._cols)
        .fill(0)
        .map(() => ({ ...dataSource })); //clone object so they are not equal to eachother.
    }
  }

  toArray() {
    return this._grid;
  }

  insert(value: T, columns: number, rows: number) {
    this._withinGridBoundaries(columns, rows);
    this._grid[rows][columns] = value;
  }

  getValueAt(columns: number, rows: number) {
    //this._withinGridBoundaries(columns, rows);
    return this._grid[rows][columns];
  }

  isEmptyAt(columns: number, rows: number) {
    return this._withinGridBoundaries(columns, rows)
      ? !Boolean(this._grid[rows][columns])
      : false;
  }

  //returns true if item2 is next to item1 horizontally, vertically or diaganally.
  isNextTo(item1: T, item2: T) {
    const index1 = this.indexOf(item1);
    const index2 = this.indexOf(item2);
    return Boolean(
      Math.sqrt(Math.pow(index1[0] - index2[0], 2)) <= 1 &&
        Math.sqrt(Math.pow(index1[1] - index2[1], 2)) <= 1
    );
  }

  indexOf(item: T) {
    let value = [-1, -1];

    for (let row = 0; row < this._grid.length; row++) {
      for (let col = 0; col < this._grid[row].length; col++) {
        if (this._grid[row][col] === item) {
          value = [row, col];
          return value;
        }
      }
    }
    return value;
  }

  map(callbackfn: (value: any, index: number, array: any[]) => any): any[] {
    return this._grid.map(callbackfn);
  }

  swap(column: number, row: number, withCol: number, withRow: number) {
    this._withinGridBoundaries(column, row);
    this._withinGridBoundaries(withCol, withRow);

    let temp = this._grid[row][column];
    this._grid[row][column] = this._grid[withRow][withCol];
    this._grid[withRow][withCol] = temp;
  }
}
