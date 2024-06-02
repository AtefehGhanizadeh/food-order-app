import React,{useContext, useState } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'


function Cart(props){
    const[orderBtnClicked,setOrderBtnClicked]=useState(false)
    const[isSubmitting,setIsSubmitting]=useState(false)
    const[didSubmit,setDidSubmit]=useState(false)

    const cartCtx=useContext(CartContext)

    const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems=cartCtx.items.length>0

    function cartItemRemoveHandler(id){
        cartCtx.removeItem(id)
    }

    function cartItemAddHandler(item){
        cartCtx.addItem({...item,amount:1})

    }

    function orderHandler(){
        setOrderBtnClicked(true)
    }

    async function submitOrderHandler(userData){
            setIsSubmitting(true)
            await fetch("http://localhost:3000/orders", {
            method: "POST",
            body: JSON.stringify({
                "user":userData,
                "orderedItems":cartCtx.items
            }),
            headers:{"Content-Type": "application/json"}
            })  
            setIsSubmitting(false)
            setDidSubmit(true)
            cartCtx.clearCart()

    }


    const cartItems=<ul className={classes['cart-items']}>{cartCtx.items.map(item=><CartItem name={item.name} price={item.price} amount={item.amount} key={item.id} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}/>)}</ul>
    const modalAction=<div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
    {hasItems&&<button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent=<React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {orderBtnClicked&&<Checkout onCancelBtn={props.onHideCart} onConfirm={submitOrderHandler}/>}
        {!orderBtnClicked&&modalAction}
    </React.Fragment>

    const isSubmittingModalContent=<React.Fragment>
    <p>Sending order data...</p>
    <div className={classes.actions}>
            <button className={classes.button} onClick={props.onHideCart}>Close</button>
    </div>
    </React.Fragment>
    const didSubmitModalContent=<React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onHideCart}>Close</button>
        </div>
    </React.Fragment>

    return<Modal onClick={props.onHideCart}>
        {!isSubmitting&&!didSubmit&&cartModalContent}
        {isSubmitting&&isSubmittingModalContent}
        {!isSubmitting&&didSubmit&&didSubmitModalContent}
    </Modal>
}

export default Cart