import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import { useNavigate } from 'react-router-dom'

export default function Jobs(){
    const navigate = useNavigate()
    const [companies, setCompanies] = useState([])
    const [jobs, setJobs] = useState([])
    
    return(
        <div>
            <h1>Jobs</h1>
        </div>
    )
}