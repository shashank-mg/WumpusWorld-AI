let characters = [
  "WUMPUS",
  "SAFE-ZONE",
  "AGENT",
  "BREEZE",
  "STENCH",
  "GOLD",
  "PIT",
];
let horizontalCoOrdAdjust = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let empty = "----";
let world = new Array(4).fill().map(() => Array(4).fill(empty));
const randomCall = () => Math.random();
const floorNumber = (a) => Math.floor(a);
const calcCoOrd = (chrs, ch, rp) => {
  world.map((arr, i) => {
    arr.map((ele, j) => {
      if (ele === chrs) {
        horizontalCoOrdAdjust.forEach((m) => {
          let x = i - m[0];
          let y = j - m[1];
          if (x >= 0 && x < 4) {
            if (y >= 0 && y < 4) {
              if (world[x][y] === ch) {
                world[x][y] = rp;
              }
            }
          }
        });
      }
    });
  });
};

// Placing Wumpus
let placing_Wumpus_Row = floorNumber(randomCall() * 4);
let placing_Wumpus_Column = floorNumber(randomCall() * 4);

while (!placing_Wumpus_Row && !placing_Wumpus_Column) {
  let select = [1, 2, 3];
  placing_Wumpus_Column = select[floorNumber(randomCall() * 2)];
}
world[placing_Wumpus_Row][placing_Wumpus_Column] = characters[0];

// Placing Stenches
horizontalCoOrdAdjust.forEach((n) => {
  let x, y;
  x = placing_Wumpus_Row - n[0];
  y = placing_Wumpus_Column - n[1];
  if (x >= 0 && x < 4) {
    if (y >= 0 && y < 4) {
      world[x][y] = characters[4];
    }
  }
});
world[3][0] = characters[2];

// Placing Gold
let goldPlaced = false;
while (!goldPlaced) {
  let rN = floorNumber(randomCall() * 4);
  if (world[rN].includes(characters[4])) {
    world[rN][world[rN].indexOf(characters[4])] = characters[5];
    goldPlaced = true;
  }
}

// Placing SafeZones
calcCoOrd(characters[4], empty, characters[1]);

// Placing BREEZE
calcCoOrd(characters[1], empty, characters[3]);

// Placing PIT
calcCoOrd(characters[3], empty, characters[6]);

calcCoOrd(characters[6], empty, characters[3]);

// Completing the World
world.map((arr, i) => {
  arr.forEach((ele, j) => {
    if (ele === empty) {
      world[i][j] = characters[1];
    }
  });
});

console.log(world);

// Agent Solving
