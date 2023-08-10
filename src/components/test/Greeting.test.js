import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import userEvent from "@testing-library/user-event";
describe('Greeting Component',()=>{
    test('renders Hello World as a test ',()=>{
        //Arrange
         render(<Greeting/>);
     
         //Act
         //..nothing
     
         //Assert
     
         const helloWorldElement = screen.getByText('Hello World');
         expect(helloWorldElement).toBeInTheDocument();
     
     });
     test('render good to see you if the button was not clicked',()=>{
        render(<Greeting/>)
        const OutputElement = screen.getByText('good to see you',{exact:false});
        expect(OutputElement).toBeInTheDocument();
     })
    //  test('render Changed if the button was clicked',()=>{
    //     render(<Greeting/>)
    //     const buttonElement = screen.getByRole('button');
    //     userEvent.click(buttonElement)
    //     const OutputButton = screen.getByText('changed!');
    //     expect(OutputButton).toBeInTheDocument();
    //  })
})
