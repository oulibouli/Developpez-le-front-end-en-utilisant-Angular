export interface DetailMappedData {
    name: string,
    series: {
        name: string,
        value: number
    }
}

export interface OlympicMappedData {
    name: string,
    value: number,
    extra: {id:number}
}
