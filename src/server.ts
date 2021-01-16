import express from "express";
import path from "path";
import runner from "./runner";

const expressHandlebars  = require('express-handlebars');



const app = express()
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.engine("handlebars", expressHandlebars());
app.set('view engine', 'handlebars');
runner.init();

app.get('/', (req, res, next) => {
    res.render('home', {info: runner.getInfo()});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
