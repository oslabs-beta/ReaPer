const linkedListRemove = (ll, val) => {
  let curr = ll.head;
  let prev;
  // do head check first to avoid it on every iteration
  if (ll.head && ll.head.val === val) {
    ll.head = ll.head.next;
    return curr;
  }
  while (curr) {
    if (curr.val === val) {
      prev.next = curr.next;
      return curr;
    }
    prev = curr;
    curr = curr.next;
  }
  return null;
};

const validBST = (tree, min = -Infinity, max = Infinity) => {
  if (!tree) return true;
  if (tree.value <= min || tree.value >= max) return false;
  return validBST(tree.left, min, tree.value) && validBST(tree.right, tree.value, max);
};