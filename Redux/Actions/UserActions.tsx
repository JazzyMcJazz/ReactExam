import {User} from "../../Entities/User/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_KEY} from '@env';

export const UPDATE_USER = 'UPDATE_USER';

export const login : Function = (email: string, password: string, isSignup: boolean = false) => {

    return async (dispatch: (arg0: { type: string; payload: User; }) => void) => {
        const action = isSignup ? 'signUp' : 'signInWithPassword'
        const URL = `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${API_KEY}`;

        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        const data = await response.json();

        if (response.ok) {

            const userData = await fetchUserData(data.idToken);
            console.log(userData)
            let user = {
                email: data.email,
                idToken: data.idToken,
                refreshToken: data.refreshToken,
                displayName: userData.displayName,
                imageUrl: userData.photoUrl,
            } as User;

            try {
                const json = JSON.stringify(user)
                await AsyncStorage.setItem('user', json);
            } catch (error) {}

            dispatch({
                type: UPDATE_USER,
                payload: user
            });
        }

        return data;
    }
}

export const logout : Function = () => {
    return async (dispatch: (arg0: { type: string; payload: User; }) => void) => {

        try {
            await AsyncStorage.removeItem('user');
        } catch (error) {}

        dispatch({type: UPDATE_USER, payload: {} as User});
    }
}

export const restore_auth : Function = () => {

    return async (dispatch: (arg0: { type: string; payload: User; }) => void) => {

        let user = {} as User;
        try {
            const json = await AsyncStorage.getItem('user');
            if (typeof json === "string") {
                user = await JSON.parse(json);
                const URL = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        grant_type: 'refresh_token',
                        refresh_token: user.refreshToken,
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const userData = await fetchUserData(data.id_token)
                    user = {
                        ...user,
                        idToken: data.id_token,
                        refreshToken: data.refresh_token,
                        displayName: userData.displayName,
                        imageUrl: userData.photoUrl,
                    } as User

                    await AsyncStorage.setItem('user', JSON.stringify(user));

                } else {
                    user = {} as User;
                }
            }
        } catch (error) {}

        dispatch({type: UPDATE_USER, payload: user});
    }
}

export const update_user : Function = (user: User, displayName: string, studyProgramme: string, imageUrl: string) => {
    return async (dispatch: (arg0: { type: string; payload: User; }) => void) => {

        const URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: user.idToken,
                displayName,
                returnSecureToken: true,
            })
        })

        if (response.ok) {
            const data = await response.json();
            user = {
                ...user,
                displayName: data.displayName,
                imageUrl,
                studyProgramme
            } as User

            await AsyncStorage.setItem('user', JSON.stringify(user));

        } else {
            user = {} as User;
        }
        dispatch({type: UPDATE_USER, payload: user});
    }
}

async function fetchUserData(idToken : string) {
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({idToken})
    });

    const data = await response.json();
    return data.users[0];
}
