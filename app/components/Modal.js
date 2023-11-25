"use client"

import React from 'react'

export default function Modal(props) {
    console.log(props)
    if (!props.isVisible) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className='w-[600px] flex flex-col'>
                <button
                    className='text-red-500 text-xl place-self-end font-bold'
                    onClick={() => props.onClose()}>
                    X
                </button>
                <div className='bg-white p-2 rounded'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
