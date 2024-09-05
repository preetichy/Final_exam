document.addEventListener("DOMContentLoaded", () => {
  // Array of colors for background change
  const colors = [
    "#F0E68C",
    "#FFDAB9",
    "#FFE4B5",
    "#D8BFD8",
    "#B0E0E6",
    "#AFEEEE",
    "#E0FFFF",
    "#98FB98",
    "#FFDEAD",
    "#F5DEB3",
  ];

  let index = 0;

  // Function to change background color with a gradient effect
  const changeBackgroundColor = () => {
    document.body.style.backgroundColor = colors[index];
    index = (index + 1) % colors.length; // Loop back to the start
  };

  // Change color every 2 seconds with a smooth transition
  setInterval(changeBackgroundColor, 2000);

  // Existing code for task management
  let enterButton = document.getElementById("enter");
  let input = document.getElementById("userInput");
  let ul = document.querySelector("ul");
  let item = document.getElementsByTagName("li");

  function inputLength() {
    return input.value.length;
  }

  function listLength() {
    return item.length;
  }

  function createListElement(task) {
    let li = document.createElement("li"); // creates an element "li"
    li.appendChild(document.createTextNode(task)); // makes text from input field the li text
    ul.appendChild(li); // adds li to ul
    input.value = ""; // Reset text input field

    // START STRIKETHROUGH
    function crossOut() {
      li.classList.toggle("done");
    }

    li.addEventListener("click", crossOut);
    // END STRIKETHROUGH

    // Function to check if a task is already in the list
    function isDuplicate(task) {
      for (let i = 0; i < item.length; i++) {
        if (item[i].textContent.replace("X", "").trim() === task) {
          return true;
        }
      }
      return false;
    }

    function addListAfterClick() {
      let task = input.value.trim();
      if (task.length > 0) {
        if (!isDuplicate(task)) {
          createListElement(task);
        } else {
          alert("Task already exists. Please enter a different task.");
        }
      }
    }

    function addListAfterKeypress(event) {
      let task = input.value.trim();
      if (task.length > 0 && event.which === 13) {
        // 13 is the Enter key's keycode
        if (!isDuplicate(task)) {
          createListElement(task);
        } else {
          alert("Task already exists. Please enter a different task.");
        }
      }
    }

    // START ADD DELETE BUTTON
    let dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"));
    dBtn.className = "delete";
    dBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevents click event from bubbling up to the list item
      ul.removeChild(li); // Removes the list item
    });
    li.appendChild(dBtn);
    // END DELETE BUTTON
  }

  function addListAfterClick() {
    if (inputLength() > 0) {
      // makes sure that an empty input field doesn't create a li
      createListElement(input.value.trim());
    }
  }

  function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) {
      // checks if Enter key is pressed
      createListElement(input.value.trim());
    }
  }

  enterButton.addEventListener("click", addListAfterClick);
  input.addEventListener("keypress", addListAfterKeypress);

  // New functionality: Ask User
  function askUser() {
    const tasks = new Set(); // Use a Set to prevent duplicate tasks

    while (true) {
      let userInput = prompt('Enter a new task (or type "exit" to stop):');
      if (userInput === null || userInput.toLowerCase() === "exit") {
        break;
      } else {
        userInput = userInput.trim();
        if (userInput.length === 0) {
          continue; // Skip empty inputs
        }
        if (tasks.has(userInput)) {
          alert("This task already exists. Please enter a new task.");
        } else {
          tasks.add(userInput);
          createListElement(userInput);
        }
      }
    }
  }

  document.getElementById("askUser").addEventListener("click", askUser);
});
