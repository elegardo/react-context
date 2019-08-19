import React, { useContext } from "react";
import _ from 'lodash'
import { AppContext } from '../../hooks/context'
import { Dropdown } from 'semantic-ui-react'

export const SearchInputSelection = () => {

    const { setId, cover, options } = useContext(AppContext);

    const characterOptions = _.map(options, (op) => ({
                                key: op.key,
                                text: op.text,
                                value: op.value,
                            }))
      
    return (
        <Dropdown
                    placeholder='Select option'
                    fluid
                    search
                    selection
                    value={cover.id}
                    options={characterOptions}
                    onChange={(e, { value })=>{setId(value.toString())}}
      />
    )

}