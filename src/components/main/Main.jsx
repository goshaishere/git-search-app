import './main.less'
import {Repo} from './repo/repo'
import { getRepos } from '../actions/repos'
import { useDispatch, useSelector } from 'react-redux'
import React, {useEffect, useState } from 'react'
import { setCurrentPage } from '../../reducers/reposReducer'
import { createPages } from '../../util/pagesCreator'
import { Navigate } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';


const Main = () => {
    //const navigate = useNavigate();


    const dispatch = useDispatch()
    const repos = useSelector(state => state.repos.items)
    const isFetching = useSelector(state => state.repos.isFetching)
    const currentPage = useSelector(state => state.repos.currentPage)
    const totalCount = useSelector(state => state.repos.totalCount)
    const perPage = useSelector(state => state.repos.perPage)

    const isFetchError = useSelector(state => state.repos.isFetchError)

    const pagesCount = Math.ceil(totalCount / perPage)
    
    const [searchValue, setSearchValue] = useState("")

    const pages = []

    createPages(pages, pagesCount, currentPage)
    useEffect( () => {
        dispatch(getRepos(searchValue, currentPage, perPage))
    }, [currentPage])


    function searchHandler(){
        dispatch(setCurrentPage(1))
        dispatch(getRepos(searchValue, currentPage, perPage))
    }

    // if (isFetchError === true){
    //     return <Navigate to ="/error" />
    // }

    return (
        <div>
            {
                isFetchError && 
                <div class="alert alert-danger" role="alert">
                    Произошла ошибка! Обновите страницу!!!
                </div>
            }


            <div className="search">
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder="Input repo name" className="search-input"/>
                <button onClick={() => searchHandler()} className="search-btn">Search</button>
            </div>
            <div className="pages">
                {
                    pages.map((page, index) => <span 
                                                    key={index}
                                                    className={currentPage === page ? "current-page" : "page"} 
                                                    onClick={() => dispatch(setCurrentPage(page))}>
                                                    {page}
                                                </span>)
                }
            </div>

            {
                isFetching === false
                    ?
                repos.map((repo) =>
                    // Делайте так, только если у элементов массива нет заданного ID
                    <Repo repo={repo} key={repo.id} test={'azaza'} keyVal={repo.id}/>
                )
                    :
                <div className="fetching"></div>
            }

        </div>
    )
}
export default Main