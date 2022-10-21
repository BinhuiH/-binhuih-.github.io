// Get the element
const bubbleList = document.getElementById("bubble-list");
// Define the size of each bubble
const bubbleWidth = 58;
// Get the width
let wrapperWidth = bubbleList.clientWidth;
// Get the height
let wrapperHeight = bubbleList.clientHeight;
// Get the number of rows
let bubblePerRow = Math.floor(wrapperWidth / bubbleWidth);
// Get the number of each column
let bubblePerCol = Math.floor(wrapperHeight / bubbleWidth);
// The total number of pinches
let count = 0;

// Count -- increase
const countAdd = () => {
  count++;
  document.getElementById("count").innerText = count;
  };
  // Count -- decrease
  const countSub = () => {
  count--;
  document.getElementById("count").innerText = count;
  };
  // Count -- reset
  const countReset = () => {
  count = 0;
  document.getElementById("count").innerText = count;
  };
  // Randomly pinch bubble sound
  const randomAudio = () => {
  // 1-3 Random number
  const random = Math.floor(Math.random() * 3) + 1;
  // Play the sound effects
  document.getElementById(`bubbleAudio${random}`).play();
  };
  
  // Create a bubble
  const createBubble = () => {
  for (let i = 0;  i < bubblePerCol;  i++) {
  // create a line
  const bubbleRow = document.createElement("div");
  bubbleRow.className = "bubble-row";
  for (let j = 0;  j < bubblePerRow;  j++) {
  // Create a bubble
  const bubble = document.createElement("div");
  // Set the class of the bubble element
  bubble.className = "bubble";
  // Set the coordinate tags for the bubble elements
  bubble.dataset.x = j;
  bubble.dataset.y = i;
  // Add bubbles to the line
  bubbleRow.appendChild(bubble);
  }
  // Add to the bubble list
  bubbleList.appendChild(bubbleRow);
  }
  };
  // Perform Generate bubbles
  createBubble();
  
  // undo stack
  const undoStack = [];
  // redo stack
  const redoStack = [];
  // knead a bubble
  document.querySelectorAll(".bubble").forEach((bubble) => {
  bubble.addEventListener("click", (e) => {
  // Check whether the bubbles have been pinched
  if (e.target.classList.contains("popped")) {
  return;
  }
  // Get the coordinates of the bubble
  const x = parseInt(e.target.dataset.x);
  const y = parseInt(e.target.dataset.y);
  e.target.classList.add("popped");
  // Add to undo stack
  undoStack.push({ x, y });
  // Clear the redo stack
  redoStack.length = 0;
  // Randomly pinch bubble sound
  randomAudio();
  // Count -- increase
  countAdd();
  });
  });
  
  // cancel
  document.getElementById("undo").addEventListener("click", () => {
  // Check whether the undo stack is empty
  if (undoStack.length === 0) {
  return;
  }
  // Get the coordinates of the last bubble
  const { x, y } = undoStack.pop();
  // Get the bubble element
  const bubble = document.querySelector(
  `.bubble[data-x="${x}"][data-y="${y}"]`
  );
  // Remove the pinched class of the bubble element
  bubble.classList.remove("popped");
  // Add to the redo stack
  redoStack.push({ x, y });
  // Count -- decrease
  countSub();
  // Play the undo sound
  document.getElementById("undoAudio").play();
  });
  
  // redo
  document.getElementById("redo").addEventListener("click", () => {
  // Check whether the redo stack is empty
  if (redoStack.length === 0) {
  return;
  }
  // Get the last element
  const { x, y } = redoStack.pop();
  // Get the bubble
  const bubble = document.querySelector(
  `.bubble[data-x="${x}"][data-y="${y}"]`
  );
  // Mark the bubbles as pinched
  bubble.classList.add("popped");
  // Add to undo stack
  undoStack.push({ x, y });
  // Play the pinch bubble sound
  randomAudio();
  // Count -- increase
  countAdd();
  });
  
  // reset
  document.getElementById("reset").addEventListener("click", () => {
  document.querySelectorAll(".bubble").forEach((bubble) => {
  bubble.classList.remove("popped");
  });
  // Empty the undo stack
  undoStack.length = 0;
  // Clear the redo stack
  redoStack.length = 0;
  // Count -- reset
  countReset();
  });
  // Change the background color
  document.getElementById("ChangeBg").addEventListener("click", () => {
  // Check whether the background color has a black background
  if (document.getElementById('bubble-list').classList.contains("activeBg")) {
  // If so, remove it
  document.getElementById('bubble-list').classList.remove('activeBg')
  } else {
  // If not, add it
  document.getElementById('bubble-list').classList.add('activeBg')
  }
  });
  
  // Listen for window size changes
  window.addEventListener("resize", () => {
  window.location.reload();
  });