import { useEffect } from 'react';
import './TetrisPage.css'

export default function Tetris(): JSX.Element 
{    
    useEffect(() => {
        console.log('Effect ran!');
        const script = document.createElement('script');
        script.src = 'http://localhost:3000/apps/tetris/tetris.js';
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
