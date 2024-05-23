const { CountdownCircleTimer } = require("react-countdown-circle-timer");

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Late</div>;
  }

  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
};

const CountdownTimer = () => {
  return (
    <div>
      <CountdownCircleTimer
        isPlaying
        duration={45}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[45, 30, 15, 0]}
        onComplete={() => ({ shouldRepeat: false, delay: 10 })}
        size={130}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default CountdownTimer;
