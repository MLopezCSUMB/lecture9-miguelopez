import * as React from 'react';

import {    Button  } from './Button';
import {    Socket  } from './Socket';

export class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'numbers': [],
            'my name': 'I don\'t have a name yet'
        };
    }

    componentDidMount() {
        Socket.on('all numbers', (data) => {
            this.setState({
                'numbers': data['numbers']
            });
        })
        Socket.on('server generated name', (data) => {
            console.log('Got a new name from server: ', data);
            this.setState({
                'my name': data['name'],
            })
        });
    }

    render() {
        let numbers = this.state.numbers.map(
            (n, index) => <li className="number-item" key={index}>{n}</li>
        );
        return (
            <div>
                <h1 className="heading">Random numbers so far!</h1>
                <div 
                    className="fb-login-button"
                    data-max-rows="1" 
                    data-size="medium" 
                    data-show-faces="false" 
                    data-auto-logout-link="true">  
                </div>
                <Button />
                <ul>{numbers}</ul>
                 
            </div>
        );
    }
}
