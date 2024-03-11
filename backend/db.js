const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://amareshbiswal673:foodpanda@cluster0.cvkq0vz.mongodb.net/foodpandamern?retryWrites=true&w=majority&appName=Cluster0';
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, result) => {
        if (err) console.log("---", err);
        else {
            console.log("connected");
            const fetchedData = await mongoose.connection.db.collection("food_items");
            fetchedData.find({}).toArray(function(err,data){
                if(err) console.log(err);
                else{
                    // console.log(data);
                }
            })
        }
    });
}
module.exports = mongoDB;