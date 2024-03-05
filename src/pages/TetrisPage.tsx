import { useEffect } from 'react';
import './TetrisPage.css'
import { BASE_URL } from '../configuration/Constant'

export default function Tetris(): JSX.Element 
{    
    useEffect(() => {
        console.log('Effect ran!');
        const script = document.createElement('script');
        script.src = `${BASE_URL}/apps/tetris/tetris.js`;
        script.async = true;
        document.body.appendChild(script);
        return () => {
          // Cleanup if needed
          document.body.removeChild(script);
        };
      }, []);

    return (
        <div className="emulator" id="component-emulator"></div>
    )
}
