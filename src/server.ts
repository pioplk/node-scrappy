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
        runner.setTaskState(State.STOPPED, index);
    } else {
        runner.setTaskState(State.RUNNING, index);
    }
    res.send(JSON.stringify({success: true}));
});

app.post('/reporter', (req: Request, res: any) => {
    const {index, state} = req.body as any;

    if (!state) {
        runner.setReporterState(State.STOPPED, index);
    } else {
        runner.setReporterState(State.RUNNING, index);
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

app.get('/runner/logs', (req: Request, res: any) => res.render('logs', {
    logs: runner.logger.getLogs(),
    name: runner.NAME
}));
app.get('/task/logs/:index', (req: any, res: any) => res.render('logs', {
    logs: runner.getTaskLogs(req.params.index),
    name: runner.getTaskName(req.params.index)
}));
app.get('/reporter/logs/:index', (req: any, res: any) => res.render('logs', {
    logs: runner.getReporterLogs(req.params.index),
    name: runner.getReporterName(req.params.index)
}));

app.post('/reporter/logs/:index', (req: any, res: any) => {
    runner.clearReporterLogs(req.params.index);
    res.send(JSON.stringify({success: true}));
});

app.post('/task/logs/:index', (req: any, res: any) => {
    runner.clearTaskLogs(req.params.index);
    res.send(JSON.stringify({success: true}));
});

app.post('/runner/logs', (req: any, res: any) => {
    runner.logger.clearLogs();
    res.send(JSON.stringify({success: true}));
});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

runner.init();