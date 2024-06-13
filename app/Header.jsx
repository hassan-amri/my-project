import Link from "next/link";
import React from "react";
import './Header.css'

function Header() {
    function handleLogOut() {
        localStorage.removeItem("password");
        
      }
  return <div>
    <header>
        <h2>HikmaTex</h2>
        <ul>
            {/* <li><Link href="/Home">Home</Link></li> */}
            <li><Link className="link-title" href="/customers">Customers</Link></li>
            <li><Link className="link-title" href="/about">About</Link></li>
            <li><Link className="link-title" href="https://wa.me/212690978812" target="_blank">Contact</Link></li>
            
          
        </ul>
        <Link className="logout__link" href="/" onClick={()=>handleLogOut()}>Log out</Link>

    </header>

  </div>;
}

export default Header;
