import React from 'react';
import { Friend } from '../../types';

type Props = {
    friends: Array<Friend>;
};

const FriendsOverview: React.FC<Props> = ({ friends }: Props) => {
    // als er geen messages zijn, dan moet er een message zijn
    if (friends.length === 0) {
        return(
        <div className='box box_marge'>
            <h4 className='title_login'>Friends</h4>
            <p>No friends added yet</p>
        </div>
            
        )}
     else {
        return (

            <div className='box box_marge'>
                <h4 className='title_login'>Friends</h4>

                {friends &&
                            friends.map((friend, index) => (
                                <div className='' key={index}>
                                    <p>{friend.friendname} - {friend.status} </p>                                
                                </div>
                            ))
                }
            </div>
        );
     }



    
};

export default FriendsOverview;
