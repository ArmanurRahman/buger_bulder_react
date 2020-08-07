import React, { Component} from 'react';
import Classes from './Modal.module.css';
import Aux from '../../../hoc/Auxalary'
import BackDrop from '../BackDrop/BackDrop'


class Modal extends Component{

    shouldComponentUpdate( nextProp, nextState){
        return nextProp.show !== this.props.show
    }
    render(){
        return(    
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.modalRemove}/>
                <div className={Classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>   
            </Aux>     
        );
    }

}
export default Modal;