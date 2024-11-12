import React from 'react'
import Stats from './components/Stats'
import { Title } from '@mantine/core'

const page = () => {
    return (
        <div className='w-screen h-screen flex flex-col bg-slate-100 p-5'>
            <div className='text-2xl font-semibold mb-5'>Datathon'24</div>
            <div className='basis-0 grow'>
                <Stats />
            </div>
        </div>
    )
}

export default page
