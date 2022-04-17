import { useState, useEffect } from "react";

export default function CountDown(props) {
    const [counter, setCounter] = useState(props.remainTime);
    // console.log('[tz]: counter', counter);
    // const [defaultTime, setDefaultTime] = useState(0);

    useEffect(() => {
        if (props.remainTime) {
            if (counter === 0){
                setCounter(props.interval);
                // props.setInit(false);
            }
            else
                setTimeout(() => setCounter(counter - 1), 1000);

        }
        // console.log('counter = ', counter)
    }, [counter])


    return (
        <div>

            <h5>
                {("0" + Math.floor(counter / 3600)).slice(-2)}:
                {("0" + Math.floor((counter % 3600) / 60)).slice(-2)}:
                {("0" + Math.floor(counter % 60)).slice(-2)}
            </h5>

        </div>
    )
}