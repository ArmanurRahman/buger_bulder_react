import React, {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxalary'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error:null
        }
        constructor(props){
            super(props)
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.state = {error:null}
                //this.setState({error:null})
                return req;
            })

            this.resInterceptors = axios.interceptors.response.use(req => req, error => {
                this.state = {error: error}
                //this.setState({error: error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.request.eject(this.resInterceptors)
        }
        errorConfirmHandler = () => {
            this.setState({error:null});
        }

        render(){
            return (
                <Aux>
                    <Modal show={this.state.error}
                            modalRemove={this.errorConfirmHandler}>
                        { this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;