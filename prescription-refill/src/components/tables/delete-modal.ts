export function createDeletePopup(onConfirm: () => void): HTMLDivElement {
  const overlay = document.createElement("div");
  overlay.className = "popup-overlay";
  overlay.style.display = "flex";

  const box = document.createElement("div");
  box.className = "popup-box";

  const title = document.createElement("h2");
  title.textContent = "Confirm Delete";

  const msg = document.createElement("p");
  msg.textContent = "Are you sure you want to delete this record?";

  const okBtn = document.createElement("button");
  okBtn.textContent = "OK";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";

  okBtn.addEventListener("click", () => {
    onConfirm();
    overlay.remove();
  });

  cancelBtn.addEventListener("click", () => {
    overlay.remove();
  });

  box.append(title, msg, okBtn, cancelBtn);
  overlay.appendChild(box);

  return overlay;
}