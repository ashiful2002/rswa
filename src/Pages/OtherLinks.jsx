import React from 'react'
import PageTitle from '../Components/PageTitle'
import Businfo from './Components/Businfo';

const OtherLinks = () => {
  return (
    <div className='container mx-auto'>
      < PageTitle title="Numbers" heading="other importent numbers"/>
      < Businfo/>
      <p className='text-green-500 text-center'>just an example</p>
      <div>

        <p>Bus:123434</p>
        <p>Ambulence:123434</p>
        <p>Nouka:123434</p>
        <p>Ferry:123434</p>
      </div>
    </div>
  )
}

export default OtherLinks
