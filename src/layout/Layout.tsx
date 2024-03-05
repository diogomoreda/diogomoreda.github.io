import { ReactNode, useState } from 'react';
import Navigation from './Navigation';
import { RouteConfig } from '../types/RouteConfigs'
import { router } from '../configuration/Router'

type Props = {
    children: ReactNode;
};


export default function Layout({ children }:Props): JSX.Element 
{
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [navigationVisible, setNavigationVisible] = useState(true);

    const handleSelectItem = (item:RouteConfig, index:number):void => {
        setSelectedIndex(index);
        console.log('selectedIndex:', selectedIndex);
    }

    const handleNavigationToggle = () => {
        setNavigationVisible(!navigationVisible);
    }

    return (
        <div className="app">
            <div className="layout">
                <div className={`sidebar ${!navigationVisible ? 'hidden' : ''}`}>
                    <Navigation 
                        title="hello"
                        items={router}
                        onSelectItem={handleSelectItem}  
                    />
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
            <button
                className={`button-page ${!navigationVisible ? 'hidden' : ''}`} 
                onClick={handleNavigationToggle}></button>
        </div>
    );
};
