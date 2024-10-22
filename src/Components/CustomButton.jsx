import React from 'react'
import { Button } from 'react-bootstrap'

const CustomButton = ({btnText}) => {
  return (
    <>
       <Button variant="primary">{btnText}</Button>
    </>
  )
}

export default CustomButton
