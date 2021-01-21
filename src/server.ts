import express from "express";
import path from "path";
import runner from "./runner";
import auth from "./auth";
import {State} from "./core/State";
import helpers from "./handlebars-helpers";

const expressHandlebars = require('express-handlebars');
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

    if (!state) {
        runner.getTask(index).setState(State.STOPPED);
    } else {
        runner.getTask(index).setState(State.RUNNING);
    }
    res.send(JSON.stringify({success: true}));
});

app.post('/reporter', (req: Request, res: any) => {
    const {index, state} = req.body as any;

    if (!state) {
        runner.getReporter(index).setState(State.STOPPED);
    } else {
        runner.getReporter(index).setState(State.RUNNING);
    }
    res.send(JSON.stringify({success: true}));
});

app.post('/runner', (req: Request, res: any) => {
    const {index, state} = req.body as any;

    if (!state) {
        runner.setState(State.STOPPED);
    } else {
        runner.setState(State.RUNNING);
    }
    res.send(JSON.stringify({success: true}));
});

app.get('/runner/logs', (req: any, res: any) => res.render('logs', {
    logs: runner.logger.getLogs(req.query.type),
    name: runner.NAME
}));

app.post('/runner/logs', (req: any, res: any) => res.render('logs', {
    logs: runner.logger.clearLogs(req.query.type),
    name: runner.NAME
}));

app.get('/task/logs/:index', (req: any, res: any) => res.render('logs', {
    logs: runner.getTask(req.params.index).logger.getLogs(req.query.type),
    name: runner.getTask(req.params.index).NAME
}));

app.post('/task/logs/:index', (req: any, res: any) => {
    runner.getTask(req.params.index).logger.clearLogs(req.query.type);
    res.send(JSON.stringify({success: true}));
});

app.get('/reporter/logs/:index', (req: any, res: any) => {
    res.render('logs', {
        logs: runner.getReporter(req.params.index).logger.getLogs(req.query.type),
        name: runner.getReporter(req.params.index).NAME
    })
});

app.post('/reporter/logs/:index', (req: any, res: any) => {
    runner.getReporter(req.params.index).logger.clearLogs(req.query.type);
    res.send(JSON.stringify({success: true}));
});





app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

runner.init();