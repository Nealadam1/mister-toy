import { utilService } from "../services/util.service";

export function ToyPreview({toy}){
 return <article>
    <h4>{toy.name}</h4>
    <p>Price: {toy.price}</p>
    <p>Stock: {toy.inStock? 'Available':'Out of stock'}</p>
   
 </article>
}