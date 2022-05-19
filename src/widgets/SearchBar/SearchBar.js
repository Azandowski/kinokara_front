import React from 'react'
import './SearchBar.css'


const SearchBar = (props) => (
    <div className="SearchBar">
        <div className="column1">
            <input
                value={props.search}
                placeholder="Введите фильм"
                onChange={props.onInputChange}
            />
            <div className="list__count">
                <label>
                    {props.listCount}
                </label>
            </div>
        </div>


        <div className="column1">
            <button 
                id="option"
                onClick={() => props.onSearch(true)}>
                    Найти сериал
            </button>
            <button 
                id="option"
                onClick={() => props.onSearch() }>
                    Найти фильм
            </button>
        </div>
    </div>
)


export default SearchBar;