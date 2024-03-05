import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ApiService from '../api/api-service'
import { ImageData } from '../types/ImageData'
import ImagePlayer from '../components/ImagePlayer'
import { BASE_URL } from '../configuration/Constant'


export default function ImagePage():JSX.Element 
{
    const location = useLocation();
    const currentPath = location.pathname;
    const url = `${BASE_URL}/images${currentPath}/content.json`;
    const [data, setData] = useState<ImageData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (url:string) => {
        try {
            //console.log('fetching:', url);
            const result:ImageData[] | null = await ApiService.fetchData<ImageData[]>(url);
            setData(result);
        } catch (error:any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // function to fetch the initial data on load
    useEffect(() => {
        //console.log('Fetching data...'); // <-- this is revealing a bug (method being called twice )
        fetchData(url); 
    }, [url]);

    
    if (loading) return <p>Loading...</p>;
    
    if (error) return <p>Error: {error}</p>;
    
    return <>{ data && <ImagePlayer imageData={data} /> }</>
}