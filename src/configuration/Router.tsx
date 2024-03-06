import { RouteConfig } from '../types/RouteConfigs'
import HomePage from '../pages/HomePage'
import ImagePage from '../pages/ImagePage'
import AboutPage from '../pages/AboutPage'
import TetrisPage from '../pages/TetrisPage'


export const router:RouteConfig[] = [
    {
        isIndex: true,
        id: 'home',
        title: 'Home',
        sort: 0,
        hidden: false,
        path: '/home',
        element: <HomePage />,
    },
    {
        id: 'about',
        title: 'About',
        sort: 1,
        hidden: true,
        path: '/about',
        element: <AboutPage />,
    },
    {
        id: 'torsion',
        title: 'TorsionIS',
        sort: 2,
        hidden: false,
        path: '/torsionis',  // when an image page is used, it should match the image folder name
        element: <ImagePage />,
    },
    {
        id: 'corporate',
        title: 'Corporate',
        sort: 2,
        hidden: false,
        path: '/corporate',  // when an image page is used, it should match the image folder name
        element: <ImagePage />,
    },
    {
        id: 'projects',
        title: 'Projects',
        sort: 2,
        hidden: false,
        path: '/projects',  // when an image page is used, it should match the image folder name
        element: <ImagePage />,
    },
    {
        id: 'illustration',
        title: 'Illustration',
        sort: 2,
        hidden: false,
        path: '/illustration',  // when an image page is used, it should match the image folder name
        element: <ImagePage />,
    },
    {
        id: 'tetris',
        title: 'Tetris Time',
        sort: 3,
        hidden: false,
        path: '/tetris',
        element: <TetrisPage />,
    }
]