const { CountdownCircleTimer } = require("react-countdown-circle-timer");

{/**/ }

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
        duration={30}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[30, 20, 10, 0]}
        onComplete={() => ({ shouldRepeat: true, delay: 10 })}
        size={120}>

        {renderTime}
      </CountdownCircleTimer>
    </div>
  )
}

export default CountdownTimer
