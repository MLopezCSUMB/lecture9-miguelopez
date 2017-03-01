import os
import flask
import flask_socketio
import random

app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)

@app.route('/')
def hello():
    return flask.render_template('index.html')

@socketio.on('connect')
def on_connect():
    print 'Someone connected!'
    name = random.randrange(100, 1000)
    print "someone's Name: " , name

@socketio.on('disconnect')
def on_disconnect():
    print 'Someone disconnected!'

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

