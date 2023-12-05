import React from 'react'
import Image from 'next/image'
import pic from '../../public/wallpaper-2.png'

const HomeImage = () => {
    return (
        <div>
            <Image
                src={pic}

                alt="Church"
            />
        </div>
    )
}

export default HomeImage