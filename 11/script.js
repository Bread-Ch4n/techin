document
  .getElementById("OBJECTS")
  .addEventListener("click", (event) =>
    event.target.parentElement &&
    event.target.parentElement.firstElementChild === event.target
      ? event.target.classList.contains("cls-3")
        ? event.target.classList.replace("cls-3", "cls-1")
        : event.target.classList.contains("cls-1")
          ? event.target.classList.replace("cls-1", "cls-3")
          : null
      : null,
  );
