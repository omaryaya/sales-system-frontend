import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <section>
                <h1>JETBRAINS</h1>

                <div className="navContent">
                    <div className="navLinks">
                        <Link to="/">Products</Link>
                        <Link to="/orders">Orders</Link>
                    </div>
                </div>
            </section>

        </nav>
    );
};

export default Navbar;