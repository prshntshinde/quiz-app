import React from 'react'
import PropTypes from 'prop-types'

const noOfQuestions = 50;

const QuizMain = props => {
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-8 grid-rows-5  gap-2 text-center text-4xl'>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>01</div>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>02</div>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>03</div>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>04</div>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>05</div>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>06</div>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>07</div>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>08</div>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>09</div>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>10</div>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>11</div>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>12</div>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>13</div>
        <div className='text-black bg-slate-400 hover:bg-cyan-400'>14</div>
    </div>
  )
}

QuizMain.propTypes = {}

export default QuizMain