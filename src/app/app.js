import React from "react";
import ReactDOM from "react-dom";
const root = document.getElementById("root");


class MySelectOptionsChange extends React.Component {
    render () {
        return (
            <option value={this.props.data.id}>{this.props.data.name}</option>
        )
    }
}

class MySelectChange extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        var mySelectOptions = function(result) {
            return <MySelectOptionsChange
                key={result.id}
                data={result} />
        };
        return (
            <select
                className="form-control">
                {this.props.data.map(mySelectOptions)}
            </select>
        );
    }

}

class MakeModelDropdowns extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(this.props.makeapi)
            .then(response => response.json())
            .then(json => this.setState({ data: json }));
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite La Croix flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />

                <div onChange={this.changeHandler}>
                    {
                        this.state.data.length == 0
                            ? 'Loading data...'
                            :  <MySelectChange data={this.state.data}  />

                    }
                    { this.state.showOutput ? <MyOutputChange item={this.state.value}/> : null }
                </div>


            </form>
        );
    }
}

ReactDOM.render(
    <MakeModelDropdowns makeapi="https://api.myjson.com/bins/9fisb"/>,
root);
