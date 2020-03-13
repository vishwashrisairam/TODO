import React, {Component} from 'react'; 
import './App.css';

class AddTodoItem extends Component{
    state ={
        content: ''
    }

    handleChange = (e) => {
        this.setState({
            content:e.target.value 
        });
    } 

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.content.length>0){
            this.props.add(this.state);
            this.setState({
                content:''
            });
        }
        

    } 

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit }> 
                    <div className="row">
                        <div className="input-field col s2">
                            <label>Add new Todo: </label>
                        </div>
                        <div className="input-field col s9">
                            <input type="text" onChange = {this.handleChange} value = {this.state.content}/>
                        </div>
                        <div className="input-field col s1">
                            <button className="btn waves-effect waves-light" type="submit" name="action">
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddTodoItem;