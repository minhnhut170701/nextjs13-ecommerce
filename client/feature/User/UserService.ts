const registerUser = async (userData: any) =>{
    const response = await fetch(`http://localhost:3003/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {revalidate: 0},
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.clone().json();
      throw new Error(error.message);
    }else{
      if(typeof window !== "undefined"){
        const clientData = await response.clone().json();
        localStorage.setItem('client', JSON.stringify(clientData))
        return response.json()
      }

      
    }
    
}

const logInUser = async (userData: any) =>{
  const response = await fetch(`http://localhost:3003/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {revalidate: 0},
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.clone().json();
      throw new Error(error.message);
    }else{
      if(typeof window !== "undefined"){
        const clientData = await response.clone().json();
        localStorage.setItem('client', JSON.stringify(clientData))
        return response.json()
      }

     
    }
}

const logout = () =>{
  if(typeof window !== "undefined"){
    localStorage.removeItem('client')
  }
  
}
export const UserService = {
  registerUser,
  logInUser,
  logout
}