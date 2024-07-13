// This file defines all the interfaces used in the application
export interface OlympicCountry {
    id: number,
    country: string,
    participations: Participation[]
}
export interface Participation {
    id: number,
    year: number,
    city: string,
    medalsCount: number,
    athleteCount: number
}
export interface DetailMappedData {
    name: string,
    series: {
        name: string,
        value: number
    }[]
}
export interface OlympicMappedData {
    name: string,
    value: number,
    extra: {id:number}
}
