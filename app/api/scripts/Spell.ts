export default class Spell {
    name: string;
    interval_time: number;
    duration: number;
    range: number;
    details: string;

    constructor(name: string, interval_time: number, duration: number, range: number, details: string) {
        this.name = name;
        this.interval_time = interval_time;
        this.duration = duration;
        this.range = range;
        this.details = details;
    }
}