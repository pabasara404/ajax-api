const express=require('express');
var app = express();
var bodyParser=require('body-parser');

var products=[
    {id:1,
    name:'laptop'},
    {
        id:2,
    name:'microwave'
    }
];
var currentid=2;

var PORT=process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());


app.get('/products', function(req, res) {
    res.send({ products: products });
});

app.post('/products',function(req,res){
    var productName=req.body.name;
    currentid++;

    products.push({
        id:currentid,
        name:productName
    });

    res.send('Successfully created product!@#'+ req.body.name);
});

app.put('/products/:id',function(req,res){
var id=req.params.id;
var newName=req.body.newName;

var found=false;

products.forEach(function(product,index){
if(!found && product.id==Number(id)){
product.name=newName;
}
});

    res.send('successfully updated product!');

});

app.delete('/products/:id',function(req,res){
    var id=req.params.id;

    var found=false;
    
    products.forEach(function(product,index){
        if(!found && product.id===Number(id)){
            products.splice(index, 1);
        }
    });
    res.send('successfully deleted product!');
});

app.listen(PORT, function(){
    console.log('server listeing on '+PORT);
});