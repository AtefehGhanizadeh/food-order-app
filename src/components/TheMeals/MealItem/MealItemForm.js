import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import { useRef, useState } from 'react'

function MealItemForm(props){

    const[amountIsValid,setAmountIsValid]=useState(true)
    const amountInputRef=useRef()

    function submitHandler(event){
        event.preventDefault()
        const enteredAmount=amountInputRef.current.value
        const enteredAmountNumber=+enteredAmount
        if(enteredAmount.trim().length===0||enteredAmountNumber<1||enteredAmountNumber>5){
            setAmountIsValid(false)
            return
        }
        props.onAddToCart(enteredAmountNumber)
    }
    return<form className={classes.form} onSubmit={submitHandler}>
        <Input 
            ref={amountInputRef}
            label={"Amount"} 
            input={{id:'Amount',
            typ:'number',
            min:'1',
            max:'%',
            step:'1',
            defaultValue:'1'}}
            />
        <button className={classes.form}>+ Add</button>
        {!amountIsValid&&<p>Please enter a valid amount (1-5)</p>}
    </form>
}


export default MealItemForm