let express = require('express');
let app = express();
app.use(express.static('public'));

app.set('view engine', 'pug');

let mysql = require('mysql');

let con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'lite_shop'
});

app.listen(3000, function(){
    console.log('node 3000');
});

app.get('/', function(req, res){
    con.query(
        'SELECT * FROM goods',
        function(error, result){
            if (error) throw err;
            let goods = {};
            for(let i = 0; i < result.length; i++){
                goods[result[i]['id']] = result[i];
            }
        console.log(goods);
          res.render('main', {
        foo: 'helloo',
        bar: 7,
        goods :  JSON.parse(JSON.stringify(goods))
    }); 
   }
 );
});
