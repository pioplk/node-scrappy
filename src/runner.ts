import {Runner} from "./core/Runner";
import {LogReporter} from "./reporters/LogReporter";
import {PhilipsLoyalMeScrapTask} from "./tasks/PhillipsLoyalMeScrapTask";

const runner = new Runner();
const task = new PhilipsLoyalMeScrapTask();
const logReporter = new LogReporter();

runner.addTask(task);
runner.addReporter(logReporter);

export default runner;