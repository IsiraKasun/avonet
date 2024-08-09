const Catagory = require('../models/catagory');

exports.getAll = async (req, res) => {
    try {
        let ownerId = req.user.userId;
        console.log(ownerId);
        let catagories = await Catagory.find({ownerId: ownerId}).exec();
    
        if (catagories) {
            res.status(200).json({sts: 1, catagories: catagories});
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
    }
    
}

exports.create = async (req, res) => {
    try {

        let catagory = new Catagory({
            ownerId: req.user.userId,
            name: req.body.name
        });

        let savedDoc = await catagory.save();
    
        if (savedDoc) {
            res.status(200).json({sts: 1, catagory: savedDoc});
        } 
    } catch (error) {
        console.log(error);
        res.status(500).json({sts: -1, error: 'Internal Server Error'})
    }
    
}

exports.update = async (req, res) => {
    try {
        let catagoryId = req.params.id;
        
        if (catagoryId) {
            let catagory = await Catagory.findById(catagoryId);

            if (catagory) {
                expense.name = req.body.name
            }

            let updatedDoc = await Expense.findByIdAndUpdate({_id: catagoryId}, catagory);
        
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
        let catagoryId = req.params.id;
        
        if (catagoryId) {
            let catagory = await Catagory.findById(catagoryId);
            let deletedCatagory = await catagory.deleteOne();

            if (deletedCatagory.deletedCount > 1) {
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