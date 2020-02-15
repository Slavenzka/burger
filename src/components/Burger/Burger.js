import React from 'react'
import css from './Burger.module.scss'
import BurgerIngredient from 'components/Burger/BurgerIngredient/BurgerIngredient'

const Burger = props => {
  let transformedIgredients = Object.keys(props.ingredients)
    .map(item => {
      return [...Array(props.ingredients[item])].map((_, index) => {
        return <BurgerIngredient type={item} key={item + index} />
      })
  })
  .reduce((accumulator, currentItem) => accumulator.concat(currentItem), [])
  if (transformedIgredients.length === 0) {
    transformedIgredients = <p>Please, start adding ingredients!</p>
  }
  return (
    <div className={css.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIgredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}

export default Burger
