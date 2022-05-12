import React from "react";
import "./tree.css";
import { TreeViz } from "./tree-visualizer";
import _ from "lodash";

class Tree {
    constructor() {
      this.root = null;
    }
    add(value) {
      if (this.root === null) {
        this.root = new Node(value);
      } else {
        this.root.add(value);
      }
    }
    toObject() {
      return this.root;
    }
  }
  
  class Node {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
      this.height = 1;
    }
    add(value) {
      if (value < this.value) {
        // go left
        if (this.left) {
          this.left.add(value);
        } else {
          this.left = new Node(value);
        }
        if (!this.right || this.right.height < this.left.height) {
          this.height = this.left.height + 1;
        }
      } else {
        if (this.right) {
          this.right.add(value);
        } else {
          this.right = new Node(value);
        }
        if (!this.left || this.right.height > this.left.height) {
          this.height = this.right.height + 1;
        }
      }
      this.balance();
    }
    balance() {
      // is this node out of balance? (check height)
      // yes? single? call rotate() on self.
      //  double? call rotate on child then on self
      const rightHeight = this.right ? this.right.height : 0;
      const leftHeight = this.left ? this.left.height : 0;
  
      if (leftHeight > rightHeight + 1) {
        const leftRightHeight = this.left.right ? this.left.right.height : 0;
        const leftLeftHeight = this.left.left ? this.left.left.height : 0;
  
        // double rotation
        if (leftRightHeight > leftLeftHeight) {
          this.left.rotateRR();
        }
  
        this.rotateLL();
      } else if (rightHeight > leftHeight + 1) {
        const rightRightHeight = this.right.right ? this.right.right.height : 0;
        const rightLeftHeight = this.right.left ? this.right.left.height : 0;
  
        // double rotation
        if (rightLeftHeight > rightRightHeight) {
          this.right.rotateLL();
        }
        this.rotateRR();
      }
    }
    rotateRR() {
      const valueBefore = this.value;
      const leftBefore = this.left;
      this.value = this.right.value;
      this.left = this.right;
      this.right = this.right.right;
      this.left.right = this.left.left;
      this.left.left = leftBefore;
      this.left.value = valueBefore;
      this.left.updateInNewLocation();
      this.updateInNewLocation();
    }
    rotateLL() {
      const valueBefore = this.value;
      const rightBefore = this.right;
      this.value = this.left.value;
      this.right = this.left;
      this.left = this.left.left;
      this.right.left = this.right.right;
      this.right.right = rightBefore;
      this.right.value = valueBefore;
      this.right.updateInNewLocation();
      this.updateInNewLocation();
    }
    updateInNewLocation() {
      // calculate the new height
      if (!this.right && !this.left) {
        this.height = 1;
      } else if (!this.right || (this.left && this.right.height < this.left.height)) {
        this.height = this.left.height + 1;
      } else {
        this.height = this.right.height + 1;
      }
    }
  }
  

export default function TreeComponent() {
    const nums = _.shuffle(_.range(10000));
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();
    return <TreeViz root={objs} />;
}


