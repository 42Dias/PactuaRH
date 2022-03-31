export default function getIdFromUrl(pathnameToClear){

  let rawUrl = window.location.pathname
  let cleanUrl = rawUrl.replace(`${pathnameToClear}`, '')
  
  return cleanUrl
  }