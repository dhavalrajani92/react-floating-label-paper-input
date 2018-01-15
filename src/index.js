import "babel-polyfill";
import React, { Component } from "react";
import Immutable from "immutable";
import InputMask from 'react-input-mask';
import "./style.scss";
class FloatingLabelInput extends Component {
    constructor(props) {
        super(props);
        this.inputs = {};
        var inputClasses = props.inputClasses ? props.inputClasses : [];
        inputClasses.push('mat-input', 'form-control');
        this.state = {
            classes: ['paper-input','floating-label',"floating-label-active"],
            inputClasses:inputClasses,
            placeholder: ""
        }

        this.handleOnFocus = this.handleOnFocus.bind(this);
        this.handleOnFocusOut = this.handleOnFocusOut.bind(this);
    }
    componentWillUpdate(nextProps){
        var initialState = Immutable.fromJS(this.state);
        if(nextProps.isValid === false && this.state.classes.indexOf("has-error") === -1){

            var data = initialState.updateIn(['classes'], arr => arr.push("has-error"));
            this.setState({
                classes: data.toObject().classes.toArray()
            });
        }else if(nextProps.isValid === true && this.state.classes.indexOf("has-error") !== -1){
            var data =  initialState.toObject().classes.toArray().filter(o =>  o!== 'has-error');
            var newClasses = data ;
            this.setState({
                classes: newClasses
            });
        }

    }
    componentWillMount(){
        var initialState = Immutable.fromJS(this.state);
        if(this.state.classes.indexOf("floating-label-completed") === -1 && ((this.props.defaultValue && this.props.defaultValue != "")  || (this.props.value && this.props.value != ""))){
            var data = initialState.updateIn(['classes'], arr => arr.push("floating-label-completed"));
            this.setState({
                classes: data.toObject().classes.toArray()
            });
        }
    }
    handleOnFocusOut(e){
        e.preventDefault();
        const initialState = Immutable.fromJS(this.state);
        if(this.state.classes.indexOf("floating-label-completed") !== -1 && this.inputs.value == ""){
            var data =  initialState.toObject().classes.toArray().filter(o =>  o!== 'floating-label-completed');
            var newClasses = data;
            this.setState({
                classes: newClasses,
                placeholder: ""
            });
        }else{
            this.setState({
                placeholder: ""
            })
        }
        if(this.props.onBlur){
            this.props.onBlur();
        }
    }
    handleOnFocus(e){
        e.preventDefault();
        const initialState = Immutable.fromJS(this.state);
        if(this.state.classes.indexOf("floating-label-completed") === -1){
            var data = initialState.updateIn(['classes'], arr => arr.push("floating-label-completed"));
            var newClasses = data.toObject().classes.toArray();
            this.setState({
                classes: newClasses,
                placeholder: this.props.placeholder
            });
        }else {
            this.setState({
                placeholder: this.props.placeholder
            })
        }
        if(this.props.onFocus){
            this.props.onFocus();
        }
    }
    render() {
        var { labelName,isValid,errorMessage,placeholder,inputMaskType,type,...props } = this.props;
        return (
            <div className={this.state.classes.join(" ")}>
                <label className="control-label" htmlFor="default">{labelName ? labelName : "Default Label"}</label>
                {this.props.type && this.props.type === "inputMask" ? <InputMask type={inputMaskType || "text"} placeholder={this.state.placeholder} {...props} onFocus={this.handleOnFocus} onBlur={this.handleOnFocusOut} ref={(input)=>{this.inputs = input}} className={this.state.inputClasses.join(" ")}/> : <input id={"default"} {...props} onFocus={this.handleOnFocus} onBlur={this.handleOnFocusOut} ref={(input)=>{this.inputs = input}} className={this.state.inputClasses.join(" ")} type={this.props.type || "text"} />}

                {this.state.classes.indexOf("floating-label-completed") != -1 ? <span className="paper-input-bar"></span> : ""}
                {isValid === false ? <span className={"has-error-text"}>{errorMessage}</span>: null}
            </div>
        )

    }
}

export default FloatingLabelInput;