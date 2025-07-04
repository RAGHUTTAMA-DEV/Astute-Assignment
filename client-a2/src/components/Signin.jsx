import { useState } from 'react' 
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config'

export default function Signin(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(username, password)
        const response = await axios.post(`${API_URL}/login/`, {username, password})
        console.log(response)
        if(response.status === 200){
            alert('Login successful')
            navigate('/')
        }
        else{
            alert('Login failed')
        }
    }

    return(
        <div>
            <h1>Signin</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Signin</button>
            </form>
        </div>
    )
}