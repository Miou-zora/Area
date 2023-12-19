import React from 'react'
import axios from 'axios';
import { useStore } from '../../hooks/useStore.ts';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function GoogleButton() {

    const setAuthData = useStore((state: any) => state.setAuthData)

  return (
    <div>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <GoogleLogin

              useOneTap

              onSuccess={async credentialResponse => {

                const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/auth/loginService', {
                  token: credentialResponse.credential
                });
                const data = response.data;
                localStorage.setItem('authData', JSON.stringify(data))

                setAuthData(data)
              }}

              onError={() => {
                console.log('Login Failed');
              }}
            />
        </GoogleOAuthProvider>
    </div>
  )
}
