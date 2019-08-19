import React, { useContext } from "react";
import { AppContext } from '../../hooks/context'
import { Card, Image, Icon } from 'semantic-ui-react'

export const LeftCard = () => {

    const { cover } = useContext(AppContext);

    return (
        <Card>
            <Image src={cover.image} />
            <Card.Content>
                <Card.Header>{cover.name}</Card.Header>
                <Card.Description><div dangerouslySetInnerHTML={{__html: cover.description}} /></Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a><Icon name='user'/>ID {cover.id}</a>
            </Card.Content>
        </Card>
    )

}