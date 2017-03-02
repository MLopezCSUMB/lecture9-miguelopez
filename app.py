import os
import flask
import flask_socketio
import random

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

all_connected_users = {};

@app.route('/')
def hello():
    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    print 'Someone connected: ', flask.request.sid;
    name = random.randrange(100, 1000)
    print "someone's Name: " , name
    flask_socketio.emit('server generated name', {
        'name': name
    })
    all_connected_users[flask.request.sid] = name;
    print "all connected users", all_connected_users;
    socketio.emit('list of all users', {
        'users': all_connected_users.values(),
    })

@socketio.on('disconnect')
def on_disconnect():
    print 'Someone disconnected!', flask.request.sid;
    del all_connected_users[flask.request.sid];
    print "All connected users", all_connected_users;

all_mah_numbers = []

@socketio.on('new number')
def on_new_number(data):
    print "Got an event for new number with data:", data
    all_mah_numbers.append(data['number'])
    socketio.emit('all numbers', {
        'numbers': all_mah_numbers
    })

socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=int(os.getenv('PORT', 8080)),
    debug=True
)

