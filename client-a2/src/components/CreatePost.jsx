import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

export default function CreatePost(){
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [link, setLink] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(`${API_URL}/create-post/`, {title, content, link})
        console.log(response)
        if(response.status === 200){
            alert('Post created successfully')
            navigate('/post')
        }
        else{
            alert('Post creation failed')
        }
    }   
    return(
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" />
                <input type="text" placeholder="Content" />
                <input type="text" placeholder="    " />
                <button type="submit">Create</button>
            </form>

        </div>
    )
}