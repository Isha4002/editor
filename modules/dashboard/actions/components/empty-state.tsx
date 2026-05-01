import React from 'react'

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center p-16">
            <img src="/empty-state.svg" alt="No projects" className="w-48 h-48 mb-4" />
            <h2 className="text-xl font-semibold text-gray-500">No playgrounds found</h2>
            <p className="text-gray-400">
                Get started by creating a new playground.
            </p>
        </div>
    )
}

export default EmptyState