import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReactSixteenAdapter from 'react'

Enzyme.configure({adapter:new Adapter()})

describe("App",()=>{
    test("render test",()=>{
      const wrapper = shallow(<App/>)
      const data = [
        { label: 'CRM', value: 1.3 },
        { label: 'API', value: 1 }]
      wrapper.setState({planets:data})
      expect(wrapper.exists()).toBe(true)
    });
});


it('should render correctly with no props', () => {
  const component = shallow(<App/>);
  expect(component).toMatchSnapshot();
});

test("prev test", () =>{
  const component = new App()
   component.prevPress()
})

test("next test", () =>{
  const component = new App()
   component.nextPress()
})

test("test class name",()=>{
  const wrapper = shallow(<App/>);
  expect(wrapper.find('.content')).toBeDefined();
})

it("load undefined data test", async function() {
  const app = new App()
  const response = await app.loadData()
  expect(response).toBeUndefined
});

it("load defined data test", async () => {
  const app = new App()
   const response =  await app.loadData()
    expect(response).toBeDefined()
  
});



  
