function onPageLoaded() {
  const input = document.querySelector("input[type='text']");
  const ul = document.querySelector("ul.taskslist");
  const addButton = document.querySelector(".addButton");
  let taskList = [];

  function createTodo() {
    const li = document.createElement("li");
    const textSpan = document.createElement("span");
    textSpan.classList.add("task-text");
    const newTodo = input.value;
    textSpan.append(newTodo);

    const deleteBtn = document.createElement("div");
    deleteBtn.classList.add("delete-task");

    ul.appendChild(li).append(textSpan);
    ul.appendChild(li).append(deleteBtn);
    input.value = "";
    listenDeleteTodo(deleteBtn);

    taskList.push(li);
  }

  function listenDeleteTodo(element) {
    element.addEventListener("click", (event) => {
      element.parentElement.remove();
      event.stopPropagation();
    });
  }

  input.addEventListener("keypress", (keyPressed) => {
    const keyEnter = 13;
    if (input.value.trim() === "") return;
    if (keyPressed.which == keyEnter) {
      createTodo();
    }
  });

  addButton.addEventListener("click", () => {
    if (input.value.trim() === "") return;
    createTodo();
  });

  function onClickTodo(event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");
    }
  }

  const saveButton = document.querySelector(".logo");
  const clearButton = document.querySelector(".delete-all");

  saveButton.addEventListener("click", () => {
    localStorage.setItem("taskslist", ul.innerHTML);
  });
  clearButton.addEventListener("click", () => {
    ul.innerHTML = "";
    taskList = [];
    localStorage.removeItem("taskslist", ul.innerHTML);
  });

  function loadTodos() {
    const data = localStorage.getItem("taskslist");
    if (data) {
      ul.innerHTML = data;
    }
    const deleteButtons = document.querySelectorAll(".delete-task");
    for (const button of deleteButtons) {
      listenDeleteTodo(button);
    }
  }

  loadTodos();
  ul.addEventListener("click", onClickTodo);

  let allBtn = document.querySelector(".all");
  let completedBtn = document.querySelector(".completed");

  allBtn.addEventListener("click", function () {
    let sortedNorm = [...taskList].filter((item) => {
      if (!item.classList.contains("checked")) return item;
    });
    let sorted = [...taskList].filter((item) => {
      if (item.classList.contains("checked")) return item;
    });
    ul.innerHTML = "";
    for (let li of sorted) {
      ul.append(li);
    }
    for (let li of sortedNorm) {
      ul.prepend(li);
    }
  });

  completedBtn.addEventListener("click", function () {
    let sorted = [...taskList].filter((item) => {
      if (item.classList.contains("checked")) return item;
    });
    ul.innerHTML = "";
    for (let li of sorted) {
      ul.appendChild(li);
    }
  });
}

document.addEventListener("DOMContentLoaded", onPageLoaded);
