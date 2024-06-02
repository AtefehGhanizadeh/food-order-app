import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

function AvailableMeals(){

    const[meals,setMeals]=useState([]) 
    const[isLoading,setIsLoading]=useState(true)
    const[httpError,setHttpError]=useState()

    useEffect(()=>{

      const fetchMeals = async () => {
      const response = await fetch(
        'http://localhost:3000/meals'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      setMeals(responseData);
      setIsLoading(false);
    };

     fetchMeals()
     .catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
      
    },[])

    if (httpError) {
      return (
        <section>
          <p>{httpError}</p>
        </section>
      );
    }

    const mealsList=meals.map(meal=><MealItem name={meal.name} desc={meal.description} price={meal.price} id={meal.id} key={meal.id}/>)

    return(
        <section className={classes.meals}>
            <Card>
                <ul>
                    {!isLoading&&mealsList}
                    {isLoading&&<p>Loading...</p>}
                </ul>
            </Card>
            
        </section>
        
    )
}

export default AvailableMeals