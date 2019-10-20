let inputText = "";
let sortItem = null;
let id = null;
let itemHTML = "";
let toDoList = [];

newArrItem = () => {
  sort =
    toDoList.length < 1
      ? 1
      : toDoList.reduce((a, b) => (a.sort > b.sort ? a : b)).sort + 1;

  id = Date.now();
  const itemObj = {
    id: id,
    text: inputText,
    sort: sort
  };
  toDoList.push(itemObj);
  // console.log(toDoList);
};

setItemHTML = () => {
  itemHTML = `<input
      class='inp-cbx'
      id='${id}'
      type='checkbox'
      style='display: none;'
      onclick="changeState(event)"
      />
      <label class='cbx' for='${id}'>
      <span>
      <svg width='12px' height='10px' viewbox='0 0 12 10'>
      <polyline points='1.5 6 4.5 9 10.5 1'></polyline>
      </svg>
      </span>
      </label>

      <p class="item-content">
      ${inputText}
      </p>
      <button class="item-delete" onclick="deleteElement(event)"></button>
      `;
};

getInput = () => {
  inputText = document.getElementById("to-do-input").value;
};
resetInput = () => {
  document.getElementById("to-do-input").value = "";
};

changeState = event => {
  const item = toDoList.find(el => el.id == event.path[0].id);
  const paragraph = document
    .getElementById(event.path[0].id)
    .parentElement.querySelector(".item-content");
  if (item.state === undefined || !item.state) {
    // console.log("non state");
    paragraph.classList.add("strike");
    item.state = true;
  } else {
    // console.log("si state");
    item.state = false;
    paragraph.classList.remove("strike");
  }
};

deleteElement = event => {
  // console.log(event);
  const IdDel = toDoList.findIndex(el => el.id == event.path[1].firstChild.id);
  if (IdDel > -1) {
    toDoList.splice(IdDel, 1);
    event.path[1].parentNode.removeChild(event.path[1]);
  } else {
    console.log("The item to delete was not found", IdDel);
  }
};

addItem = () => {
  getInput();
  if (inputText.length > 0) {
    newArrItem();
    setItemHTML();
    document.getElementById("item-container").appendChild;
    const newItem = document.createElement("section");
    newItem.className = "grid-item";
    newItem.innerHTML = itemHTML;
    const parentContainer = document.getElementById("item-container");
    parentContainer.insertBefore(newItem, parentContainer.childNodes[0]);
    // console.log("inserted item", insertedItem.firstChild);
    // insertedItem.firstChild.addEventListener("click", () => {
    //   event.preventDefault();
    //   console.log(event.path[1].htmlFor);
    //   console.log("Ciao click", event);
    // });
  }
  resetInput();
};

document.getElementById("add-item-button").addEventListener("click", () => {
  event.preventDefault();
  addItem();
  console.log("Text: " + inputText);
});
