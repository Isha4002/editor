import AddRepo from '@/modules/dashboard/actions/components/add-repo'
import React from 'react'
import AddNewButton from '@/modules/dashboard/actions/components/add-new'
import { getAllPlaygroundForUser } from '@/modules/dashboard/actions'
import EmptyState from '@/modules/dashboard/actions/components/empty-state'
import ProjectTable from '@/modules/dashboard/actions/components/project-table'


const page = async() => {
    const playgrounds = await getAllPlaygroundForUser();
    return (
        <div className="flex flex-col justify-start item-center min-h-screen mx-auto max-w-7xl px-4 py-10">
            <div className='grid grid-col-1 md:grid-cols-2 gap-6 w-full'>
                <AddNewButton />
                <AddRepo />
            </div>
            <div className='mt-10 flex flex-col justify-center items-center w-full'>
                {
                    playgrounds && playgrounds.length == 0 ? (
                        <EmptyState />
                    ) : (
                        <ProjectTable
                        projects={playgrounds || []}
                        onDeleteProject={()=>{}}
                        onUpdateProject={()=>{}}
                        onDuplicateProject={()=>{}}

                        />
                    )
                }
            </div>
        </div>
    )
}

export default page