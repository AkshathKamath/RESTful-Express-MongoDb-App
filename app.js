const express=require("express");
const app=express();
const path=require('path');
const methodOverride=require('method-override');
const mongoose=require("mongoose");
const Product=require('./models/product');

mongoose.connect('mongodb://localhost:27017/farm', {useNewUrlParser: true, useUnifiedTopology: true})
.then( () =>{
    console.log("Mongo connection Open");
})
.catch(err =>{
    console.log(err);
    console.log('Error');
})

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const categories=['fruit','vegetable','dairy'];

app.get('/products',async (req,res) =>{//Access all products from database
    const {category}=req.query;
    if(category){
        const products=await Product.find({category: category });
        res.render('products/index.ejs',{ products,category });
    }
    else{
        const products=await Product.find({});
        res.render('products/index.ejs',{ products,category:'All' });
    }
    
})

app.get('/products/:id',async (req,res) =>{//Access a specific product with its id from database
    const {id}=req.params;
    const product= await Product.findById(id)
    .catch(e => {
        console.log(e);    })
    res.render('products/show.ejs',{ product });
})

app.get('/new',(req,res) => {//Adding a new product to database
    res.render('products/add.ejs',{ categories });
})
app.post('/products',async (req,res) => {
    const newProduct=new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);//Acces new product with its id
})

app.get('/products/:id/edit', async (req,res) => {//Update a product
    const {id}=req.params;
    const product= await Product.findById(id);
    res.render('products/edit.ejs',{ product, categories });
})
app.put('/products/:id', async (req,res) =>{
    const {id}=req.params;
    const product= await Product.findByIdAndUpdate(id,req.body,{runValidators: true,new: true}); 
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req,res) => {
    const {id}=req.params;
    const deleteProduct=await Product.findByIdAndDelete(id);
    res.redirect('/products');
})


app.listen(80,()=>{
    console.log("App started");
})