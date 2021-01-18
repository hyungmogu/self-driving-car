import { getObstacleEvents } from './computer-vision';

interface Events {
  [obstacle:string]: boolean
}

interface Steering extends Control {
  turn: (direction: string) => void
}

interface Control {
  execute: (command: string) => void
}


interface AutonomousCar {
  isRunning?: boolean
  respond: (events: Events) => void
}

interface AutonomousCarProps {
  isRunning?: boolean
  steeringControl: Steering
}


class Car implements AutonomousCar {
  isRunning;
  steeringControl;
  constructor(props: AutonomousCarProps) {
    this.isRunning = props.isRunning;
    this.steeringControl = props.steeringControl;
  }

  respond(events: Events) {
    if (!this.isRunning) {
      return console.log("Car is turned off");
    }

    Object.keys(events).forEach(eventKey => {
      if (!events[eventKey]) {
        return;
      }

      if (eventKey == 'ObstacleLeft') {
        this.steeringControl.turn("right");
      }

      if (eventKey == 'ObstacleRight') {
        this.steeringControl.turn("left");
      }
    });
  }
}

class SteeringControl implements Steering {
  execute(command: string) {
    console.log(`Executing: ${command}`);
  }

  turn(direction: string) {
    this.execute(`turn ${direction}`);
  }
}

let steering = new SteeringControl();
let autonomousCar = new Car({isRunning: true, steeringControl: steering});
autonomousCar.respond(getObstacleEvents());
