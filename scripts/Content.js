import * as React from 'react';

import {    Button  } from './Button';
import {    Socket  } from './Socket';

export class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'numbers': [],
            'my name': 'I don\'t have a name yet',
            'all users': []
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
        Socket.on('list of all users', (data) => {
            console.log('list of all users', data);
            this.setState({
                'all users': data['users']
            })
        })
    }

    render() {
        let numbers = this.state.numbers.map(
            (n, index) => <li className="number-item" key={index}>{n}</li>
        );
        var all_users = [];
        for(var u of this.state['all users']){
            var item = <li key={u}>{u}</li>;
            all_users.push(item);
        }
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
                <h2>My name: {this.state['my name']}</h2>
                <h3>All users: </h3>
                <ul>{all_users}</ul>
                <Button />
                <ul>{numbers}</ul>
                 
            </div>
        );
    }
}
