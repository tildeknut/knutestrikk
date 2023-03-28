
import express from 'express'
import userRouter from './user.mjs'
import garnRouter from './garn.mjs'
import pinneRouter from './pinner.mjs'

const server = express();
const port = (process.env.PORT || 8080);

server.set('port', port);
server.use(express.static('public'));

server.use("/garn", garnRouter)
server.use("/pinne", pinneRouter)
server.use("/user", userRouter)

server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});