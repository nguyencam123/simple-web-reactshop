import { Link } from "react-router-dom";

const HeaderAdmin = () => {
    return (
        <>
            <Link to={"/admin/viewproduct"} className="textnabar">
                Quản lý sản phẩm
            </Link><br /><br />
            <Link to={"/admin/viewcategory"} className="textnabar">
                Quản lý loại sản phẩm
            </Link>
        </>
    )
}
export default HeaderAdmin