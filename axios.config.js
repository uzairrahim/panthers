import Axios from 'axios';

Axios.interceptors.request.use(function(r){
    return r;
});

Axios.interceptors.response.use(function(r) {
	return r;
});
