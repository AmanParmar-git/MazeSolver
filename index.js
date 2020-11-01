console.time("Time");
const jimp = require("jimp");
const BFS = require("./BFS");

const fileName = process.argv[2];
jimp.read("Mazes/" + fileName + ".png", Main);

let height, width, maze, totalPixel;

function Main(err, image) {
  if (err) {
    throw err;
  }
  const { data } = image.bitmap;

  height = image.bitmap.height;
  width = image.bitmap.width;
  totalPixel = height * width;

  maze = convertDataToMaze(data);

  const startNode = maze[0].find((node) => node.isWall === false);
  const endNode = maze[height - 1].find((node) => node.isWall === false);

  const getEndNode = BFS(startNode, endNode, height, width, maze);

  const path = getPath(getEndNode);

  updateData(data, path);

  image.write("./Solved/" + fileName + " Solved.png");
  console.timeEnd("Time");
  console.log("Path size : " + path.size());
  console.log("Total Pixels : " + totalPixel);
  console.log("Saved " + fileName + " Solved.png");
}

function updateData(data, path) {
  let dataIndex = 0;
  let index = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (maze[i][j].start) {
        changeRGB(data, dataIndex, [18, 140, 20]);
      } else if (maze[i][j].end) {
        changeRGB(data, dataIndex, [255, 0, 0]);
      } else if (path.has(maze[i][j])) {
        changeRGB(data, dataIndex, [
          255 - (255 * index) / totalPixel,
          0,
          (255 * index) / totalPixel,
        ]);
      }
      index++;
      dataIndex += 4;
    }
  }
}

function changeRGB(data, i, RGB) {
  data[i] = RGB[0];
  data[i + 1] = RGB[1];
  data[i + 2] = RGB[2];
}

function getPath(node) {
  const path = new Set();
  while (node.start !== true) {
    path.add(node);
    node = node.parent;
  }
  path.add(node);
  return path;
}

function Node(x, y, isWall) {
  this.x = x;
  this.y = y;
  this.isWall = isWall;
}

function convertDataToMaze(data) {
  const Pixels = [];
  let rgba = [];
  for (let i = 1; i <= data.length; i++) {
    rgba.push(data[i - 1]);
    if (i % 4 === 0) {
      Pixels.push(rgba);
      rgba = [];
    }
  }

  const maze = [];
  let pixelIndex = 0;
  let mazeRaw = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      mazeRaw.push(
        new Node(
          i,
          j,
          Pixels[pixelIndex][0] === 0 ? true : false,
          Pixels[pixelIndex]
        )
      );
      pixelIndex++;
    }

    maze.push(mazeRaw);
    mazeRaw = [];
  }

  return maze;
}
