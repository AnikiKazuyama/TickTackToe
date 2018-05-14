import { URL } from '../../constants/Api';
import axios from 'axios';
import qs from 'qs';

class ApiService {
    makeRequest(method, url, data) {
        switch(method){
           case('GET'):
            return axios.get(`${ URL }/${ url }`, { withCredentials: true })
            .then(function (response) {
                    return response.data;
            })
            .catch(function (error) {
                throw(error);
            });
           case('POST'):
            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(data),
                url: `${ URL }/${ url }`,
                withCredentials: true
            };

            return axios(options)
            .then(response => {
                return response.data;
            }).catch(function (error) {
                throw(error);
            });
        }
    }

    loginRequest = async (data) => {
        return await this.makeRequest('POST', 'api/login', data);
    }

    registrationRequest = async (data) => {
        return await this.makeRequest('POST', 'api/users/create', data );
    }

    logoutRequest = async () => {
        return await this.makeRequest('GET', 'api/logout' );
    }

    enterRoom = async () => {
        return await this.makeRequest('GET', 'api/rooms/enter');
    }

    leaveRoom = async () => {
        return await this.makeRequest('GET', 'api/rooms/leave');
    }
    
    getRoomState = async () => {
        return await this.makeRequest('GET', 'api/rooms/state');
    }

    getCurrentUser = async () => {
        return await this.makeRequest('GET', 'api/users/getCurrent');
    }

}

export default new ApiService();