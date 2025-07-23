import "./nav.css"



function Nav({ user, setID, wishlistCount = 0 }) {
    console.log(user,"dvjfkvnfknj");
    
    return(
        <nav>
            <div className="sub-nav nav-sec1">
                <input type="text" placeholder="Search anything" />
                <button>Seacrh</button>
            </div>
            <div className="sub-nav nav-sec2">
                <img src="https://cdn-icons-png.flaticon.com/128/3870/3870922.png" className="nav-icon" alt="" />
                <span className="count">2</span>
                <span>sign in</span>
                <img src="https://cdn-icons-png.flaticon.com/128/4296/4296929.png" className="nav-icon" alt="" />
                <span className="count">5</span>
                <span>cart</span>
                {user?(
                    <span>hello {user}</span>
                    ):(
                    <></>
                    )}
            </div>
        </nav>
    )
}
export default Nav