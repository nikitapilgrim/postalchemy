import React, {Suspense, useState, useEffect, useRef, useCallback} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {ProviderLoader} from "./lib/loader";
import {Preloader} from "./components/Preloader";
import {useLoader} from "./lib/loader/useLoader";
import {resources} from "./components/assets";

const App = React.lazy(() => import('./components/Three/index'));

Math.clip = function (number, min, max) {
    return Math.max(min, Math.min(number, max));
};


const Main = () => {
    const {progress} = useLoader({resources});

    useEffect(() => {
    }, [progress]);

    return (
        <ProviderLoader>
            <Preloader percent={progress}/>
            <Suspense fallback={null}>
                <App/>
            </Suspense>
        </ProviderLoader>
    );
};

ReactDOM.render(<Main/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
