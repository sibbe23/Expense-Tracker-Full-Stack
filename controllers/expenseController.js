const Expense = require("../models/expenseModel");

exports.addExpense = (req, res, next) => {
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  console.log("category",category);
  Expense.create({
    amount,
    description,
    category
  })
    .then((result) => {
      console.log("Created Product");
       return res.send(JSON.stringify({result}));
    })
    .catch((err) => console.log(err));
};
exports.getAllExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => {
    return res.send(JSON.stringify({expenses}));
      })
    .catch((err) => console.log(err));
};

exports.deleteExpense = (req, res, next) => {
  const id = req.params.id;
  Expense.findByPk(id)
    .then((expense) => {
      return expense.destroy();
    }).then(result=>{
      console.log("Deleted")
      return res.send(JSON.stringify({result}));
    })
    .catch((err) => console.log(err));
};
exports.getEditExpense = (req, res, next) => {
  const id = req.params.id;
  Expense.findByPk(id)
  .then(expense=>{
    return res.send(JSON.stringify({expense}));
  }).catch(err=>console.log(err));

};
exports.updateExpense = (req, res, next) => {
  const id = req.params.id;
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  Expense.findByPk(id)
  .then(expense=>{
    expense.amount=amount;
    expense.description=description;
    expense.category=category;
    return expense.save();
  })
  .then(result=>{
    console.log("Updated");
    return res.send(JSON.stringify({result}));
    
  })
  .catch(err=>console.log(err));
};
