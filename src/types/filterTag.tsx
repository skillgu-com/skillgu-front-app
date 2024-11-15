import {Option, SortOption} from "@customTypes/option";

export type FilterTag = {
    name: FilterName;
    displayValue: string;
};

export type FilterName =
    | "priceMin"
    | "priceMax"
    | "categories"
    | "skills"
    | "services"
    | "phrase"
    | "sort"
    | "topics";


export type FiltersOptions = {
    priceMin: number;
    priceMax: number;
    categories: Option[];
    skills: Option[];
    services: Option[];
    topics: Option[];
};

export type FiltersSelected = {
    priceMin: number;
    priceMax: number;
    categories: Option[];
    skills: Option[];
    services: Option[];
    topics: Option[];
    phrase: string;
    sort: SortOption;
};

