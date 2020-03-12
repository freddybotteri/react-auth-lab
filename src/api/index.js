
export const login = async(email,password) => {	
	try{
		const resp = await fetch(`http://localhost:3001/signin/${email}/${password}`);
		return resp.json();
	}catch(error){
		throw error;
	}
};
export const  getUsuarios = async(token) => {	
	try{

		const resp = await fetch(`http://localhost:3001/usuarios`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'x-access-token': token
			}
		});
		return resp.json();
	}catch(error){
		throw error;
	}
};

export const register = async(name,email,password) => {	
	try{
		console.log(name,email,password);
		const resp = await fetch(`http://localhost:3001/add/auth`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({name:name,email:email,password:password})
		});
		return resp.json();
	}catch(error){
		throw error;
	}
};