# react-floating-label-paper-input

## Install
```npm install react-floating-label-paper-input --save```

## Demo
Coming Soon

### Properties

### `type` : `string`
Type of input you want currently its supporting three types

1) text(Default value)
2) inputMask(Using react-input-mask npm package for that but if you want to pass type of inputMask then pass as a props `inputMaskType` eg. tel, number etc.)

### `labelName` : `string`

Floating label like placeholder

### `isValid` : `boolean`

If you want to display error message pass as `isValid={false}`

### `errorMessage` : `string`

Error message which you want to display

### `options` : `array`

If you are passing `type="select"` then this options need to pass a props to display options in select box


## Example `type=text` `type=tel` etc.

```
import React,{Component} from "react"
import FloatingLabelInput from "react-floating-label-paper-input"; 

class FloatingLabelTextExample extends Component{
    constructor(props){
        super(props);
        this.handleForm = this.handleForm.bind(this);
        this.isValid = this.isValid.bind(this);
        this.getValidationMessages = this.getValidationMessages.bind(this);
        this.state = {
            formData:{}
        }
    }
    isValid(key){
        return false;
    }
    getValidationMessages(key){
        return `${key} is require`;
    }
    handleForm(key,value){
        this.setState({
          formData: Object.assign({}, this.state.formData, { [key]: value }),
        });
    }
    render(){
        return(
            <FloatingLabelInput type={"text"} labelName={"firstname"} onChange={(e) => {e.preventDefault();this.handleForm("firstname", e.currentTarget.value)}} name={"firstname"} value={this.state.formData.firstname ? this.state.formData.firstname : ""} isValid={this.isValid('firstname')} errorMessage={this.getValidationMessages('firstname')} />
        )
    }
}
export default FloatingLabelTextExample;
```

## Example `type=inputMask`
#### For more info about props using inputMask [InputMask](https://github.com/sanniassin/react-input-mask)
```
import React,{Component} from "react"
import FloatingLabelInput from "react-floating-label-paper-input"; 

class FloatingLabelInputMaskExample extends Component{
    constructor(props){
        super(props);
        this.handleForm = this.handleForm.bind(this);
        this.isValid = this.isValid.bind(this);
        this.getValidationMessages = this.getValidationMessages.bind(this);
        this.state = {
            formData:{}
        }
    }
    isValid(key){
        return false;
    }
    getValidationMessages(key){
        return `${key} is require`;
    }
    handleForm(key,value){
        this.setState({
          formData: Object.assign({}, this.state.formData, { [key]: value }),
        });
    }
    render(){
        return(
            <FloatingLabelInput type={"inputMask"} maskChar={" "} mask={99-99-9999} labelName={"Date of birth"} placeHolder={"MM-DD-YYYYY"} onChange={(e) => {e.preventDefault();this.handleForm("dob", e.currentTarget.value)}} name={"dob"} value={this.state.formData.dob ? this.state.formData.dob : ""} isValid={this.isValid('dob')} errorMessage={this.getValidationMessages('dob')} />
        )
    }
}
export default FloatingLabelInputMaskExample;
```
## Example `type=select`
```
import React,{Component} from "react"
import FloatingLabelInput from "react-floating-label-paper-input"; 

class FloatingLabelInputMaskExample extends Component{
    constructor(props){
        super(props);
        this.handleForm = this.handleForm.bind(this);
        this.isValid = this.isValid.bind(this);
        this.getValidationMessages = this.getValidationMessages.bind(this);
        this.state = {
            formData:{}
        }
    }
    isValid(key){
        return false;
    }
    getValidationMessages(key){
        return `${key} is require`;
    }
    handleForm(key,value){
        this.setState({
          formData: Object.assign({}, this.state.formData, { [key]: value }),
        });
    }
    render(){
        var options = [
            {label: "Gujarat",value: "GJ"},
            {label: "Maharastra",value: "MH"},
            {label: "Karnataka",value: "KA"},
            {label: "Telangana",value: "TS"},
            {label: "Andhra Pradesh",value: "AP"},
        ]
        return (
            <FloatingLabelInput type={"select"} options={options} labelName={"State"} onChange={(e) => {e.preventDefault();this.handleForm("state", e.currentTarget.value)}} name={"state"} value={this.state.formData.state ? this.state.formData.state : ""} isValid={this.isValid('state')} errorMessage={this.getValidationMessages('state')} />
        )
    }
}
export default FloatingLabelInputMaskExample;
```

