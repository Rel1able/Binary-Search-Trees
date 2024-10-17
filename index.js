class Node{
    constructor(data) {
        this.data = data;
        this.right = null;
        this.left = null;
    }
}

class Tree{
    constructor(root = null) {
        this.root = root;
    }
    
    buildTree(arr, start = 0, end = arr.length - 1) {
        
        if (start > end) return null;
        let mid = Math.floor((start + end) / 2);

        let root= new Node(arr[mid]);

        root.left = this.buildTree(arr, start, mid - 1);
        root.right = this.buildTree(arr, mid + 1, end);

        return root;
    }
    filterArr(array) {
        return [...new Set(array)].sort((a, b) => a - b);
    }

    insertNode(root, value) {
        if (root === null) {
            return new Node(value);
        }
        if (root.data === value) {
            return root;
        }

        if (value < root.data) {
            root.left = this.insertNode(root.left, value);
        } else if (value > root.data) {
            root.right = this.insertNode(root.right, value);
        }
        return root;
    }
    deleteNode(root, value) {
        if (root === null) {
            return root;
        }
        if (value < root.data) {
            root.left = this.deleteNode(root.left, value);
            return root;
        } else if (value > root.data) {
            root.right = this.deleteNode(root.right, value);
            return root;
        }

        if (root.left === null) {
            return root.right;
        } else if (root.right === null) {
            return root.left;
        }

        let succParent = root;
        let succ = root.right;
        while (succ.left !== null) {
            succParent = succ;
            succ = succ.left;
        }
        root.data = succ.data;

        if (succParent.left === succ) {
            succParent.left = succ.right;
        } else {
            succParent.right = succ.right;
        }
        return root;
        
    }
    findNode(root, value) {
        if (root === null) {
            console.log(`Value ${value} was not found`);
            return null;
        }
        if (root.data === value) {
            console.log(`Value ${value} was found`);
            return root.data;
        }
        if (root.data > value) {
            return this.findNode(root.left, value);
        } else {
            return this.findNode(root.right, value);
        }
    }
    levelOrder(root, callback = null) {
        if (callback === null) {
            throw new Error("Callback is required");
        }
        if (root === null) return;
            let queue = [];
            queue.push(root);

        while (queue.length !== 0) {
            let current = queue.shift();
            callback(current);
            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        
        }
        
    }

}


const prettyPrint = (node, prefix = "", isLeft = true) => {
   if (node === null) {
     return;
   }
   if (node.right !== null) {
     prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
   }
   console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
   if (node.left !== null) {
     prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
   }
 };

let testTree = new Tree();

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function callback(node) {
    console.log(node.data);
}

let filteredArr = testTree.filterArr(arr);
testTree.root = testTree.buildTree(filteredArr);
prettyPrint(testTree.root);
testTree.insertNode(testTree.root, 222);
prettyPrint(testTree.root);
testTree.deleteNode(testTree.root, 67);
prettyPrint(testTree.root);
testTree.findNode(testTree.root, 324); // Should print 324
testTree.findNode(testTree.root, 325); // Should print null

testTree.levelOrder(testTree.root, callback);
testTree.levelOrder(testTree.root);
