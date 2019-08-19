import React, { useState, useEffect } from 'react'
import { ValueContext, AppContext } from '../context'
import { Cover, Item } from '../Interfaces'
import { GETApi } from './callApi'
import options from './options.json'

const initialCover:Cover = {id: '', name: '', description: '', image: '', itemsAmount: 0}

const TVShowProvider = props => {

    //states
    const [id, setId] = useState<string>()
    const [cover, setCover] = useState<Cover>(initialCover)
    const [items, setItems] = useState<Item[]>([ ])

    //functions
    const getTvshowToCover = (characterId: string):Promise<Cover> => {
        return GETApi().get(`/shows/${characterId}?embed=cast`)
                    .then(res => res.data)
                    .catch((err) => console.log(err))
                    .then((res) => {
                        return {
                            id: res.id, 
                            name: res.name, 
                            description: res.summary,
                            image: res.image.medium,
                            itemsAmount: res._embedded.cast.length
                        } 
                    })
    }

    const getCastToItems = (characterId: string):Promise<Item[]> => {
        return GETApi().get(`/shows/${characterId}/cast`)
                    .then(res => res.data)
                    .catch((err) => console.log(err))
                    .then((res) => {
                        return res.map((item) => {
                            return {
                                    id: item.person.id,
                                    title: item.character.name,
                                    description: getDescription(item),
                                    image: getImage(item),
                                    relateds: []
                            }
                        })
                    })
    }

    const getImage = (item):string => {
        return item.character.image?item.character.image.medium:item.person.image?item.person.image.medium:'';
    }

    const getDescription = (item):string => {
        let played_by   = `Played by: ${item.person.name}\n`
        let country = item.person.country?`Country: ${item.person.country.name}\n`:''
        let birthday = item.person.birthday?`Birthday: ${item.person.birthday}\n`:''
        let deathday = item.person.deathday?`Deathday: ${item.person.deathday}\n`:''
        return `${played_by}${country}${birthday}${deathday}`
    }

    const getShowByPeople = (id: string) => {
        return GETApi().get(`/people/${id}/castcredits?embed=show`)
                    .then(res => res.data)
                    .then((res) => {
                        return res.map((item) => {
                            return {
                                id: item._embedded.show.id,
                                name: item._embedded.show.name,
                            }
                        })
                    })
                    .catch((err) => console.log(err));
    }

    useEffect(() => {
        if(id){
            setCover(initialCover)
            getTvshowToCover(id)
            .then((res) => {
                setCover(res)
            })
            .catch((err) => console.log(err));
        }
    }, [id])

    useEffect(() => {
        if(id){
            setItems([ ])
            getCastToItems(id)
            .then((res) => {
                Promise.all(
                    res.map(item => {
                        return getShowByPeople(item.id)
                    })
                )
                .then((p) => {
                    p.forEach((item, i) => {
                        res[i].relateds = item
                    })
                    setItems(res)
                })
            })
        }
    }, [id])

    const tvshowValues:ValueContext = {
        options,
        cover,
        items,
        setId
    };

    return (
        <AppContext.Provider value={tvshowValues}>
            {props.children}
        </AppContext.Provider>
      );
}

export { TVShowProvider };