import React, { useState, useContext } from 'react'
import { AppContext } from '../../hooks/context'
import { Menu } from 'semantic-ui-react'

export const ItemMenu = ({ description, relateds }) => {

    const [activeItem, setActiveItem] = useState('1')
    const { setId } = useContext(AppContext);

    function onClickCharacterItem(item){
        setId(item.id)
    }

    return (
        <div>
            <Menu secondary>
                <Menu.Item name='1' active={activeItem === '1'} onClick={(e, { name })=>{setActiveItem(name)}}>
                    Description
                </Menu.Item>
                <Menu.Item name='2' active={activeItem === '2'} onClick={(e, { name })=>{setActiveItem(name)}}>
                    Links
                </Menu.Item>
            </Menu>
            {activeItem==='1' &&
                <div style={{'whiteSpace':'pre-line'}} dangerouslySetInnerHTML={{__html: description}}/>
            }            
            {activeItem==='2' &&
                <div>
                    <dl>
                    {relateds.map((item, key) =>
                        <dt key={key}>
                            <a href='#' onClick={(e)=>{onClickCharacterItem(item); return false;}}>{item.name}</a>
                        </dt>
                    )}
                    </dl>
                </div>
            }            
            
        </div>
    )
}