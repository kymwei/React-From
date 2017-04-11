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

class MyOutputChange extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                 <h3>Selected</h3>
                 <p>Id: <b>{this.props.item.id}</b> Value: <b>{this.props.item.name}</b></p>
            </div>
        )
    }

}

class MakeModelDropdowns extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] ,value: {}, showOutput: false};
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        fetch(this.props.makeapi)
            .then(response => response.json())
            .then(json => this.setState({ data: json }));
    }

    changeHandler(event) {
        this.state.data.forEach(function(item) {
            if (parseInt(item.id) === parseInt(event.target.value)) {
                this.setState({ showOutput: item.id > 0 });
                this.setState({ value : item});
            }
        }.bind(this));
    }
    render() {

        return (
            <form >
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
