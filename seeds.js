const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/farm', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Mongo Connected");
});
const Product=require('./models/product');



//const p=new Product({
  //  name:'Grapefruit',
    //price: 1.99,
    //category: 'fruit'
//})
//p.save().then(p => {
  //  console.log(p);
// })
// .catch(e =>{
  //  console.log(e);
 //})
const seedProducts=[
    {
        name: 'Eggplant',
        price: 1.00,
        category: 'vegetable',
        image: 'https://image.shutterstock.com/image-photo/eggplant-isolated-on-white-clipping-600w-1075434959.jpg'
    },
    {
        name: 'Melon',
        price: 4.99,
        category: 'fruit',
        image: 'https://image.shutterstock.com/image-photo/whole-sliced-japanese-melonshoney-melon-260nw-1376235665.jpg'
    },
    {
        name: 'Seedless Watermelon',
        price: 3.99,
        category: 'fruit',
        image: 'https://all-americaselections.org/wp-content/uploads/2019/06/Watermelon_mambo_Logo-768x768.png'
    },
    {
        name: 'Celery',
        price: 1.50,
        category: 'vegetable',
        image: 'https://image.shutterstock.com/image-photo/celery-isolated-on-white-background-260nw-259956566.jpg'
    },
    {
        name: 'Whole Milk',
        price: 2.69,
        category: 'dairy',
        image: 'https://image.shutterstock.com/image-photo/milk-glass-bottle-isolated-on-260nw-1715836045.jpg'
    }
];
 Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e);
})


