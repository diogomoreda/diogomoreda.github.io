import { useState, useEffect, useRef } from 'react';
import { ImageData } from '../types/ImageData'
import './ImagePlayer.css'

interface Props {
    imageData: ImageData[];
}


export default function ImagePlayer({ imageData }:Props):JSX.Element 
{    
    const [data, setData] = useState<ImageData[] | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const scrollingByUserRef = useRef<boolean>(true);
    const imageRefs = useRef<Array<HTMLLIElement | null>>([]);

    // function to assign the initial data to the state
    useEffect(() => {
        setData(imageData);
    }, [imageData]);

    // function to scroll the window to the image with ref matching the currentIndex state  
    useEffect(() => {
        if (imageRefs.current[currentIndex] && scrollingByUserRef.current) {
            imageRefs.current[currentIndex]?.scrollIntoView({
                behavior: 'auto', // 'smooth'
                block: 'start',
            });
        }
    }, [currentIndex, scrollingByUserRef]);

    // function to handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            if (scrollingByUserRef.current) {
                scrollingByUserRef.current = false;
                return; // Ignore scroll events triggered by scrollTo method
            }
            // Loop through each image reference and check if it's in the viewport
            imageRefs.current.forEach((ref, index) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
      
                    // Check if the image is in the viewport
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        setCurrentIndex(index);
                    }
                }
            });
        };

        // Add event listener for scroll events
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentIndex, scrollingByUserRef]);

    const goToNextImage = () => {
        scrollingByUserRef.current = true;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (data?.length || 1));
    };
    
    const goToPreviousImage = () => {
        scrollingByUserRef.current = true;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + (data?.length || 1)) % (data?.length || 1));
    };

    return (
        <div className="image-player">
            <ul>
                {data && data.map((item, index) => (
                    <li 
                        key={ item.id } 
                        data-item={ JSON.stringify(item) }
                        ref={ (ref) => (imageRefs.current[index] = ref) }
                        style={{ minHeight: '100vh' }}>
                        <div className="image-wrapper">
                            <img 
                                src={ item.path }
                                alt={ item.name }
                                loading="lazy"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                            <p>{ item.name }</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div style={{ position: 'fixed', bottom: '0', width: '100%' }}>
                <button onClick={goToPreviousImage} disabled={!data || currentIndex === 0}>
                    Previous
                </button>
                <button onClick={goToNextImage} disabled={!data || currentIndex === (data.length - 1)}>
                    Next
                </button>
            </div>
        </div> 
    )
}
