import axios from 'axios';

export const UPDATE_WALL = 'UPDATE_WALL';

export const wallActions = {
  getWallInfo: ( userId ) => {
    return ( dispatch ) => {
      axios.get('/pinterest-app/wall/getwallinfo/' + userId )
      .then( response => {
        dispatch({
          type:           UPDATE_WALL,
          wallImageList:  response.data.user.imageList,
          wallUsername:   response.data.user.twitterHandle
        })
      })
    }
  }
}