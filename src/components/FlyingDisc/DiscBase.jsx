import React from 'react';
import PropTypes from 'prop-types';
import Position from '../../utils/Position';

const DiscBase = (props) => {
  const discMiddleStyle = {
    fill: '#979797',
    stroke: '#5c5c5c',
  };

  return (
    <ellipse
      cx={props.position.x}
      cy={props.position.y}
      //ширина тарелки
      rx="40"
      //высота тарелки
      ry="10"
      style={discMiddleStyle}
    />
  );
};

DiscBase.propTypes = {
  position: PropTypes.instanceOf(Position).isRequired,
};

export default DiscBase;
