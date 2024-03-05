import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RouteConfig } from './types/RouteConfigs'
import { router } from './configuration/Router'
import Layout from './layout/Layout'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export default function App(): JSX.Element 
{
    let routes = router.map((routeConfig:RouteConfig) => (
        <Route 
            key={routeConfig.id}
            path={routeConfig.path}
            element={routeConfig.element} 
        />
    ));

    if (router.find(item => item.isIndex)) {
        routes = routes.concat([router.filter(item => item.isIndex)[0]].map((routeConfig:RouteConfig) => (
            <Route 
                index
                key="index"
                path="/"
                element={routeConfig.element} 
            />
        )))
    }

    return (
        <BrowserRouter basename="/diogomoreda.github.io">
            <Routes>
                <Route path="*" element={
                    <Layout>
                        <Routes>
                            {routes}
                        </Routes>
                    </Layout>
                } />
            </Routes>
        </BrowserRouter>
    );
}
