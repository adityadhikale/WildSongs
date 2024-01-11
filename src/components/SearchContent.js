import React from 'react'
import PageContent from './PageContent'

const SearchContent = ({ songs, setProgress }) => {

    if(songs.length === 0){
        return(
        <>
        <div className='text-center' style={{color:'gray'}}>
            <p>
                No results found for your search. Please try again with a different term.
            </p>
        </div>
        </>)
    }

  return (
    <div>
      <PageContent setProgress={setProgress} songs={songs} />
    </div>
  )
}

export default SearchContent
