import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

let LoadingCircle= () => {
  return (
    <CircularProgress style={{
        color:'red',
        animationDuration: '550ms'
      }} 
    size={30}
    thickness={5}
    variant="indeterminate"
    disableShrink />
  )
}
export default LoadingCircle