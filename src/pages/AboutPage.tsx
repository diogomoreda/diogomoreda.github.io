import React, { useState, useEffect, useCallback, useRef } from 'react';
import ApiService from '../api/api-service'
import Tree from '../components/Tree';

interface TreeData {
    type: 0 | 1;
    id: string;
    name: string;
    extension?: string;
    created: string;
    modified: string;
    hidden: boolean;
    disabled: boolean;
    selected: boolean;
    highlighted: boolean;
    open: boolean;
    edit: boolean;
    parent?: string;
    children: string[]
}

export default function AboutPage(): JSX.Element {

    const [data, setData] = useState<TreeData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const result:TreeData[] = await ApiService.fetchData<TreeData[]>('http://localhost:3000/models/tree-model.json');
            setData(result);
        } catch (error:any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // function to fetch the initial data on load
    useEffect(() => {
        //console.log('Fetching data...');
        fetchData(); 
    }, []);// only run once, onLoad
    
    return (
        <div>
            <Tree treeData={data}/>
        </div>    
    )
}
