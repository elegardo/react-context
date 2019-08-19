export interface Cover {
    id: string;
    name: string;
    description: string;
    image: string;
    itemsAmount: number;
}

export interface Item {
    id: string;
    title: string;
    description: string;
    image: string;
    relateds: Related[]
}

export interface Related {
    id: string;
    name: string;
}

export interface Option {
    text: string;
    image: Image;
    key: number;
    value: number;
}

interface Image {
    src: string;
    avatar: string;
}

export type Main = {
    options: Option[];
    cover: Cover;
    items: Item[];
}