
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { RouteConfig } from '../types/RouteConfigs'

interface Props {
    title: string;
    items: RouteConfig[];
    onSelectItem: (item:RouteConfig, index:number ) => void;
}


export default function Navigation({ title, items, onSelectItem }:Props ):JSX.Element 
{
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const sortedRoutes = items.slice().sort((a, b) => a.sort - b.sort);

    const handleClick = (item:RouteConfig, index:number) => {
        setSelectedIndex(index);
        onSelectItem(item, selectedIndex);
    };

    const links = sortedRoutes.map((item:RouteConfig, index) => {
        return item.hidden ? null : 
        <li key={item.id} onClick={(event) => ( handleClick(item, index) )}>
            <Link to={item.path}>{item.title}</Link>
        </li>
    });

    return (
        <div className="navigation">
            <h1>{title}</h1>
            { links?.length === 0 && <p>No Navigation Items found in the Router</p> }
            <ul>{links}</ul>
        </div>
    )
}
