import Navbar from './Navbar.jsx'
import Home from './home.jsx'
import Des from './description.jsx'
import Fea from './feature.jsx'
import Glance from './glance.jsx'
import Demo from './demo.jsx';
import Tech from './tech.jsx';
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