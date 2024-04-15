export type FilterName =
    | "priceMin"
    | "priceMax"
    | "categories"
    | "skills"
    | "services"
    | "phrase"
    | "sort"
    | "topics"

export type SortOption = 'rateASC' | 'rateDESC' | 'priceASC' | 'priceDESC'

export type Option = {
    value: string;
    label: string;
};

export type Terms = {
    categories: Option[]
    skills: Option[]
    services: Option[]
    topics: Option[]
}

export type FiltersOptions = {
    priceMin: number
    priceMax: number
    categories: Option[]
    skills: Option[]
    services: Option[]
    topics: Option[]

}

export type FiltersSelected = {
    priceMin: number
    priceMax: number
    categories: Option[]
    skills: Option[]
    services: Option[]
    topics: Option[]
    phrase: string
    sort: SortOption
}

export type Mentor = {
    id: string
    avatar_url: string
    name: string
    profession: string
    special: string
    reviewsAvgRate: number
    reviewsCount: number
    description: string
    tags: string[]
    title: string;
    price: number
}

export type FilterTag = {
    name: FilterName
    displayValue: string
}
