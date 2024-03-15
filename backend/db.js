const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://amareshbiswal673:foodpanda@cluster0.cvkq0vz.mongodb.net/foodpandamern?retryWrites=true&w=majority&appName=Cluster0';
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, result) => {
        if (err) console.log("---", err);
        else {
            console.log("connected");
            const fetchedData = await mongoose.connection.db.collection("food_items");
            fetchedData.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })

            })
        }
    });
}
module.exports = mongoDB;