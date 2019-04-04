import React from 'react';
import spider from './utils/spider';

import './style.css';

const noSmoothing = points => {
    let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);
    for (let i = 1; i < points.length; i++) {
        d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
    }
    return d + 'z';
};

const defaultProps = {
    size: 400,
    axes: true, // show axes?
    scales: 5, // show scale circles?
    captions: true, // show captions?
    captionIndex : true, // show caption indexes
    icons: true, // show icons
    circleFill : true,
    zoomDistance: 1, // where on the axes are the captions?
    drawSize: 4,
    smoothing: noSmoothing, // shape smoothing function
    captionMargin: 10,
    onClick: function iconOnClick(item) {
        //alert(item.key);
    },
    onShapeClick: function onShapeClick(item) {
        //alert(item.key);
    },
    axisProps: () => ({ className: 'axis' }),
    circleProps: () => ({ className: ' circle' }),
    indexProps: () => ({ className: 'index', fontSize: 14 }),
    scaleProps: () => ({ className: 'scale', fill: 'none' }),
    shapeProps: () => ({ className: 'shape' }),
    iconProps: () => ({ className: 'icon' }),
    fillCircleProps: () => ({ className: "fillCircle" }),
    captionProps: () => ({
        className: 'caption',
        textAnchor: 'middle',
        fontSize: 10,
        fontFamily: 'Source Sans Pro'
    }),
};

// Resizable Spider Chart Component
const SpiderChart = properties => {
    const { data, props } = properties;
    let { size } = props;
    if (!size) {
        size = defaultProps.size;
    }
    else if (typeof (size) === "string") {
        size = parseInt(size);
    }
    const chartProps = { ...defaultProps, ...props, size };
    const chart = spider(data, chartProps);
    const captionMargin = chartProps.captionMargin;
    return (
        <svg
            version="1"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox={`-${captionMargin} 0 ${size + captionMargin * 2} ${size}`}
            style={{
                padding: "20px", width: "100%", height: "100%"
            }}
        >
            {chart}
        </svg>
    );
};

export default SpiderChart;
