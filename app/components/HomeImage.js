import React from 'react'
import Image from 'next/image'
import pic from '../../public/wallpaper-1.jpg'

const HomeImage = () => {
    return (
        <div>
            <Image
                src={pic}
                width={1200}
                height={1080}
                alt="Church"
            />
        </div>
    )
}

export default HomeImage