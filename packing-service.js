// Define the Backpack class for managing items in the backpack
class Backpack {
  constructor() {
    this.capacity = {
      small: 0,
      medium: 0,
      big: 0,
    };
    this.items = {
      small: [],
      medium: [],
      big: [],
    };
  }

  // Method to set the capacity of the backpack
  setCapacity(capacity) {
    this.capacity = capacity;
  }

  // Method to pack an item of a specified size into the backpack
  packItem(itemSize, itemId) {
    if (this.items[itemSize].length < this.capacity[itemSize]) {
      this.items[itemSize].push(itemId); // Add the item to the corresponding item size array
      return itemId; // Return the unique identifier for the item
    } else {
      return -1; // Return -1 if there is no space available for the item
    }
  }

  // Method to unpack an item of a specified size from the backpack
  unpackItem(itemSize) {
    if (this.items[itemSize].length > 0) {
      const itemId = this.items[itemSize].pop(); // Remove and return the last added item
      return itemId; // Return the unique identifier of the item that was unpacked
    } else {
      return -2; // Return -2 if there are no items of this size in the backpack
    }
  }
}

// Define the PackingService class for managing packing and unpacking actions
class PackingService {
  constructor() {
    this.backpack = new Backpack(); // Create a backpack instance with initial capacity 0
    this.itemIdCounter = 1; // Counter for generating unique item identifiers
  }

  // Method to set the capacity of the backpack
  updateCapacity(capacity) {
    this.backpack.setCapacity(capacity);
  }

  // Method to process a list of packing and unpacking actions
  processActions(actions) {
    const result = []; // Array to store the results of each action
    for (const action of actions) {
      const [actionType, itemSize] = action;

      if (actionType === "pack") {
        const itemId = this.backpack.packItem(itemSize, this.itemIdCounter);
        result.push(itemId);
        if (itemId !== -1) {
          this.itemIdCounter++; // Increment the counter only if packing was successful
        }
      } else if (actionType === "unpack") {
        const itemId = this.backpack.unpackItem(itemSize);
        if (itemId === -2) {
          result.push(-2); // Return -2 if attempting to unpack an item that doesn't exist
        } else {
          result.push(itemId); // Otherwise, push the item identifier to the result array
        }
      }
    }
    return result; // Return the array of action results
  }
}
