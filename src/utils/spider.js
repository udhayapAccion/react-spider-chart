import React from 'react';
import '../style.css';
//
//let captionPoints = [];

// helper functions
const polarToX = (angle, distance) => Math.cos(angle - Math.PI / 2) * distance;

const polarToY = (angle, distance) => Math.sin(angle - Math.PI / 2) * distance;

const points = points => {
    return points
        .map(point => point[0].toFixed(4) + ',' + point[1].toFixed(4))
        .join(' ');
};

// const getPointsForCaption = (key, pointY) => {
//     let tempPoints = {};
//     if (captionPoints.length) {
//         captionPoints.forEach(element => {
//             if (element.key === key) {
//                 let val = (element.size * 2);
//                 val = (parseInt(val) + parseInt(element.pointY));
//                 if (val >= pointY) {
//                     tempPoints = {
//                         pointX: element.pointX,
//                         pointY: element.pointY - element.size * 1.5
//                     };
//                 }

//             }
//         });
//     }
//     return tempPoints;
// }

// const setPointsForCaptions = (key, pointX, pointY, size) => {
//     captionPoints.push({ key: key, pointX: pointX, pointY: pointY, size });
// }

// Click Handlers

const onClick = (options, col) => {
    options.onClick(col);
}
const onShapeClick = (options) => {
    options.onShapeClick(options);
}


// drawing the cross lines over the circle
const axis = options => (col, i) => (
    <polyline
        key={`poly-axis-${i}`}
        points={points([
            [0, 0],
            [
                polarToX(col.angle, options.size / options.drawSize),
                polarToY(col.angle, options.size / options.drawSize)
            ]
        ])}
        {...options.axisProps(col)}
    />
);

// drawing the shapes inside the circles based on the data
const shape = (columns, options) => (chartData, i) => {
    return (
        <path key={`shape-${i}`}
            d={options.smoothing(
                columns.map(col => {
                    let val = col.status;
                    if (val > 1) {
                        val = val / 100;
                    }
                    if ('number' !== typeof val) {
                        throw new Error(`Data set ${i} is invalid.`);
                    }

                    return [
                        polarToX(col.angle, (val * options.size) / options.drawSize),
                        polarToY(col.angle, (val * options.size) / options.drawSize)
                    ];
                })
            )}
            onClick={() => onShapeClick(options)}
            {...options.shapeProps()}

        />
    );
};

// drawing the circles
const scale = (options, value) => (
    <circle
        key={`circle-${value}`}
        cx={0}
        cy={0}
        r={(value * options.size) / options.drawSize}
        {...options.scaleProps(value)}
    />
);


// adding caption index
let index = 1;
const captionIndex = options => col => (
    <text
        key={`caption-of-${col.key}`}
        x={polarToX(col.angle, (options.size / 2) * 0.57).toFixed(4)}
        y={polarToY(col.angle, (options.size / 2) * 0.57).toFixed(4)}
        dy={(options.indexProps().fontSize || 10) / 2}
        {...options.indexProps()}
    >
        {index++}
    </text>
);

// adding the captions
const caption = options => col => {
    let style = (col.status / 100 === 1) ? 'caption' : 'caption-completed';

    let distance = (options.icons || options.circleFill) ? 0.95 : 0.75;

    let pointX = polarToX(col.angle, (options.size / 2) * distance).toFixed(4);
    let pointY = polarToY(col.angle, (options.size / 2) * distance).toFixed(4);

    //let points = getPointsForCaption(col.key, pointY);

    return (
        <text
            key={`caption-of-${col.key}`}
            x={pointX}
            y={pointY}
            dy={(options.captionProps(col).fontSize || 10) / 2}
            {...options.captionProps(style)}

        >
            {col.key}
        </text>
    );
}

// drawing the circle and filling it will color based on the status
const circleFill = options => col => {
    let circleSize = options.size / 20;
    let imageSize = circleSize - 2;
    let style = (col.status / 100 === 1) ? 'fillCircle' : 'fillCircle-completed';
    let pointX = polarToX(col.angle, (options.size / 2) * 0.75).toFixed(4);
    let pointY = polarToY(col.angle, (options.size / 2) * 0.75).toFixed(4);
    // setPointsForCaptions(col.key, pointX, pointY, circleSize);
    let imagePoints = { x: pointX - imageSize / 2, y: pointY - imageSize / 2 };
    return (
        <g>
            <circle
                key={`circle-of-${col.key}`}
                r={circleSize}
                cx={pointX}
                cy={pointY}
                onClick={() => onClick(options, col)}
                {...options.fillCircleProps(style)}
            >

            </circle>
            <image width={imageSize} height={imageSize} key={`icon-of-${col.key}`}
                x={imagePoints.x}
                y={imagePoints.y}
                xlinkHref={col.icon}
                onClick={() => onClick(options, col)}
                {...options.iconProps(col)}
            />
        </g>
    );
}

//adding the icons
const icon = options => col => {
    let pointX = polarToX(col.angle, (options.size / 2) * 0.75).toFixed(4);
    let pointY = polarToY(col.angle, (options.size / 2) * 0.75).toFixed(4);
    let imageSize = options.size / 10;
    let imagePoints = { x: pointX - imageSize / 2, y: pointY - imageSize / 2 };

    return (
        <image width={imageSize} height={imageSize} key={`icon-of-${col.key}`}
            x={imagePoints.x}
            y={imagePoints.y}
            xlinkHref={col.icon} onClick={() => onClick(options, col)}
            {...options.iconProps(col)}
        />
    );
}

// rendering the Chart
const spider = (data, props = {}) => {

    if (!Array.isArray(data)) {
        throw new Error('data must be an array');
    }
    props.size = props.size / props.zoomDistance;

    const columns = data.map((item, i, all) => {
        return {
            key: item.caption,
            caption: caption[i],
            angle: (Math.PI * 2 * i) / all.length,
            icon: item.icon,
            status: item.status
        };
    });
    let groups = [
        <g key={`g-groups`}>{columns.map(shape(columns, props))}</g>
    ];
    if (data) {
        if (props.icons) {
            groups.push(<g key={`poly-icons`}>{columns.map(icon(props))}</g>);
        }
        else if (props.circleFill) {
            groups.push(<g key={`poly-circlefill`}>{columns.map(circleFill(props))}</g>);
        }
        if (props.captionIndex) {
            index = 1;
            groups.push(<g key={`poly-captionsindex`}>{columns.map(captionIndex(props))}</g>);
        }
        if (props.captions) {
            groups.push(<g key={`poly-captions`}>{columns.map(caption(props))}</g>);
        }

    }
    if (props.axes) {
        groups.unshift(<g key={`group-axes`}>{columns.map(axis(props))}</g>);
    }

    if (props.scales > 0) {
        const scales = [];
        for (let i = props.scales; i > 0; i--) {
            scales.push(scale(props, i / props.scales));
        }
        groups.unshift(<g key={`poly-scales`}>{scales}</g>);
    }

    const delta = (props.size / 2).toFixed(4);
    return <g transform={`translate(${delta},${delta})`}>{groups}</g>;

};

export default spider;
