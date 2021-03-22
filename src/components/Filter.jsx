import React from 'react'

const Filter = (props) => {
    window.props = props
    return (
        <label htmlFor="">
          <input
            name='filter'
            type='text'
            placeholder='Search contacts'
            value={props.filter}
            onChange={props.handleFilterChange}
          />
        </label>
    )
}


export default Filter;