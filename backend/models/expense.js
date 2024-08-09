const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema(
  {
    description: {type: String, trim: true, required: true},
    amount: {type: Number, trim: true, required: true},
    catagory: {type: String, trim: true, required: true},
    date: {type: Date, trim: true, required: true},
    ownerId: {type: String, trim: true}
  },
  { timestamps: true }
  );


module.exports = mongoose.model('Expense', expenseSchema);
