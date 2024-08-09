const mongoose = require('mongoose');
const { Schema } = mongoose;

const catagorySchema = new Schema(
  {
    name: {type: String, trim: true, required: true},
    ownerId: {type: String, trim: true}
  },
  { timestamps: true }
  );


module.exports = mongoose.model('Catagory', catagorySchema);
