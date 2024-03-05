import { useRef, useEffect } from 'react';
//import ApiService from '../api/api-service';
//import { ImageData } from '../types/ImageData'
//import ImagePlayer from '../components/ImagePlayer'


const intro = (function() {
    
    let boxW: number = 1650;
    let boxH: number= 910;
    const lineWeight = 1;
    const f = 60;

    function reverseColor(input:string) {
        var output = ((parseInt(input.replace('#',''),16)^16777215)&16777215).toString(16).toUpperCase();
        while(output.length < 6) output = '0' + output; 
        return '#' + output;
    }

    function tresholdColor(input:string){
        if( ((parseInt(input.substring(1,3),16) >> 7) & 1) + ((parseInt(input.substring(3,5),16) >> 7) & 1) + ((parseInt(input.substring(5,7),16) >> 7) & 1) > 1) {
            return '#000000';
        } else {
            return '#FFFFFF'; 
        }
    }

    function getAlpha(input:string, alpha:number) {
        var output = '#';
        for (let i=0; i<3; i++) {
            let value:number = parseInt(input.substring(i * 2 + 1, i * 2 + 3), 16);
            var h:string = Math.round(value + (255 - value) * (100 - alpha) / 100).toString(16).toUpperCase();
            if (h.length < 2) h = '0' + h;
            //console.log("value="+value);        
            //console.log("hex="+h);        
            output += h;
        };
        //console.log(output);    
        return output;
    }

    function setDimensions(w:number, h:number): void {
        boxW = w;
        boxH = h;
    }

    function setup(ctx:CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#7497A5';
        ctx.lineWidth = lineWeight;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }

    function draw(ctx:CanvasRenderingContext2D): void {
        for (let i:number=0; i<f; i++) {
            //console.log(parseInt(i*100/f));    
            ctx.beginPath();
            ctx.strokeStyle = getAlpha('#7497A5', Math.round((i * 100 / f)) );
            ctx.moveTo(0, (i * 20));
            ctx.quadraticCurveTo(boxW/3 + (i*10), boxH/2 ,boxW/3 + (i*20), boxH );
            ctx.moveTo(boxW, boxH - (i*(boxH/f)));
            ctx.quadraticCurveTo(boxW - (i*(boxW/f)), boxH/2 ,boxW/2 - (i*(boxW/f)),0 ); 
            ctx.moveTo(boxW-i*(boxW/f), 0);
            /*
            ctx.quadraticCurveTo(350 +(i*8), boxH/3+(i*8),i*16, boxH);    
            ctx.moveTo(0, (boxH) - (i*(boxH/f)));    
            ctx.quadraticCurveTo(660 - (i*8),480-(i*8),boxW,boxH/200+(i*16));    
            */
            /*    
            ctx.moveTo( 0,  (i*(boxH/182)));    
            ctx.quadraticCurveTo(boxW/4 +i*6,  (i*(i*(boxH/50)/f)) , boxW/2 , boxH/2);    
            ctx.moveTo(boxW/2 ,boxH/2);    
            ctx.quadraticCurveTo(760 - (i*5), 580 - (i*10), boxW ,  (i*16)  );    
            ctx.moveTo(boxW/2 ,boxH/2);    
            ctx.quadraticCurveTo(boxW/1.1+(i*(i*8/f)), boxH/2+(i*8), i*(boxW*0.6/f), boxH);    
            */ 
            ctx.stroke();
        };
    }

    
    return {
        setDimensions: setDimensions,
        setupContext: setup,
        drawContext: draw
    }
})();


export default function HomePage():JSX.Element 
{
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                intro.setupContext(ctx);
                intro.drawContext(ctx);
            }
        }
    }, []);

    return <canvas ref={canvasRef} width={1650} height={910} />
}