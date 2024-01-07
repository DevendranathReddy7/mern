import React from 'react'
import './UserItem.css'
import Avatar from '../../common/components/UIElements/Avatar'
import Card from '../../common/components/UIElements/Card'
import { Link } from 'react-router-dom'

const UserItem = ({ key, id, image, name, placeCount }) => {
    return (

        <li className='user-item'>
            <Card className='user-item__content'>
                <Link to={`/${id}/places`}>
                    <div className='user-item__image'>
                        <Avatar image={image} alt={name} />
                    </div>
                    <div className='user-item__info'>
                        <h2>{name}</h2>
                        <h4>{placeCount} {placeCount > 1 ? 'Places' : 'Place'}</h4>
                    </div>
                </Link>
            </Card>
        </li>
    )
}
export default UserItem