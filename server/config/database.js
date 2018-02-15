module.exports = {
    // start a mongo instance with `docker run --name lemmings-mongo -p 27017:27017 -d mongo`
    //'url' : 'mongodb://localhost/lemmings'
    // or connect with docker-compose
    'url' : 'mongodb://mongo/lemmings'
    // or set up authentication
    //'url' : 'mongodb://lemming:SuperSecret12345@localhost:27017/lemmings'
};
