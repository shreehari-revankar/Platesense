import Navbar from './Navbar.jsx'
import Home from './home.jsx'
import Des from './description.js'
import Fea from './feature.js'
import Glance from './glance.js'
import Demo from './demo.js';
import Tech from './tech.js';
function All(){
    return(
        <div>
            <Navbar/>
            <Home/>
            <Des />
            <Fea />
            <Glance />
            <Demo />
            <Tech />
        </div>
    )
}

export default All;