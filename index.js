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
        //Node with 1 child or no child
        if (root.left === null) {
            return root.right;
        } else if (root.right === null) {
            return root.left;
        }
        //Node with 2 children
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
    inOrder(root, callback = null) {
        if (callback === null) {
            throw new Error("Callback is required");
        }
        if (root === null) return;
        
        this.inOrder(root.left, callback);
        callback(root);
        this.inOrder(root.right, callback);
    }
    preOrder(root, callback = null) {
        if (callback === null) {
            throw new Error("Callback is required");
        }
        if (root === null) return;

        callback(root);
        this.preOrder(root.left, callback);
        this.preOrder(root.right, callback);
    }

    postOrder(root, callback = null) {
        if (callback === null) {
            throw new Error("Callback is required");
        }
        if (root === null) return;
        this.postOrder(root.left, callback);
        this.postOrder(root.right, callback);
        callback(root);
    }

    height(root) {
        if (root === null) return 0;
        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }   
    depth(root, node) {
        if (root === null) return -1;
        if (root.data === node.data) return 0;
        let distance = this.depth(root.left, node);

        if (distance >= 0) return distance + 1;

        distance = this.depth(root.right, node);
        if (distance >= 0) return distance + 1;

        return -1;
    }

    isBalanced(root) {
        if (root === null) return true;
        let leftHeight = this.height(root.left);
        let rightHeight = this.height(root.right);
        if (Math.abs(leftHeight - rightHeight) > 1) return false;
        
        return this.isBalanced(root.left) && this.isBalanced(root.right);
    }
    rebalance() {
        let nodesArr = [];
        this.inOrder(this.root, node => nodesArr.push(node.data));

        this.root = this.buildTree(nodesArr);
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

//let filteredArr = testTree.filterArr(arr);
//testTree.root = testTree.buildTree(filteredArr);
//prettyPrint(testTree.root);
//testTree.insertNode(testTree.root, 222);
//prettyPrint(testTree.root);
//testTree.deleteNode(testTree.root, 67);
//testTree.findNode(testTree.root, 324); // Should print 324
//testTree.findNode(testTree.root, 325); // Should print null

//testTree.levelOrder(testTree.root, callback);
//testTree.levelOrder(testTree.root);
//testTree.inOrder(testTree.root, callback);
//testTree.inOrder(testTree.root);
//prettyPrint(testTree.root);
//testTree.preOrder(testTree.root, callback);
//testTree.postOrder(testTree.root, callback);
//console.log(testTree.height(testTree.root));
//const testNode1 = new Node(324);
//console.log(testTree.depth(testTree.root, testNode1));
//console.log(testTree.isBalanced(testTree.root));
//testTree.rebalance();


function generateRandomNum(numbers, maxLength) {
    let arr = [];
    for (let i = 0; i < maxLength; i++){
        let randomNum = Math.round(Math.random() * numbers);
        if (!arr.includes(randomNum)) {
            arr.push(randomNum);
        }
    }
    return arr;
}


function driverScript() {
    let testTree2 = new Tree();
    let testArr = generateRandomNum(99, 10);
    let filteredTestArr = testTree2.filterArr(testArr);
    testTree2.root = testTree2.buildTree(filteredTestArr);
    console.log(testTree2.isBalanced(testTree2.root));
    printTraversals(testTree2);
    testTree2.insertNode(testTree2.root, 124);
    testTree2.insertNode(testTree2.root, 256);
    console.log(testTree2.isBalanced(testTree2.root));
    testTree2.rebalance();
    console.log(testTree2.isBalanced(testTree2.root));
    printTraversals(testTree2);
}

function printTraversals(tree) {
    console.log("Level Order Traversal");
    tree.levelOrder(tree.root, callback);
    console.log("preOrder Traversal")
    tree.preOrder(tree.root, callback);
    console.log("postOrder traversal");
    tree.postOrder(tree.root, callback);
    console.log("inOrder Traversal");
    tree.inOrder(tree.root, callback);
}

driverScript();