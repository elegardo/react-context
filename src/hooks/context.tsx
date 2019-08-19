import React, { createContext } from 'react';
import { Cover, Item  } from './Interfaces'

export interface ValueContext {
    options: any[];
    cover: Cover;
    items: Item[];
    setId(id: string): void
}

const AppContext = createContext<ValueContext | undefined>(undefined);

export { AppContext };