import Grid from "./Grid";

describe("Grid Data Structure", () => {
  console.clear();
  //Test Contructor
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
  }); // END of Contructor Test

  //Tets Fill Method
  describe("Grid fills correctly", () => {
    it("fills grid with data T where T == typeof Number", () => {
      const grid = new Grid<number>(3, 3);
      const fillData = 8;
      const testArray = JSON.stringify(new Array(3).fill(fillData));
      const build = [testArray, testArray, testArray].join(",");
      grid.fill(fillData);
      expect(JSON.stringify(grid.toArray())).toMatch(build);
    });

    it("fills grid with data T where T == typeof string", () => {
      const grid = new Grid<string>(3, 3);
      const fillData = "hello";
      const testArray = JSON.stringify(new Array(3).fill(fillData));
      const build = [testArray, testArray, testArray].join(",");
      grid.fill(fillData);
      expect(JSON.stringify(grid.toArray())).toMatch(build);
    });

    describe("Grid clones objects", () => {
      const obj = { id: 1 };
      const grid = new Grid<typeof obj>(3, 3);
      grid.fill(obj);
      const obj2 = grid.getValueAt(2, 2);

      it("clones objects therefore grid[1][1] !=== grid[2][2]", () => {
        expect(obj2).not.toBe(obj);
      });

      it("copied object have the same key/values", () => {
        expect(obj2).toMatchObject(obj);
      });

      it("access object in random grid position", () => {
        expect(obj2.id).toEqual(obj.id);
      });
    });
  }); //END of Fill Method

  //Test insert
  describe("insert items into grid", () => {
    const obj = { id: 1 };
    const grid = new Grid<typeof obj>(3, 4);

    grid.insert(obj, 2, 2);

    it("inserted value into given column and row", () => {
      expect(grid.getValueAt(0, 2)).not.toBe(obj);
      expect(grid.getValueAt(2, 2)).toBe(obj);
    });

    it("value is in the correct row and column", () => {
      const [row, col] = grid.indexOf(obj);

      expect(row).toBe(2);
      expect(col).toBe(2);
    });
  }); //END of getValueAt()

  //Test getValueAt
  describe("retreive values from the grid using getValueAt method", () => {
    const grid = new Grid(3, 3);
    grid.fill(false);
    it("returns value given column and row", () => {
      expect(grid.getValueAt(2, 2)).toBeFalsy();
    });
  }); //END of getValueAt()

  //Test swap
  describe("swap values in the grid", () => {
    const grid = new Grid<{ id: number }>(6, 5);
    //debugger;
    grid.insert({ id: 2 }, 1, 1);
    grid.insert({ id: 7 }, 3, 4);

    //console.log(JSON.stringify(grid.toArray()));
    console.log(grid.getValueAt(3, 4));

    it("changes the position of two objects in the grid", () => {
      expect(grid.getValueAt(1, 1).id).toBe(2);
      expect(grid.getValueAt(3, 4).id).toBe(7);
      grid.swap(1, 1, 3, 4);
      expect(grid.getValueAt(1, 1).id).toBe(7);
      expect(grid.getValueAt(3, 4).id).toBe(2);
    });
  }); //END of getValueAt()
});
