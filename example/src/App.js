import React, { Component } from 'react'
import SpiderChart from 'react-spider-chart'
import './styles.css';

import Icon1 from './assets/circle1.png';
import Icon2 from './assets/circle2.png';
import Icon3 from './assets/circle3.png';
import Icon4 from './assets/circle4.png';
import Icon5 from './assets/circle5.png';

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
        size: 500,
        axes: true, // show axes?
        scales: 6, // how many circles?
        captions: true, // show captions?
        indexes: true,
        icons: false,
        captionMargin: 0,
        onClick: function iconOnClick(item) {
            alert(item.key);
        },
        onShapeClick: function onShapeClick(item) {
            //alert(item.key);
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
      <div style={{margin:'0 auto',width:'36%',height:'36%'}}>
        <SpiderChart
		data={chartData.data}
		props={chartData.props}
		/>
      </div>
    )
  }
}