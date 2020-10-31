module.exports = function (node, height, width, maze) {
  const nodes = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (
        (j == 0 && i == 0) ||
        (i == -1 && j == -1) ||
        (i == -1 && j == 1) ||
        (i == 1 && j == -1) ||
        (i == 1 && j == 1)
      )
        continue;

      let dx = node.x + i;
      let dy = node.y + j;

      if (
        dx < 0 ||
        dy < 0 ||
        dx > height - 1 ||
        dy > width - 1 ||
        maze[dx][dy].isWall
      )
        continue;

      nodes.push(maze[dx][dy]);
    }
  }
  return nodes;
};
