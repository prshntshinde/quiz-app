import React from 'react'
import PropTypes from 'prop-types'

const noOfQuestions = 50;

const QuizMain = props => {
  return (
    <div className='grid grid-cols-12 gap-2 text-center text-4xl'>
        <div style={{backgroundColor: `${getRandomColor()}`}}>01</div>
        <div style={{backgroundColor: `${getRandomColor()}`}}>02</div>
        <div style={{backgroundColor: `${getRandomColor()}`}}>03</div>
        <div style={{backgroundColor: `${getRandomColor()}`}}>04</div>
        <div style={{backgroundColor: `${getRandomColor()}`}}>05</div>
        <div style={{backgroundColor: `${getRandomColor()}`}}>06</div>
        <div style={{backgroundColor: `${getRandomColor()}`}}>07</div>
        <div style={{backgroundColor: `${getRandomColor()}`}}>08</div>
        <div style={{backgroundColor: `${getRandomColor()}`}}>09</div>
        <div style={{backgroundColor: `${getRandomColor()}`}}>10</div>
        <div style={{backgroundColor: `${getRandomColor()}`}}>11</div>
        <div style={{backgroundColor: `${getRandomColor()}`}}>12</div>
        <div style={{backgroundColor: `${getRandomColor()}`}}>13</div>
    </div>
  )
}

QuizMain.propTypes = {}

export default QuizMain

function getRandomColor(){
    return "#" + ((1<<24)*Math.random() | 0).toString(16);
}