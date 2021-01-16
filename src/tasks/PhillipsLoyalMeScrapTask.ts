import cheerio from 'cheerio'
import axios from "axios";
import {Runnable, RunResult} from "../core/Runnable";
import {CreateNotificationBody} from "onesignal-node/lib/types";
import {Base} from "../core/Base";
import {State} from "../core/State";

export class PhilipsLoyalMeScrapTask extends Base implements Runnable{
    readonly NAME = "PHILLIPS_LOYAL_ME";

    protected readonly URL = "https://www.philips.pl/sklep/PL_Loyalmenow";
    protected readonly HUNT_FOR_MODELS = ["EP2220/10", "EP3241/50", "EP2231/40", "EP3246/70", "EP3243/50"];
    protected previousData: string[] = []

    constructor() {
        super();
        this.setState(State.RUNNING);
        this.getAvailableModels().then(models => this.previousData = models);
    }

    public async run(): Promise<RunResult>{
        let models = await this.getAvailableModels();

        return this.createRunResult(models);
    }

    private async getAvailableModels(): Promise<string[]>{
        let selector = cheerio.load((await axios.get(this.URL)).data),
            results: string[] = [];

        selector("body").find("div[class=phi-Noopaque]").each((i, el) => {
            const model = selector(el).parent().parent().find("div[class=phi-product-code]").text();
            results.push(model);
        });

        return results;
    }

    private createRunResult(models: string[]): RunResult{
        const huntedModels = this.HUNT_FOR_MODELS.filter(
            model => models.includes(model) && !this.previousData.includes(model));

        this.previousData = models;

        return {
            name: this.NAME,
            notification: this.createNotification(huntedModels),
            data: {
                models: huntedModels,
            }
        }
    }

    private createNotification(models: string[]): CreateNotificationBody | null{
        return models.length ? {
            headings: {en: "New Philips models available!"},
            subtitle: {en: models.toString()},
            contents: {en: models.concat('\n')},
            url: this.URL,
            included_segments: ['Subscribed Users']
        } : null;
    }
}