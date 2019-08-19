import React, { useState, Fragment } from 'react';
import { Menu } from 'semantic-ui-react'

import MainContainer from '../MainContainer'

import { MarvelProvider } from '../../hooks/marvel/provider'
import { TVShowProvider } from '../../hooks/tvshow/provider'

export const TabContainer = () => {

  const [tab, setTab] = useState('TVShow')

  return(
      <Fragment>
        <Menu pointing inverted>
          <Menu.Item name='TVShow' 
                      active={tab === 'TVShow'} 
                      onClick={(e, { name }) => {setTab(name)}}/>
          <Menu.Item name='Marvel'
                      active={tab === 'Marvel'}
                      onClick={(e, { name }) => {setTab(name)}}/>
        </Menu>

        {tab === 'TVShow' &&
        <TVShowProvider>
            <MainContainer/>
        </TVShowProvider>
        }
        {tab === 'Marvel' &&
        <MarvelProvider>
            <MainContainer/>
        </MarvelProvider>
        }
      </Fragment>
  );
    
};
  
export default TabContainer;
