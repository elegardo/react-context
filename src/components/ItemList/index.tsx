import React, { useContext } from "react";
import { Container, Header, List, Image } from 'semantic-ui-react'
import { AppContext } from '../../hooks/context'
import { ItemMenu } from '../ItemMenu'

export const ItemList = () => {

    const { cover, items } = useContext(AppContext);

    return (
        <Container style={{ background: '#fff', padding: '1em' }}>
            <Header as="h3">{cover.itemsAmount} Items</Header>
            <List celled>
            {items.map((item, key) =>
                <List.Item key={key}>
                    <List.Content>
                        <List.Header as='a'>
                            {item.title}
                        </List.Header>
                        <List.Description>
                            <Image size='small' floated='left' src={item.image} />
                            <ItemMenu 
                                    description={item.description}
                                    relateds={item.relateds}
                            />
                        </List.Description>
                    </List.Content>
                </List.Item>
            )}
            </List>
        </Container>
    )
}