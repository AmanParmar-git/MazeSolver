module.exports = function (startNode, endNode, height, width, maze) {
  startNode.start = true;
  endNode.end = true;
  const visited = new Set();
  const queue = [];
  queue.push(startNode);

  while (queue.size !== 0) {
    const node = queue.pop();

    if (node.end) {
      return node;
    }

    visited.add(node);

    const sNodes = getSrroundingNodes(node, height, width, maze);

    for (let sNode of sNodes) {
      if (visited.has(sNode)) {
        continue;
      }
      sNode.parent = node;

      queue.push(sNode);
    }
  }
};

function getSrroundingNodes(node, height, width, maze) {
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
}
