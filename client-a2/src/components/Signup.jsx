import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Signup(){
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(username, email, password)
        const response = await axios.post('http://localhost:8000/register/', {username, email, password})
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