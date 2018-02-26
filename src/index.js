import React from 'react';
import ReactDOM from 'react-dom';

function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

class ReactPuzzle extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    getInitialState() {
        // let size = prompt('size');
        let size =  3;
        let list = [];
        let alertwin = '';
        for (let i = 1; i<=size*size; i++) {
            list.push(i);

        }
        shuffle(list);

        if(this.state && this.state.input){
            size = Number(this.state.input);
        }else{
            size = 3
        }

        return {
            size: size,
            list: list,
            currentIndex: null,
            targetIndex: null,
            alertwin: alertwin,
        }
    }

    delta() {
        this.setState(this.getInitialState());
        }



    dragStart(index){
        this.setState({'currentIndex': index});
    }

    dragOver(index){
        this.setState({'targetIndex': index});
    }

    dragEnd(){
        if (typeof this.state.currentIndex === 'number' && typeof this.state.targetIndex === 'number') {
            const list = this.state.list;
            let buff = list[this.state.currentIndex];
            list[this.state.currentIndex] = list[this.state.inputValue];
            list[this.state.targetIndex] = buff;
            this.setState({
                'list': list,
                'targetIndex': null,
                'currentIndex': null
            });
            this.checkWin();
        }
    }

    checkWin(){
        let win = true;
        this.state.list.forEach((value, index) => {
            if (value !== index+1){
                win = false;
            }
        });
        if (win) {
            this.setState({
                'alertwin': 'ВЫ победили'
            });
        }
    }

    // updateInputValue (event, list) {
    //     let abuff = list[this.state.size];
    //     list[this.state.size] = list[this.state.inputValue];
    //     list[this.state.size] = abuff;
    //     console.log(this.state.list);
    //     this.setState({
    //         'list': list,
    //         'size': this.state.inputValue,
    //         'inputValue': ''
    //     });
    //     event.preventDefault();
    // };
    //
    handleChange(event) {
        this.setState({input: event.target.value});
    }





    render() {
        let items = [];
        this.state.list.forEach((value, index) => {
           items.push(
               <li draggable="true"
                   key={index}
                   onDragStart={()=> this.dragStart(index)}
                   onDragEnd={(event)=> this.dragEnd(event)}
                   onDragOver={()=> this.dragOver(index)}

               >{value}</li>
           )
        });
        return(
            <div>
                Введите размер
                   <input type="text"  onChange={this.handleChange}/>
                <button onClick={this.delta}>
                    refresh
                </button>
                <h2>Size: {this.state.size} </h2>
                <ul>
                    {
                        items
                    }
                </ul>
                <h2>{this.state.alertwin}</h2>
            </div>
        );
    }
}

ReactDOM.render(
<ReactPuzzle />,
    document.getElementById('root')
);