const dropZone = document.getElementById("div1");

document.querySelectorAll("img").forEach((img) => {
  img.draggable = true;
  img.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("elementId", e.target.id || e.target.src);
    e.target.dataset.moving = "true";
  });
});

dropZone.addEventListener("dragover", (event) => event.preventDefault());

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();

  const draggedElement = [...document.querySelectorAll("img")].find(
    (img) => img.src === event.dataTransfer.getData("elementId"),
  );

  if (draggedElement && draggedElement.dataset.moving === "true") {
    draggedElement.draggable = false;
    dropZone.appendChild(draggedElement);
    delete draggedElement.dataset.moving;
  }
});
