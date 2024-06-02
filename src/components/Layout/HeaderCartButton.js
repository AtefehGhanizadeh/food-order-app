import { useContext, useEffect ,useState } from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

function HeaderCartButton(props){
    const cartCtx=useContext(CartContext)
    const numberrOfCartItems=cartCtx.items.reduce((curNumber,item)=>{return curNumber+item.amount},0)
    const[btnIsHighlighted,setBtnIsHighlighted]=useState(false)

    useEffect(()=>{
        if(cartCtx.items.length ===0){
            return
        }
        setBtnIsHighlighted(true)


        setTimeout(()=>{setBtnIsHighlighted(false)},300)


    },[cartCtx.items])

    const btnClasses=`${classes.button} ${btnIsHighlighted ? classes.bump:''}`

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}> 
                {numberrOfCartItems }
            </span>
        </button>
    )
}

export default HeaderCartButton