'use client'
import React,{useState,useEffect} from "react";
import './page.css'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useRouter } from "next/navigation";
const Home = () => {
  // router
  const router = useRouter();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState('');
  const [password,setPassword] = useState('');


 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/login"); // Replace with your actual API route
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log(jsonData[0].user);
        
        
        setData(jsonData);
        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(data);
    

    await data.map((item) => {
      // console.log(item.user);
      // console.log(item.password);
      // console.log('this is '+user);
      
     
      if(user === item.user && password === item.password){
        // localStorage.setItem("user", item.user);
        localStorage.setItem("password", item.password);
        router.push("/customers")
      }
      else{
        if(user === '' || password === ''){
          alert("please enter user and password")
        }
        else{
          alert('user or password is incorrect')
        }
        
      }

    })
    
    
    
  };
  
  return <div className="home__page">

    
   
    <div className="login-form">
        <h2>Login</h2>
        <form>
            <div className="input-group">
                <PersonIcon className="material__icon"/>
                <input type="text" placeholder="Username" onChange={e=>setUser(e.target.value)} value={user}  required/>
            </div>
            <div className="input-group">
                <LockIcon className="material__icon"/>
                <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} value={password} required/>
            </div>
            <button type="submit" onClick={handleLogin}>Login</button>
        </form>
    </div>
	
  </div>;
};

export default Home;
