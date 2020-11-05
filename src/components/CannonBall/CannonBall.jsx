import React from 'react';
import PropTypes from 'prop-types';
import Position from '../../utils/Position';

const CannonBall = (props) => {
  const ballStyle = {
    fill: '#777',
    stroke: '#444',
    strokeWidth: '2px',
  };
  return (
    <ellipse
      style={ballStyle}
      //траектория выстрела по х и y
      cx={props.position.x}
      cy={props.position.y}
      //ширина липехи
      rx="16"
      //высота липехи
      ry="16"
    />
  );
};

CannonBall.propTypes = {
  position: PropTypes.instanceOf(Position).isRequired,
};

export default CannonBall;
