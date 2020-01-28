import * as React from 'react';
import {useSpring, animated,config} from 'react-spring'

export default function PopUp(prop){
    let text=prop.text;
    const props = useSpring({
        to: {opacity: 1, color: 'white',marginTop: 0 },
        from: {opacity: 0, color: 'white',marginTop:-500},
        config:{duration:4000}
    });
    return <animated.div style={props}>{text}</animated.div>
}










