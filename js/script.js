document.addEventListener("DOMContentLoaded", function () {
  const submitData = document.getElementById("form");

  submitData.addEventListener("submit", function (event) {
    // script manual
    // const inputTitle = document.getElementById("title").value;
    // const inputDate = document.getElementById("date").value;
    // console.log(`hasil input: ${inputTitle}, ${inputDate}`);

    event.preventDefault();

    // didapat dari function
    AddTodo();
  });

  function AddTodo() {
    const inputTitle = document.getElementById("title").value;
    const inputDate = document.getElementById("date").value;

    const generateID = generateId();
    const todoObj = generateTodoObj(generateID, inputTitle, inputDate, false);
    todos.push(todoObj);

    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function generateId() {
    return +new Date();
  }

  function generateTodoObj(id, task, timestamp, isDone) {
    return {
      id,
      task,
      timestamp,
      isDone,
    };
  }

  const todos = [];
  const RENDER_EVENT = "render-todo";

  document.addEventListener(RENDER_EVENT, function () {
    console.log(todos);
  });

  //   GET DATA FROM TODO OBJ

  function makeTodo(todoObject) {
    const textTitle = document.createElement("h2");
    textTitle.innerText = todoObject.task;

    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = todoObject.timestamp;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");
    container.append(textContainer);
    container.setAttribute("id", `todo-${todoObject.id}`);

    if (todoObject.isCompleted) {
      const undoButton = document.createElement("button");
      undoButton.classList.add("undo-button");
      undoButton.innerText = "";

      undoButton.addEventListener("click", function () {
        undoTaskFromCompleted(todoObject.id);
      });

      const trashButton = document.createElement("button");
      trashButton.classList.add("trash-button");
      trashButton.innerText = "";

      trashButton.addEventListener("click", function () {
        removeTaskFromCompleted(todoObject.id);
      });

      container.append(undoButton, trashButton);
    } else {
      const checkButton = document.createElement("button");
      checkButton.classList.add("check-button");
      checkButton.innerText = "";

      checkButton.addEventListener("click", function () {
        addTaskToCompleted(todoObject.id);
      });

      container.append(checkButton);
    }

    return container;
  }

  document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById("todos");
    uncompletedTODOList.innerHTML = "";

    for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      if (!todoItem.isCompleted) {
        uncompletedTODOList.append(todoElement);
      }
    }
  });

  function addTaskToCompleted(todoId) {
    const todoTarget = findTodo(todoId);
    if (todoTarget == null) return;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);
    if (todoTarget == null) return;

    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function removeTaskFromCompleted(todoId) {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) return;

    todos.splice(todoIndex, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function findTodo(todoId) {
    return todos.find((todoItem) => todoItem.id === todoId) || null;
  }

  document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById("todos");
    uncompletedTODOList.innerHTML = "";

    const completedTODOList = document.getElementById("completed-todos");
    completedTODOList.innerHTML = "";

    for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      if (!todoItem.isCompleted) {
        uncompletedTODOList.append(todoElement);
      } else {
        completedTODOList.append(todoElement);
      }
    }
  });
});
