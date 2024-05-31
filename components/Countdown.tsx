// components/Countdown.tsx

import React, { useEffect, useState } from 'react';
import moment from 'moment';

interface CountdownProps {
    timeTillDate: string;
    timeFormat: string;
}

interface CountdownState {
    days: string | undefined;
    hours: string | undefined;
    minutes: string | undefined;
    seconds: string | undefined;
}

const Countdown: React.FC<CountdownProps> = ({ timeTillDate, timeFormat }) => {
    const [state, setState] = useState<CountdownState>({
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const then = moment(timeTillDate, timeFormat);
            const now = moment();
            const countdown = moment(then.diff(now));
            const days = countdown.format('D');
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');

            setState({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeTillDate, timeFormat]);

    const { days, hours, minutes, seconds } = state;

    const mapNumber = (number: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
        return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    };

    const daysRadius = mapNumber(Number(days), 30, 0, 0, 360);
    const hoursRadius = mapNumber(Number(hours), 24, 0, 0, 360);
    const minutesRadius = mapNumber(Number(minutes), 60, 0, 0, 360);
    const secondsRadius = mapNumber(Number(seconds), 60, 0, 0, 360);

    if (!seconds) {
        return null;
    }

    return (
        <div>
            <div className="countdown-wrapper text-white xl:text-black">
                {days && (
                    <div className="countdown-item">
                        <SVGCircle radius={daysRadius} />
                        {days}
                        <span className='text-white xl:text-black'>days</span>
                    </div>
                )}
                {hours && (
                    <div className="countdown-item">
                        <SVGCircle radius={hoursRadius} />
                        {hours}
                        <span className='text-white xl:text-black'>hours</span>
                    </div>
                )}
                {minutes && (
                    <div className="countdown-item">
                        <SVGCircle radius={minutesRadius} />
                        {minutes}
                        <span className='text-white xl:text-black'>minutes</span>
                    </div>
                )}
                {seconds && (
                    <div className="countdown-item">
                        <SVGCircle radius={secondsRadius} />
                        {seconds}
                        <span className='text-white xl:text-black'>seconds</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const SVGCircle: React.FC<{ radius: number }> = ({ radius }) => (
    <svg className="countdown-svg">
        <path fill="none" stroke="#333" strokeWidth="4" d={describeArc(50, 50, 48, 0, radius)} />
    </svg>
);

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');

    return d;
}

export default Countdown;
