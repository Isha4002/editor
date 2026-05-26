"use client";

import { usePlayground } from '@/modules/playground/hooks/usePlayground';
import { useParams } from 'next/navigation';
import React from 'react';

const MainPlaygroundPage = () => {
    const {id} = useParams<{id: string}>();

    const {playgroundData, templateData, isLoading, error, loadPlayground} = usePlayground(id);
    console.log("Playground Data:", playgroundData);
    console.log("Template Data:", templateData);
    return (
        <div>
            Params: {id}
        </div>
    );
};

export default MainPlaygroundPage;