import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { sinonStubPromis } from 'sinon-stub-promise';
import { shallow, mount, render } from 'enzyme';
import MakeModelDropdowns from '../../src/app/app.js';
import axios from "axios";

describe("Test for MakeModelDropdowns component", function() {

    var sandbox;
    const promise = Promise.resolve({"data":[{"id":2,"name":"Acura"},{"id":3,"name":"Alfa Romeo"},{"id":54,"name":"Aston Martin"}]});

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });
    //test for
    it("it should contains a className", function() {
        const makeModelDropdowns = shallow(<MakeModelDropdowns makeapi="https://api.myjson.com/bins/9fisb"/>);
        expect(makeModelDropdowns.is('.text-center')).to.equal(true);
    });

    //testing HTTP request
    it('it should have MySelectChange when componentDidMount finish', () => {

        sandbox.stub(axios, 'get').callsFake(() => promise);

        const wrapper = mount(<MakeModelDropdowns />);
        return promise.then(() => {

            wrapper.update();
            //assert
            expect(wrapper.find('MySelectChange')).to.have.length(1);
            expect(wrapper.state('data')).to.have.length(3);
        });

    });
    //testing life cycle
    it('it should calls componentDidMount', () => {

        sandbox.stub(MakeModelDropdowns.prototype, 'componentDidMount');
        const wrapper = mount(<MakeModelDropdowns />);
        expect(MakeModelDropdowns.prototype.componentDidMount.calledOnce).to.equal(true);

    });

    it('it should update the checkbox when onchange', () => {


    });
});