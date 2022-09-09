import { useState } from 'react'
import queryJson from 'query-json'

import search from './data/search'

const App = () => {
    const [results, setResults] = useState([])
    const [searchInput, setSearchInput] = useState('')

    const handleSearch = (event) => {
        const input = event.target.value
        setSearchInput(input)
        if (input.length >= 3) {
            const regex = new RegExp(input, 'i')
            const queryJsonResults = queryJson
                .search(search, regex, {
                    details: true,
                })
                .filter((r) => !r.isKey)

            console.log(queryJsonResults)
            setResults(queryJsonResults)
        } else {
            setResults([])
        }
    }

    return (
        <div
            className='container d-flex flex-column justify-content-center align-items-center'
            style={{ height: '100vh' }}
        >
            <div style={{ width: 600 }}>
                <div class='form-outline'>
                    <input
                        type='search'
                        id='form1'
                        className='form-control'
                        placeholder='Type query'
                        aria-label='Search'
                        onChange={handleSearch}
                    />
                </div>
                <p className='mt-3'>results: </p>
                {results.length > 0 ? (
                    results.map((r, index) => {
                        const item = search[parseInt(r.path[0])]
                        return (
                            <div key={index}>
                                <a className='link-info' href={item.link}>
                                    {item.title}
                                </a>
                            </div>
                        )
                    })
                ) : searchInput.length < 3 ? (
                    <p className='alert alert-info'>
                        Please enter at least 3 characters
                    </p>
                ) : (
                    <p className='alert alert-warning'>No result found!</p>
                )}
            </div>
        </div>
    )
}

export default App
