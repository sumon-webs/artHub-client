import EditArtWorkForm from '@/components/dahsboard/artist/EditArtWorkForm'
import { getArtworkDetails } from '@/lib/api/artworks'
import React from 'react'

const EditArtWorkPage = async({params}) => {
  const {id}= await params
  
  const res = await getArtworkDetails(id)
  const artwork = res?.data?.data

  return (
    <div>
      <EditArtWorkForm artwork={artwork}/>
    </div>
  )
}

export default EditArtWorkPage
