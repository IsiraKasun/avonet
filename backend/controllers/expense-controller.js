const Expense = require('../models/expense');
const moment = require('moment');

exports.getAll = async (req, res) => {
    try {
        let ownerId = req.user.userId;
        let startDate = req.query.sd;
        let endDate = req.query.ed;
        let cat = req.query.cat;
        let expenses = [];

        if (cat === 'all') {
            expenses = await Expense.find({ownerId: ownerId, date: {$gte: startDate, $lte: endDate}}).exec();
        } else {
            expenses = await Expense.find({ownerId: ownerId, catagory: cat, date: {$gte: startDate, $lte: endDate}}).exec();
        }

        if (expenses) {
            res.status(200).json({sts: 1, expenses: expenses});
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
    }
    
}

exports.create = async (req, res) => {
    try {

        let expense = new Expense({
            ownerId: req.user.userId,
            catagory: req.body.cat,
            date: moment().format('YYYY-MM-DD'),
            description: req.body.desc,
            amount: req.body.amount
        });

        let savedDoc = await expense.save();
    
        if (savedDoc) {
            res.status(200).json({sts: 1, expense: savedDoc});
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
    }
    
}

exports.update = async (req, res) => {
    try {
        let expenseId = req.params.id;
        
        if (expenseId) {
            let expense = await Expense.findById(expenseId);

            if (expense) {
                expense.ownerId = req.user.userId,
                expense.catagory = req.body.cat,
                expense.date = moment().format('YYYY-MM-DD'),
                expense.description = req.body.desc,
                expense.amount = req.body.amount
            }

            let updatedDoc = await Expense.findByIdAndUpdate({_id: expenseId}, expense);
        
            if (updatedDoc) {
                res.status(200).json({sts: 1});
            } 
        } else {
            res.status(400).json({sts: -1, error: 'Invalid Request'})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
    }
    
}

exports.delete = async (req, res) => {
    try {
        let expenseId = req.params.id;
        
        if (expenseId) {
            let expense = await Expense.findById(expenseId);
            let deletedExpense = await expense.deleteOne();

            if (deletedExpense.deletedCount > 1) {
                res.status(200).json({sts: 1});
            } 
        } else {
            res.status(400).json({sts: -1, error: 'Invalid Request'})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
    }
    
}