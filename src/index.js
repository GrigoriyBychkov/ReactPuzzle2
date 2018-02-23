import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ReactPuzzle extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    getInitialState() {
        let size = prompt('size');
        let list = [];
        for (let i = 1; i<=size*size; i++){
            list.push(i);
        }
        return {
            size: size,
            list: list
        }
    }
    render() {
        let items = [];
        this.state.list.forEach((value, index) => {
           console.log(value,index);
           items.push(
               <li draggable="true">{value}</li>
           )
        });
        return(
            <div>
                <h2>Size: {this.state.size} </h2>
                <ul>
                    {
                        items
                    }
                </ul>
            </div>
        );
    }
}

ReactDOM.render(
<ReactPuzzle />,
    document.getElementById('root')
);