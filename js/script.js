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
});
