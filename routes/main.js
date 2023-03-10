const express = require('express');

const expenseController = require('../controllers/expenseController');

const router = express.Router();

// appointments => GET
router.get('/', expenseController.getAllExpenses);
router.get('/:id', expenseController.getEditExpense);

// appointments => POST
router.post('/expense', expenseController.addExpense);


//// appointments => PUT
router.put('/:id', expenseController.updateExpense);

// appointments => DELETE
router.delete('/:id', expenseController.deleteExpense);


module.exports = router;
