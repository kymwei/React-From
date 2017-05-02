import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
require('../style/base.scss');
//require('../style/base.css');


class MySelectOptionsChange extends React.Component {
    constructor(props) {
        super(props);
    }
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
        let mySelectOptions = function(result) {
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
    _clear (event) {

        this.props.onClear();
    }
    _delete (event) {

        this.props.onDelete();
    }
    _change (item) {

        item.select = !item.select
    }
    render() {

        return (
            <div className="text-left">
                <h3><span className="selected-count">{this.props.makeList.length}</span> Selected Make</h3>
                <ul className="make-list">
                    {
                        this.props.makeList.length == 0
                            ? 'no thing selected...'
                            : this.props.makeList.map(item => (
                            <li key={item.id} onChange={this._change.bind(this, item)}>
                                <input type="checkbox"  value={item.id} />
                                <span> {item.name}</span>
                            </li>
                        ))
                    }
                </ul>
                <button className="btn btn-secondary" href="#" onClick={this._clear.bind(this)}>Clear All</button>
                <button className="btn btn-secondary" href="#" onClick={this._delete.bind(this, this.props.makeList)}>delete Selected</button>
            </div>
        )
    }
}

class MakeModelDropdowns extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [], list: [], showOutput: false};
        this._changeHandler = this._changeHandler.bind(this);
    }

    componentDidMount() {
        // fetch(this.props.makeapi)
        //     .then(response => response.json())
        //     .then(json => this.setState({ data: json }));
        let state = this;
        axios.get(this.props.makeapi)
            .then(function (response) {
                state.setState({data: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    _changeHandler(event) {
        this.state.data.forEach(function(item) {
            if (parseInt(item.id) === parseInt(event.target.value)) {
                this.setState({showOutput: !!item.id});
                const newList = this.state.list.concat([item]);

                // const uniqueList = newList.filter((val, id, array) => {
                //     console.log(array.indexOf(val), id)
                //     return array.indexOf(val) == id;
                // });
                const uniqueList = newList.filter((val,id,array) => array.indexOf(val) == id);
                this.setState({list: uniqueList});

            }
        }.bind(this));

    }
    _onClear (data) {
        this.setState({ list: [], showOutput: false })
    }
    _onDelete (makeList) {

        var newList = this.state.list.filter(item => !item.select)
        this.setState({ list: newList})
    }
    render() {


        return (
            <div className="text-center">
                <h1>Select Your Favorite Make</h1>
                <div  className={this.state.style} onChange={this._changeHandler}>
                    {
                        this.state.data.length == 0
                            ? 'Loading data...'
                            :  <MySelectChange data={this.state.data} />
                    }

                </div>
                {this.state.showOutput && <MyOutputChange makeList={this.state.list} onClear={this._onClear.bind(this)} onDelete={this._onDelete.bind(this)}/>

                }


            </div>
        );
    }
}

export default MakeModelDropdowns;