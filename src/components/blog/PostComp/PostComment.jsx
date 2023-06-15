import React from 'react';
import { Form } from "react-bootstrap";
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import "./Post.css";

const PostComment = () => {
    const array = [1, 2, 3];
    return (
        <div style={{border:'1px solid white',padding:'5px',boxShadow:'1px 1px #FA7C26', backgroundColor:'white'}} className="w-100 my-4 pt-4 pb-5 px-3 comment-main">
            <section>
                <div className="d-flex justify-content-between">
                    
                    <section>
                        
                       <h1> Disclosure</h1>
                       <span style={{fontSize:'24px', fontFamily:'Roboto', lineHeight:'25.7px'}}>
                         I may receive affiliate compensation when you click on links and make a purchase, 
                        at no extra cost to you. For more details please refer to our <span style={{color:"#FA7C26"}}>Privacy Policy </span> as well as our <span style={{color:"#FA7C26"}}>Terms and Conditions</span>.
                        </span>
                      
                    </section>
                </div>
                
                
            </section>

         
        </div>
    )
}

export default PostComment;
