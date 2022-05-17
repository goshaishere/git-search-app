import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { getCurrentRepo, getContributors } from '../actions/repos'
import './card.less'


const Card = () => {
    const navigate = useNavigate()
    const {username, reponame} = useParams()
    console.log(username, reponame)

    const [repo, setRepo] = useState( { owner: {} } )
    console.log(repo)

    const [contributors, setContributors] = useState([])

    useEffect( () => {
        getCurrentRepo(username, reponame, setRepo)
        getContributors(username, reponame, setContributors)
    }, [])

    return (
        <div>
            <button onClick={() => navigate(-1)} className="back-btn">BACK</button>
            <div className='card'>
                <img src={repo.owner.avatar_url} alt="" />
                <div className="name">{repo.name}</div>
                <div className="stars">{repo.stargazers_count}</div>
            </div>
            <div className="contributors">
                    {
                    contributors.map((c, index) => 
                        <div>{index+1} {c.login}</div>
                    )
                    }
                </div>
        </div>
    )
}

export default Card

