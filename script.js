// Get HTML elements
const packSmallButton = document.getElementById("packSmall");
const packMediumButton = document.getElementById("packMedium");
const packBigButton = document.getElementById("packBig");
const unpackSmallButton = document.getElementById("unpackSmall");
const unpackMediumButton = document.getElementById("unpackMedium");
const unpackBigButton = document.getElementById("unpackBig");
const resultsList = document.getElementById("resultsList");
const backpackState = document.getElementById("backpackState");

// Get HTML elements for capacity input
const smallCapacityInput = document.getElementById("smallCapacity");
const mediumCapacityInput = document.getElementById("mediumCapacity");
const bigCapacityInput = document.getElementById("bigCapacity");
const updateCapacityButton = document.getElementById("updateCapacity");

// Define the initial capacity of the backpack
let backpackCapacity = {
  small: 0,
  medium: 0,
  big: 0,
};

// Create an instance of the PackingService class
const packingService = new PackingService(backpackCapacity);

// Add event listener to the "Update Capacity" button
updateCapacityButton.addEventListener("click", updateBackpackCapacity);

// Function to update the backpack's capacity
function updateBackpackCapacity() {
  backpackCapacity = {
    small: parseInt(smallCapacityInput.value),
    medium: parseInt(mediumCapacityInput.value),
    big: parseInt(bigCapacityInput.value),
  };

  // Clear results and backpack state when capacity is updated
  resultsList.innerHTML = "";
  backpackState.textContent = JSON.stringify(backpackCapacity, null, 2);

  // Update the capacity in the PackingService instance
  packingService.updateCapacity(backpackCapacity);
}

// Add event listeners for packing and unpacking buttons
packSmallButton.addEventListener("click", () => performAction("pack", "small"));
packMediumButton.addEventListener("click", () =>
  performAction("pack", "medium")
);
packBigButton.addEventListener("click", () => performAction("pack", "big"));
unpackSmallButton.addEventListener("click", () =>
  performAction("unpack", "small")
);
unpackMediumButton.addEventListener("click", () =>
  performAction("unpack", "medium")
);
unpackBigButton.addEventListener("click", () => performAction("unpack", "big"));

// Function to perform packing and unpacking actions
function performAction(actionType, itemSize) {
  // Process the action using the PackingService
  const result = packingService.processActions([[actionType, itemSize]]);

  // Determine the result text based on the action outcome
  const resultText =
    result === -1
      ? "No space available!"
      : result === -2
      ? "No item to unpack!"
      : result[0];

  // Update the results list with the action and result
  resultsList.innerHTML += `<li>${actionType}: ${itemSize} -> ${resultText}</li>`;

  // Update the backpack state display
  backpackState.textContent = JSON.stringify(
    packingService.backpack.items,
    null,
    2
  );
}
