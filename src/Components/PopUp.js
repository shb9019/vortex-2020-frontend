import * as React from 'react';
import '../styles/newPopUp.css';
import {Row} from "react-bootstrap";

export default function PopUp(prop){

    let text=prop.text;
    let res = text.split(" ");
    let styles={"color":prop.color,"fontWeight":prop.weight};
  
    // starting delay
    const delay=1.5;
  
    // delay between words
    const delayBetweenWords=0.6;

    return(
     <div className="newPopUp measure center tc sans-serif black-80 absolute absolute--fill">
        <div className="flex flex-column justify-center items-center h-100">
          <Row>
            {res.map(function(val, index){ 
              return (
              <h1  style={{"animationDelay":delay+(index*delayBetweenWords)+"s","WebkitAnimationDelay":(delay+index*delayBetweenWords)+"s"}} className="animated fadeInUp ease-out-circ d2 a-1 f2 fw3">
                <code id="wowWow" style={styles} className="db black-40">{val}&nbsp;</code>
              </h1>); 
              })
             }
         </Row>
        </div>
      </div>
)}










