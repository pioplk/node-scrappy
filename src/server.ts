import express from "express";
import path from "path";
import runner from "./runner";
import auth from "./auth";
import {State} from "./core/State";
import helpers from "./handlebars-helpers";
const expressHandlebars  = require('express-handlebars');
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000;

app.engine("handlebars", expressHandlebars({
    helpers: helpers
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../public')));

app.get('/ping', (req: Request, res: any) => res.render('ping'));

app.use(auth)
app.get('/', (req: Request, res: any) => res.render('home', {info: runner.getInfo()}));

app.post('/task', (req: Request, res: any) => {
    const {index, state} = req.body as any;

    if(!state){
        runner.setTaskState(State.STOPPED, index);
    }else {
        runner.setTaskState(State.RUNNING, index);
    }
    res.send(JSON.stringify({success: true}));
});

app.post('/reporter', (req: Request, res: any) => {
    const {index, state} = req.body as any;

    if(!state){
        runner.setReporterState(State.STOPPED, index);
    }else {
        runner.setReporterState(State.RUNNING, index);
    }
    res.send(JSON.stringify({success: true}));
});

app.post('/runner', (req: Request, res: any) => {
    const {index, state} = req.body as any;

    if(!state){
        runner.setState(State.STOPPED);
    }else {
        runner.setState(State.RUNNING);
    }
    res.send(JSON.stringify({success: true}));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

runner.init();