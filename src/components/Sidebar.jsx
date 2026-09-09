function Sidebar({ activePage, onPageChange }) {
    return (
        <aside className="sidebar">

            <div className="profile">
                <div className="avatar">A</div>
                <div className="profile-name">Admin</div>
                <div className="profile-role">Super User</div>
            </div>

            <div className="menu">

                <div
                    className={`menu-item ${
                        activePage === "about" ? "active-menu" : ""
                    }`}
                    onClick={() => onPageChange("about")}
                >
                    <span>ℹ</span>
                    About
                </div>

                <div
                    className={`menu-item ${
                        activePage === "products" ? "active-menu" : ""
                    }`}
                    onClick={() => onPageChange("products")}
                >
                    <span>▦</span>
                    Products
                </div>

            </div>
        </aside>
    );
}

export default Sidebar;