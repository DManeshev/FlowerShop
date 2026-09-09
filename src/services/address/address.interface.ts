export interface SearchAddressParams {
    text: string;
    ll: string;
    results: string;
}

export interface SearchAddressTitle {
    text: string;
}

export interface SearchAddressDistance extends SearchAddressTitle {
    value: number;
}

export interface TestAddressComponent {
    name: string;
    kind: Array<string>
}

export interface TestAddress { // rename
    formatted_address: string;
    component: Array<TestAddressComponent>
}

export interface SearchAddress {
    title: SearchAddressTitle;
    subtitle: SearchAddressTitle;
    tags: Array<string>;
    distance: SearchAddressDistance,
    address: Array<TestAddress>;
    uri: string;
}

export interface SearchAddressResponse {
    results: Array<SearchAddress>;
}