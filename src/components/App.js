// the following line is telling the browser we got mixcloud as a global variable from the script we add in index.html
/* global Mixcloud */
import React, {Component}from 'react';
import FeaturedMix from './FeaturedMix'
import Header from './Header'
import Home from './Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const Archive=()=>(
  <h1>archive page</h1>
)
const About=()=>(
  <h1>about page</h1>
)
class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      // whether a mix is currently playing
      playing:false,
      // the id of the current mix
      currentMix:''
    }

  }
  mountAudio = async()=>{
    // from mixcloud website
    // when we use this keyword, instead of const,  our widget is now accessible anywhere inside the component
    this.widget = Mixcloud.PlayerWidget(this.player);
    // we are waiting for our widget to be ready
    await this.widget.ready;
    // autoplay
    await this.widget.play();

    this.widget.events.pause.on(()=> 
      this.setState({
      playing:false
    }))
    this.widget.events.play.on(()=> 
      this.setState({
      playing:true
    }))
  };
  
  // when our app components are all loaded onto the page, our componentDidMount gets called and we can be sure everything is ready, so we then run our mountAudio() methods
  componentDidMount(){
    this.mountAudio();
  }

  // we group functions inside of an object called actions. because it's an object, we need to use colon and comma
  actions = {
    togglePlay:()=>{
      this.widget.togglePlay();
    },
  
    playMix:(mixName) =>{
      // play a new mix by its name and then start playing it immediately
      this.widget.load(mixName,true)
      this.setState({
        currentMix:mixName
      })
    }
  }
  

  render(){
    return (
      // router wraps our whole page and let us use react-router
      <Router>
    <div>
      {/* this div contains everything excluding audio player */}
      <div className="flex-l justify-end">
        {/* feature mix */}
        <FeaturedMix/>
        <div className="w-50-l relative z-1">
          {/* header */}
          <Header/>
          {/* Routed page */}
          
          <Switch>
            {/* here we pass out state and our actions down into the home component so that we can use them */}
            <Route exact path="/"><Home {...this.state} {...this.actions} /></Route>
            <Route path="/archive"><Archive /></Route>
            <Route path="/about"><About/></Route>
          </Switch>
        </div>
      </div>
      {/* audio player */}
      {/* change the frameboard to frameBoard for JS */}
      <iframe 
        width="100%" height="60" 
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FMICK%2Fdj-jazzy-jeff-mick-summertime-10%2F" 
        frameBorder="0" 
        className="z-5 db fixed bottom-0"
        ref={player => (this.player = player)}/>
    </div>
    </Router>
  );}
  
}

export default App;
