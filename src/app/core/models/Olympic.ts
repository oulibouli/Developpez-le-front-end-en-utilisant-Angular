import { Participation } from "./Participation";

export interface OlympicCountry {

    // constructor(
    //     public id: number,
    //     public country: string,
    //     public participations: Participation[]
    // ) {}
    id: number,
    country: string,
    participations: Participation[]
}