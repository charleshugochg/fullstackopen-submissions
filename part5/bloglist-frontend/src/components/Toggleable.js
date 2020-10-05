import React, {useState, useImperativeHandle} from 'react'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  
  const showOnVisible = {display: visible ? '' : 'none'}
  const hideOnVisible = {display: visible ? 'none' : ''}

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
        <button onClick={toggleVisiblity}>cancel</button>
      </div>
      <div style={hideOnVisible}>
        <button onClick={toggleVisiblity}>{props.label}</button>
      </div>
    </>
  )
})

export default Toggleable
