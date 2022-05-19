import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Progress.css'


const Progress = (props) => (
    <div className="Progress">
        <CircularProgressbar 
            value={props.value}
            text={`${props.value}%`}
            background={true}
            styles={buildStyles({

                rotation: 0.25,
        
                strokeLinecap: 'round',
                textSize: '24px',
            
                pathTransitionDuration: 0.5,
            
            
                // Colors
                textColor: '#fff',
                trailColor: '#b0d1f5',
                backgroundColor: '#10355e',
            })}
        />
    </div>
)

export default Progress;