class Call {
  constructor(firstName, lastName, timestamp, sip, city, phoneNumber, priority) {
    this.firstName=firstName;
    this.lastName=lastName;
    this.timestamp=timestamp;
    this.sip=sip;
    this.city=city;
    this.phoneNumber=phoneNumber;
    this.priority=priority;
  }
}

// The following functionalities and considerations are out of the scope of this exercise, but should be included in real world scenarios
// 1. peek(), delete(), size()
// 2. Max size. If max size is reached, we can use a buffer to temporarily store the calls
// 3. lock on insert() and pop()
// 4. This can be used more generically if we move the comparison logic to Call
class PriorityQueue {
  constructor() {
    this._heap=[];
  }

  insert(call) {
    // push new value to the end
    this._heap.push(call);

    // keeping comparing with parent until it finds the parent (higher priority) or it becomes the root
    let i=this._heap.length-1;
    while(i>0) {
      let parent=Math.floor((i-1)/2);
      if(this._heap[parent].priority>this._heap[i].priority) {
        return;
      }

      this._swap(i, parent);
      i=parent;
    }
  }

  pop() {
    // if it's empty, return an empty object
    if(this._heap.length==0) {
      return {};
    }

    // if there is only one item, pop and return
    const last=this._heap.pop();
    if(this._heap.length==0) {
      return last;
    }

    const result=this._heap[0];

    // keeping comparing with children until it's the correct parent or it becomes the leaf
    this._heap[0]=last;
    let i=0;
    while(i<this._heap.length-1) {
      const right=(i+1)*2;
      let left=right-1;
      if(left>=this._heap.length) {
        break;
      }

      // the higher children is picked for comparison
      if(right<this._heap.length&&this._heap[right].priority>this._heap[left].priority) {
        left=right;
      }

      if(this._heap[left].priority>this._heap[i].priority) {
        this._swap(i, left);
        i=left;
        continue;
      }

      break;
    }

    return result;
  }

  _swap(i, j) {
    const temp=this._heap[i];
    this._heap[i]=this._heap[j];
    this._heap[j]=temp;
  }
}

module.exports={
  Call: Call,
  PriorityQueue: PriorityQueue,
};
