import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config'
export default function Signup(){
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(username, email, password)
        const response = await axios.post(`${API_URL}/register/`, {username, email, password})
        console.log(response)
        if(response.status === 200){
            alert('Signup successful')
            navigate('/signin')
        }
        else{
            alert('Signup failed')
        }
    }

    return(
        <div>
            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}