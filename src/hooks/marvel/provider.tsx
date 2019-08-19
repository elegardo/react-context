import React, { useState, useEffect } from 'react'
import { ValueContext, AppContext } from '../context'
import { Cover, Item } from '../Interfaces'
import { GETApi } from './callApi'
import options from './options.json'

const initialCover:Cover = {id: '', name: '', description: '', image: '', itemsAmount: 0}

const MarvelProvider = props => {

    //states
    const [id, setId] = useState<string>()
    const [cover, setCover] = useState<Cover>(initialCover)
    const [items, setItems] = useState<Item[]>([ ])

    //functions
    const getCharacterToCover = (characterId: string):Promise<Cover> => {
        return GETApi().get(`/characters/${characterId}`)
                    .then(res => res.data.data.results[0])
                    .catch((err) => console.log(err))
                    .then((res) => {
                        return {
                            id: res.id, 
                            name: res.name, 
                            description: res.description,
                            image: res.thumbnail.path + '.' + res.thumbnail.extension,
                            itemsAmount: res.comics.available
                        }
                    })
    }

    const getComicsToItems = (characterId: string):Promise<Item[]>  => {
        return GETApi().get(`/characters/${characterId}/comics`)
                    .then(res => res.data.data)
                    .catch((err) => console.log(err))
                    .then((res) => {
                        return res.results.map((item) => {
                            return {
                                    title: item.title,
                                    description: item.description,
                                    image: item.thumbnail.path + '.' + item.thumbnail.extension,
                                    relateds: parserCharacters(item.characters.items)
                            }
                        })
                    })
    }

    const parserId = (resourceURI: string):string => {
        let pathname = new URL(resourceURI).pathname;
        return pathname.split('/')[4];
    }

    const parserCharacters = (items):[] => {
        return items.map((item) => {
            return {
                id: parserId(item.resourceURI),
                name: item.name,
            }
        })
    }

    useEffect(() => {
        if(id){
            setCover(initialCover)
            getCharacterToCover(id)
            .then((res) => {
                setCover(res)
            })
            .catch((err) => console.log(err));
        }
    }, [id])

    useEffect(() => {
        if(id){
            setItems([ ])
            getComicsToItems(id)
            .then((res) => {
                setItems(res)
            })
        }
    }, [id])

    const marvelValues:ValueContext = {
        options,
        cover,
        items,
        setId
    };

    return (
        <AppContext.Provider value={marvelValues}>
            {props.children}
        </AppContext.Provider>
      );
}

export { MarvelProvider };