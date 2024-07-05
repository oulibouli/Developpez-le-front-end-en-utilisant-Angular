import { Participation } from "./Participation";

export class OlympicCountry {

    constructor(
        public id: number,
        public country: string,
        public participations: Participation[]
    ) {}
}