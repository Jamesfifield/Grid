import Grid from "./Grid";

describe("Grid Data Structure", () => {
  describe("constructor creates and sets correct row and column length", () => {
    const rowSize = 8;
    const columSize = 5;
    const grid = new Grid(columSize, rowSize);

    it("has sets the correct row and columns size ", () => {
      let [row, col] = grid.length;
      expect(row).toEqual(rowSize);
      expect(col).toEqual(columSize);
    });

    it("initializers the grid as a 2D array where size is n x m", () => {
      let gridArray = grid.toArray();
      expect(gridArray.length).toEqual(rowSize);
      expect(gridArray[0].length).toEqual(columSize);
    });

    it("throws an error if colums or row set to n where n <= 0 ", () => {
      expect(() => new Grid(0, 0)).toThrowError();
    });

    it("throws an error if colums or row set to n where n = -n", () => {
      expect(() => new Grid(-5, -1)).toThrowError();
    });
  });

  describe("Grid fills correctly", () => {
    it("fills grid with data T", () => {
      const grid = new Grid<number>(3, 3);
      const fillData = 8;
      const testArray = JSON.stringify(new Array(3).fill(fillData));
      const build = [testArray, testArray, testArray].join(",");
      grid.fill(fillData);
      expect(JSON.stringify(grid.toArray())).toMatch(build);
    });

    it("fills grid with data T", () => {
      const grid = new Grid<{ data: string }>(3, 3);
      const fillData = { data: "test" };
      //expect(JSON.stringify(grid.toArray())).toMatch();
    });
  });
});
