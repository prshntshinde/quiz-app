import React from 'react'
import { VscDebugStart } from 'react-icons/vsc'

const StartButton = () => {
    return (
        <div>
            <button className='text-green-400' >
                <VscDebugStart size={24} />
            </button>
        </div>
    )
}

export default StartButton