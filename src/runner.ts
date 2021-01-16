import {Runner} from "./core/Runner";
import {LogReporter} from "./reporters/LogReporter";
import {PhilipsLoyalMeScrapTask} from "./tasks/PhillipsLoyalMeScrapTask";
import {OneSignalReporter} from "./reporters/OneSignalReporter";

const runner = new Runner();
const task = new PhilipsLoyalMeScrapTask();
const logReporter = new LogReporter();
const oneSignalReporter = new OneSignalReporter();

runner.addTask(task);
runner.addReporter(logReporter);
runner.addReporter(oneSignalReporter);

export default runner;