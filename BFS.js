const getSrroundingNodes = require("./getSurroundingNodes");

module.exports = function (startNode, endNode, height, width, maze) {
  startNode.start = true;
  endNode.end = true;

  const queue = [];
  const visited = new Set();
  queue.push(startNode);

  while (queue.length !== 0) {
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
