/* eslint-disable */
import React from 'react';

const DoneItems  = ({items}) => {
    
    const itemList = items.length ? (
        
        items.map(it =>{
            return(
            <div className="collection-item" key={it._id}>
                 <input type="checkbox" className="filled-in" defaultChecked="checked" />
                <span className="done">{it.content}</span>
            </div>
            )
        })
    ) :(
        <div className="collection-item" >
            <span>Empty</span>
        </div>
    );
    
    return (
        <div className="">
            <p className="center">Your completed items:</p>
            <div className="collection">
                {itemList}
            </div>
        </div>
    )
}

export default DoneItems;