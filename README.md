# react-spider-chart

> React svg spider chart

[![NPM](https://img.shields.io/npm/v/react-spider-chart.svg)](https://www.npmjs.com/package/react-spider-chart) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-spider-chart
```

## Usage

```jsx
import React, { Component } from 'react'
import SpiderChart from 'react-spider-chart'

import Icon1 from '../assets/circle1.png';
import Icon2 from '../assets/circle2.png';
import Icon3 from '../assets/circle3.png';
import Icon4 from '../assets/circle4.png';
import Icon5 from '../assets/circle5.png';

const chartData = {
    data: [
        { caption: "United States", status: 40, icon: Icon1 },
        { caption: "Australia", status: 70, icon: Icon2 },
        { caption: "France", status: 90, icon: Icon3 },
        { caption: "India", status: 60, icon: Icon4 },
        { caption: "China", status: 30, icon: Icon5 },
        { caption: "UAE", status: 100, icon: Icon5 }
        ],

    props: {
        size: 400,
		axes: true, // show axes?
		scales: 6, // show scale circles?
		captions: true, // show captions?
		captionIndex : true, // show caption indexes
		icons: true, // show icons
		circleFill : true,
		zoomDistance: 1, // where on the axes are the captions?
		drawSize: 4,
		smoothing: noSmoothing, // shape smoothing function
		captionMargin: 10,
        onClick: function iconOnClick(item) {
            alert(item.key);
        },
        onShapeClick: function onShapeClick(item) {
            alert(item.key);
        },
        axisProps: () => ({ className: 'axis' }),
        circleProps: () => ({ className: ' circle' }),
        indexProps: () => ({ className: 'index',fontSize:14 }),
        scaleProps: () => ({ className: 'scale', fill: 'none' }),
        shapeProps: () => ({ className: 'shape' }),
        iconProps: () => ({ className: 'icon' }),
        fillCircleProps: (style) => ({ className: style }),
        captionProps: (style) => ({
            className: style,
            textAnchor: 'middle',
            fontSize: 10,
            fontFamily: 'Source Sans Pro'
        }),
    }

};


export default class App extends Component {
  render () {
    return (
      <div>
        <SpiderChart
		data={chartData.data}
		props={chartData.props}
		/>
      </div>
    )
  }
}

```

## License

MIT © [udhayapAccion](https://github.com/udhayapAccion)
