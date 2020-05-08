import React from'react'
import Mix from './Mix'

const Home=(props)=>(
    <div className="flex flex-wrap justify-between mixes ph3 ph4-l">
        <div className="mix mb4">
            {/* we get the props from App.js and keep pass them down to Mix.js */}
            <Mix name="Mixname" {...props}/>
        </div>

    </div>
  )

export default Home