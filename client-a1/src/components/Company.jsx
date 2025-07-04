import axios from 'axios'
import { useState, useEffect } from 'react'
import { API_URL } from '../config'

export default function Company(){
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [companies, setCompanies] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(name, location, description);
        const response = await axios.post(`${API_URL}/api/create-company/`, {name, location, description})
        console.log(response.data)
        alert('Company created successfully')
        setName('')
        setLocation('')
        setDescription('')
    }
    useEffect(() => {
        listCompanies()
    }, [])
    const listCompanies = async () => {
        const response = await axios.get(`${API_URL}/api/list-companies/`)
        console.log(response.data)
        setCompanies(response.data.companies)
    }
    return(
        <div>
            <h1>Company</h1>
            {/* create company */}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Company Name" value={name} name="name" onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Company Location" value={location} name="location" onChange={(e) => setLocation(e.target.value)} />
                <input type="text" placeholder="Company Description" value={description} name="description" onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Create Company</button>
            </form>

            {/* list companies */}
            <button onClick={listCompanies}>List Companies</button>
            {companies.map((company) => (
                <div key={company.id}>
                    <h1>{company.name}</h1>
                    <p>{company.location}</p>
                    <p>{company.description}</p>
                </div>
            ))}

        </div>
    )
}