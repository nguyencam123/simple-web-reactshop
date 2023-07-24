const CartItem = ({ item }) => {
    return (
        <div>
            <span>{item.name} - Số lượng: {item.quantity} - Giá: {item.price}</span>
        </div>
    );
};
export default CartItem