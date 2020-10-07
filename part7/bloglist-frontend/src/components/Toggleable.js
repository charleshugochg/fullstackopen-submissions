import React, { useState, useImperativeHandle } from 'react'
import { Button } from '@material-ui/core'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showOnVisible = { display: visible ? '' : 'none' }
  const hideOnVisible = { display: visible ? 'none' : '' }

  const toggleVisiblity = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisiblity
    }
  })

  return (
    <>
      <div style={showOnVisible}>
        {props.children}
        <Button onClick={toggleVisiblity}>cancel</Button>
      </div>
      <div style={hideOnVisible}>
        <Button color="primary" onClick={toggleVisiblity}>{props.label}</Button>
      </div>
    </>
  )
})

export default Toggleable
