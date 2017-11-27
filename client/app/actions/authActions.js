import axios from 'axios';

export const CHECK_AUTH = 'CHECK_AUTH';
export const LOG_OUT = 'LOG_OUT';
export const SET_DONE = 'SET_DONE';
export const SET_NOT_DONE = 'SET_NOT_DONE';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const UPDATE_IMAGE_LIST = 'UPDATE_IMAGE_LIST';
export const UPDATE_RECENT_IMAGES = 'UPDATE_RECENT_IMAGES';

export const authActions = {
  checkAuth:   () => {
    return ( dispatch ) => {
      axios.get( '/pinterest-app/getauth' )
      .then( response => {
        const { user } = response.data
        if( !user.isAuthorized ){
          dispatch({
            type:         CHECK_AUTH,
            isAuthorized: false,
          });
        }
        else{
          dispatch({
            type: CHECK_AUTH,
            isAuthorized:     true,
            userId:           user.userId,
            userDisplayName:  user.twitterHandle,
            userImageList:    user.imageList,
            message:          '',
          });
        }
      })
      .catch( error => {
        console.log( error );
      })
    }
  },
  
  setDone: () => ({
    type: SET_DONE,
    done: true,
  }),
  
  setNotDone: () => ({
    type: SET_NOT_DONE,
    done: false,
  }),
  
  addImageToUser: ( imageUrl, imageTags ) => {
    return ( dispatch ) => {
      axios({
        method: 'POST',
        url:    '/pinterest-app/addImageToUser',
        data:{
          imageUrl:   imageUrl,
          imageTags:  imageTags,
        }
      })
      .then( ( response ) => {
        const { data } = response;
        if( data.message === 'NOT_AUTHORIZED' ){
          window.location = '/pinterest-app/';
        }
        else if ( data.message === 'ALREADY_OWNED_BY_USER' ){
          dispatch({
            type:     UPDATE_MESSAGE,
            message:  'Already Added'
          });
        }
        else if (  data.message === 'OK' ) {
          const { user } = data
          dispatch({
            type:           UPDATE_IMAGE_LIST,
            userImageList:  user.imageList,
            message:        '',
            done:           true,
          });
        }
        else{
          dispatch({
            type:     UPDATE_MESSAGE,
            message:  'Error Adding Image'
          });
        }
      })
      .catch( error => console.log( error ) );
    }
  },
  
  removeImageFromUser: ( imageId ) => {
    return ( dispatch ) => {
      axios({
        method: 'POST',
        url:    '/pinterest-app/removeimagefromuser',
        data:{
          imageId
        }
      })
      .then( ( response ) => {
        const { data } = response;
        if( data.message === 'NOT_AUTHORIZED' ){
          window.location = '/pinterest-app/';
        }
        else if (  data.message === 'OK' ) {
          const { user } = data
          /*dispatch({
            type:           UPDATE_IMAGE_LIST,
            userImageList:  user.imageList,
            message:        '',
            done:           true,
          });*/
          window.location = '/pinterest-app/dashboard';
        }
        else{
          dispatch({
            type:     UPDATE_MESSAGE,
            message:  'Error Removing Image'
          });
        }
      })
      .catch( error => console.log( error ) );
    }
  },
  
  getRecentImages: () => {
    return ( dispatch ) => {
      axios.get( '/pinterest-app/getrecentimages' )
      .then( response => {
        dispatch({
          type:         UPDATE_RECENT_IMAGES,
          recentImages: response.data
        })
      })
    }
  },
  
  logout: () => {
    return ( dispatch ) => {
      setTimeout( () => {
          axios.get( '/pinterest-app/logout' )
        .then( response => {
          dispatch({
            type: LOG_OUT,
          });
          window.location = '/pinterest-app/';
        })
        .catch( error => {
          console.log( error );
        });
      }, 1000);
    }
  }
};