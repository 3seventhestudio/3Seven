import "./TrustStrip.css";

import Container from "../../common/Container/Container";

import TrustItem from "./TrustItem";
import trustItems from "../../../data/home/trustItems";


function TrustStrip(){

    return(

<section className="trust-strip">

<Container>

<div className="trust-grid">

{trustItems.map((item)=>

<TrustItem key={item.title} {...item}/>

)}

</div>

</Container>

</section>

    )

}

export default TrustStrip;