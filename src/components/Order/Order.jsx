import React from 'react'
import Classes from './Order.module.css'
const order = (props) => {
    const ingrediant = []
    for(let ingrediantName in props.ingrediants){
        ingrediant.push({name: ingrediantName,
                        amount:  props.ingrediants[ingrediantName]
        })
    }

    const ingrediantOutput = ingrediant.map(igkey => {
        return <span key={igkey.name}
            style={{
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}>
            {igkey.name} ({igkey.amount})
        </span>
    })
    return(
        <div className={Classes.Order}>
            ingrediant: {ingrediantOutput}
            <p>price $ {props.price}</p>
        </div>
    )
}

export default order