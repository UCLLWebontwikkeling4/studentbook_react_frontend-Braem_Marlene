import React, { useState } from 'react';
import { Friend, User, StatusMessage} from '../../types';
import { AxiosResponse } from 'axios';
import FriendService from '../../services/FriendService';
import UserService from '../../services/UserService';



type Props = {
    friends: Array<Friend>;
};

const FriendsOverview: React.FC<Props> = ({ friends }: Props) => {

    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [nameInput, setNameInput] = useState<string>("");

    const addFriend = async (name: string) => {
        try {
            
            setStatusMessages([{ message: 'trying to add friend.', type: 'success' }]);
           // await new Promise(f => setTimeout(f, 5000));

            const username = sessionStorage.getItem("loggedinUser");
            
            const friend: AxiosResponse<User> = await UserService.getUser(name)

        
            const res: AxiosResponse<JSON> =await FriendService.addFriend('{"username": "'+username+'","friendname": "'+friend.data.username+'"}');//deze lijn zou een error moeten gooien hopelijk indien het niet lukt
            setStatusMessages([{ message: 'friend added.', type: 'success' }]);
        
        } catch (any) {
            setStatusMessages([...statusMessages, {message: "Jullie zijn al vrienden of de persoon bestaat niet.", type: "error"} ])
            setNameInput('');
        }
    }

    //wat te doen als je op submit duwt
    const handleSubmit = (event: any) => {
        //overschrijf de default
        event.preventDefault()

        if (nameInput.trim() === '') {
            setStatusMessages([{ message: 'Please fill in a name.', type: 'error' }]);
        }else{
            addFriend(nameInput);
        }
    
    }

    if (friends.length === 0) {
        return(
            <div className='box box_marge'>
            <h4 className='title_login'>Friends</h4>

            <div className="status_form">
                <form onSubmit={handleSubmit}>
                        <label>
                            <input
                                className="m-sm-2"
                                type="text"
                                value={nameInput}
                                onChange={(event) => setNameInput(event.target.value)}
                            />
                        </label>
                        <input type="submit" value="Add" />
                </form>
            </div> 

                <p>No friends added yet</p>

            </div>
            
        )}
     else {
        return (

            <div className='box box_marge'>
                <h4 className='title_login'>Friends</h4>

                <div className="status_form">
                    <form onSubmit={handleSubmit}>
                            <label>
                                <input
                                    className="m-sm-2"
                                    type="text"
                                    value={nameInput}
                                    onChange={(event) => setNameInput(event.target.value)}
                                />
                            </label>
                            <input type="submit" value="Add" />
                    </form>
                </div> 
                <div className='friends'>
                    {friends &&
                                friends.map((friend, index) => (
                                    <div className='' key={index}>
                                        <p>{friend.friendname} - {friend.status} </p>                                
                                    </div>
                                ))
                    }
                </div>
               
            </div>
        );
     }



    
};

export default FriendsOverview;
