const amount = document.querySelector("#expense_input");
const desc = document.getElementById("description_input");
const cat = document.getElementById("category_input");
const btn = document.getElementById("btn");
const ul = document.querySelector(".lists");

//Add expense value to an object
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const obj = { amount: amount.value, description: desc.value,category: cat.value, };
 if(!desc.title){
    axios.post("http://localhost:3000/expense", obj)
    .then((data) => {
      const expense = data.data.result;
      const li = document.createElement("li");li.className = "li";
      li.appendChild( document.createTextNode( expense.amount + " " + expense.description + " " + expense.category ));
      const del = document.createElement("button");const edit = document.createElement("button");
      del.className = "btn btn-danger del";edit.className = "btn btn-outline-secondary edit";
      del.appendChild(document.createTextNode("Delete")); edit.appendChild(document.createTextNode("Edit"));li.appendChild(del); li.appendChild(edit); ul.appendChild(li);
      window.location.reload();
    })
    .catch((err) => console.log(err));
 }else{
    axios.put("http://localhost:3000/"+desc.title,obj)
    .then((data) => {
      const expense = data.data.result;
        const li = document.createElement("li");li.className = "li";
        li.appendChild( document.createTextNode(expense.amount + " " +expense.description + " " + expense.category));
        const del = document.createElement("button");const edit = document.createElement("button");
        del.className = "btn btn-danger del";edit.className = "btn btn-outline-secondary  edit";
        del.appendChild(document.createTextNode("Delete"));edit.appendChild(document.createTextNode("Edit"));
        li.appendChild(del); li.appendChild(edit); ul.appendChild(li); 
      })
      .catch((err) => console.log(err));
 }
});

//fetch expense
axios.get("http://localhost:3000")
  .then((data) => {
    const expenses = data.data.expenses;
    console.log("");
    for (let i = 0; i < expenses.length; i++) {
      const li = document.createElement("li");li.className = "li";
      li.setAttribute("id", expenses[i].id);
      li.appendChild(document.createTextNode(expenses[i].amount + " " + expenses[i].description +" "+expenses[i].category));
      const del = document.createElement("button"); const edit = document.createElement("button");
      del.className = "btn btn-danger del"; edit.className = "btn btn-outline-secondary edit";
      del.appendChild(document.createTextNode("Delete"));edit.appendChild(document.createTextNode("Edit")); li.appendChild(del); li.appendChild(edit); ul.appendChild(li);
    }
  })
  .catch((err) => console.log(err));

//remove expense
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    axios
      .delete("http://localhost:3000/" + e.target.parentElement.id)
      .then((res) => {ul.removeChild(e.target.parentElement);})
      .catch((err) => console.log(err));
  }});
//edit expense
ul.addEventListener("click", editEvent);
function editEvent(e) {
  if (e.target.classList.contains("edit")) {
    axios
      .get("http://localhost:3000/" + e.target.parentElement.id)
      .then((data) => {
        const expense =data.data.expense;
        ul.removeChild(e.target.parentElement);
        amount.value = expense.amount;
        desc.value = expense.description;
        desc.title = expense.id;
        cat.value = expense.category;
      })
      .catch((err) => console.log(err));}}
