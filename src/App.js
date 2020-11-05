import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import Canvas from './components/Canvas/Canvas';
import Ground from './components/Ground/Ground';
import Cannon from './components/Cannon/Cannon';
import { getCanvasPosition, updateCanvasSize } from './utils/formulas';
import Sky from './components/Sky/Sky';
import './App.css';
import Position from './utils/Position';
import VisualClues from './components/VisualClues/VisualClues';
import Heart from './components/Heart/Heart';
import FlyingDisc from './components/FlyingDisc/FlyingDisc';
import CannonBall from './components/CannonBall/CannonBall';
import StartGame from './components/StartGame/StartGame';
import {
  heartAxisY,
  heartInitialAxisX, heartWidth,
  intervalBetweenDiscCreation, intervalBetweenRefreshes,
  maximumSimultaneousShots, spaceKeyId,
} from './utils/constants';
import Title from './components/Title/Title';
import CurrentScore from './components/CurrentScore/CurrentScore';
import NewSky from "./assets/NewSky";

ReactGA.initialize('UA-113618973-1');

class App extends Component {
  constructor(props) {
    super(props);
    this.trackMouse = this.trackMouse.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.canvasMousePosition = new Position(0, 0);
    this.channel = null;
  }

  componentDidMount() {
    const self = this;
    setInterval(() => {
      if (!self.props.gameState.started) return;

      const deltaDiscCreation = (new Date()).getTime() - self.props.lastDiscCreatedAt;
      if (deltaDiscCreation > intervalBetweenDiscCreation) {
        self.props.createAndMove(self.canvasMousePosition);
      } else {
        self.props.moveObjects(self.canvasMousePosition);
      }
    }, intervalBetweenRefreshes);

    document.onkeypress = (event) => {
      if (event.keyCode === spaceKeyId || event.charCode === spaceKeyId) {
        self.shootCannonBall({
          clientX: self.mousePosition.x,
          clientY: self.mousePosition.y,
        });
      }
    };

    window.onresize = updateCanvasSize;
    updateCanvasSize();
  }

  componentWillReceiveProps(nextProps) {
    const gameOver = !nextProps.gameState.started && this.props.gameState.started;
    const gameStarted = nextProps.gameState.started && !this.props.gameState.started;

    if (gameOver) {
      ReactGA.pageview('Home');

      ReactGA.event({
        category: 'Game',
        action: 'Over',
        label: nextProps.gameState.kills + '',
        value: nextProps.gameState.kills,
      });
    } else if (gameStarted) {
      ReactGA.pageview('Game');

      ReactGA.event({
        category: 'Game',
        action: 'Started',
      });
    }
  }

  trackMouse(event) {
    const canvasMousePosition = getCanvasPosition(event);
    // am I cheating?
    this.mousePosition = new Position(event.clientX, event.clientY);
    this.canvasMousePosition = canvasMousePosition;
  }

  shootCannonBall(event) {
    if (!this.props.gameState.started) return;
    this.trackMouse(event);
    if (this.props.cannonBalls.length < maximumSimultaneousShots) {
      this.props.shoot(this.canvasMousePosition);
    }
  }

  render() {
    const showVisualClues = false;
    return (
        <Canvas
            trackMouse={event => (this.trackMouse(event))}
            mouseClicked={event => (this.shootCannonBall(event))}
        >
          <Sky />
          <Ground />
          {this.props.flyingDiscs.map(flyingDisc => (
              <FlyingDisc
                  key={flyingDisc.id}
                  position={flyingDisc.position}
              />
          ))}
          {this.props.cannonBalls.map(cannonBall => (
              <CannonBall
                  key={cannonBall.id}
                  position={cannonBall.position}
              />
          ))}
          <Cannon rotation={this.props.angle} />
          <VisualClues visible={showVisualClues} position={this.canvasMousePosition} />
          {this.props.gameState.lives.map(position => (
              <Heart
                  xAxis={heartInitialAxisX - (position * heartWidth)}
                  yAxis={heartAxisY}
                  key={position}
              />
          ))}
          {
            !this.props.gameState.started &&
            <g>
              <Title />
              <StartGame onClick={this.props.startGame} />
            </g>
          }
          <CurrentScore score={this.props.gameState.kills} />
        </Canvas>
    );
  }
}

App.propTypes = {
  angle: PropTypes.number.isRequired,
  me: PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }),
  leaderboard: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })).isRequired,
  cannonBalls: PropTypes.arrayOf(PropTypes.shape({
    position: PropTypes.instanceOf(Position).isRequired,
    angle: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  createAndMove: PropTypes.func.isRequired,
  flyingDiscs: PropTypes.arrayOf(PropTypes.shape({
    position: PropTypes.instanceOf(Position).isRequired,
    angle: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  lastDiscCreatedAt: PropTypes.instanceOf(Date).isRequired,
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    kills: PropTypes.number.isRequired,
    lives: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  authenticationEvent: PropTypes.func.isRequired,
  moveObjects: PropTypes.func.isRequired,
  shoot: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  loadLeaderboard: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  newMaxScore: PropTypes.func.isRequired,
};

export default App;

