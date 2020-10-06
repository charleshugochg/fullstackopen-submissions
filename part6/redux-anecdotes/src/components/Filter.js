import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = props => {
  const style = {
    margin: 10
  }

  const handleChange = event => {
    const filter = event.target.value

    props.setFilter(filter)
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchProps = {
  setFilter
}

export default connect(null, mapDispatchProps)(Filter)
