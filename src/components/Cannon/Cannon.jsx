import React from 'react';
import PropTypes from 'prop-types';
import CannonBase from './CannonBase/CannonBase';
import CannonPipe from './CannonPipe/CannonPipe';

const Cannon = props => (
  <g id="cannon">
    <CannonBase xAxis={900} yAxis={0} />
    {/*<CannonPipe xAxis={1040} yAxis={-80} rotation={props.rotation} />*/}
    <CannonBase xAxis={950} yAxis={0} />
  </g>
);

Cannon.propTypes = {
  rotation: PropTypes.number.isRequired,
};

export default Cannon;
