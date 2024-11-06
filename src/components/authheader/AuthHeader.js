import React from 'react'

const AuthHeader = ({heading,description,myclass}) => {
    return (
        <div className='section-head'>
            <div className={`head ${myclass}`}>
                <h2 >
                    {heading}
                </h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default AuthHeader
