import React from 'react'
import PageTitle from '../Components/PageTitle'
import { Table } from 'antd'
import { busData } from "../constants/index";

const OtherLinks = () => {
  return (
    <div className='container mx-auto'>
      < PageTitle title="Other" heading="other links"/>
      <div>
        <Table 
       dataSource={busData}
       columns={[
         {
           title: "Name",
           dataIndex: "Name",
         },
         {
           title: "Counter",
           dataIndex: "Counter",
         },
         {
           title: "Number",
           dataIndex: "Phone_Number",
         },
        
        ]}
        >

        </Table>
      </div>
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
