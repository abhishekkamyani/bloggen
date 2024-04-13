import axios from 'axios';
import React, { useState } from 'react'
import { SERVER_URL } from '../utils';

export default function Temp() {
    const [avatar, setAvatar] = useState({});
    const [cover, setCover] = useState({});
    const [data, setData] = useState({name: '', mood: ''});

    const handleAvatar = (e) => {
        setAvatar(e.target.files[0]);
    }

    const handleCover = (e) => {
        setCover(e.target.files[0]);
    }

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(avatar);
        formData.append('data', JSON.stringify(data));
        formData.append('avatar', avatar);
        formData.append('cover', cover);

        axios.patch(`${SERVER_URL}/api/user/profile/s/image`, formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err.response.data);
            })
    }

    return (
        <form onSubmit={handleSubmit} >
            <input type="file" placeholder='avatar' name="avatar" file={avatar} onChange={handleAvatar} id="avatar" />
            <input type="file" placeholder="cover" name="cover" file={cover} onChange={handleCover} id="cover" />
            <input type="text" placeholder="name" name="name" value={data.name} onChange={handleChange} />
            <input type="text" placeholder="mood" name="mood" value={data.mood} onChange={handleChange} />
            <button type='submit'>Submit</button>
        </form>
    )
}
