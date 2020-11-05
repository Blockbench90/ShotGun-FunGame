import React from 'react';
import PropTypes from 'prop-types';
import { pathFromBezierCurve } from '../../../utils/formulas';

const CannonBase = (props) => {
  const cannonBaseStyle = {
    fill: '#a16012',
    stroke: '#75450e',
    strokeWidth: '5px',
  };

  const baseWith = 350;
  const halfBase = 10;
  const height = 150;

  const cubicBezierCurve = {
    initialAxis: {
      x: props.xAxis - halfBase,
      y: props.yAxis + height,
    },
    initialControlPoint: {
      x: 40,
      y: -200,
    },
    endingControlPoint: {
      x: 130,
      y: -250,
    },
    endingAxis: {
      x: baseWith,
      y: -50,
    },
  };

  return (
    <g>
      <path
        style={cannonBaseStyle}
        d={pathFromBezierCurve(cubicBezierCurve)}
      />
      <line
        x1={props.xAxis - halfBase}
        y1={props.yAxis + height}
        x2={props.xAxis + halfBase}
        y2={props.yAxis + height}
        style={cannonBaseStyle}
      />
    </g>
  );
};

CannonBase.propTypes = {
  xAxis: PropTypes.number.isRequired,
  yAxis: PropTypes.number.isRequired,
};

export default CannonBase;
