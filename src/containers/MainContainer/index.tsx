import React, { useContext } from "react";
import { Container, Divider, Grid, Header } from 'semantic-ui-react'
import { AppContext } from '../../hooks/context'
import { LeftCard } from '../../components/LeftCard'
import { ItemList } from '../../components/ItemList'
import { SearchInputSelection } from '../../components/SearchInputSelection'

const MainContainer = () => {

    const { cover } = useContext(AppContext);

    return (
        <Container>

            <Header as='h2' icon inverted textAlign='center'>
                <SearchInputSelection/>
            </Header>
            
            <Divider />

            <Grid columns='equal'>
                <Grid.Column width={4}>
                    {cover.id &&
                        <LeftCard/>
                    }
                </Grid.Column>

                <Grid.Column width={12}>
                    {cover.id &&
                        <ItemList/>
                    }
                </Grid.Column>

            </Grid>

        </Container>
    )
}

export default MainContainer  