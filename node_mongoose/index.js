const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://172.17.0.2:27017/conFusion2';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected correctly to server ');

    Dishes.create({
        name: 'Arrox Frito',
        description: 'the best food'
    })
    .then((dish) => {
            console.log('New: ', dish)
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test' }
        }, {
            new: true
        }).exec();
    })
    .then((dish) => {
        console.log('Dishes: ', dish);
        dish.comments.push({
            rating: 5,
            comment: 'Im geeting a sinking feeling',
            author: 'Victor Espiritu'
        });
        
        return dish.save();
    })
    .then((dish) => {
            console.log('Dish to remove', dish);
            return Dishes.remove({});
    })
    .then(() => {
            return mongoose.connection.close();
    })
    .catch((err) => {
        console.log('ERROR:', err);
    });
});
