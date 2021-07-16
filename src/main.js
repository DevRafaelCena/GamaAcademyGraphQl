import { readFile } from 'fs'
import {createServer} from 'http'
import {resolve} from 'path'
import {parse} from 'querystring'

const server = createServer((request, response) => {
    switch (request.url) {
        case '/status':
            {
                response.writeHead(200, {'Content-Type': 'application/json'})
                response.write(JSON.stringify({status: 'OK'}))
                response.end()
                return
                break;
            }
        case '/home':
            {
                const path = resolve(__dirname,'./pages/home.html')
                readFile(path, (error, file)=>{
                    if(error){
                        response.writeHead(500, {'Content-Type': 'application/json'})
                        response.write(JSON.stringify({message:"Errror"}))
                        response.end()
                        return                   
                    }else{
                        response.writeHead(200)
                        response.write(file)
                        response.end()
                        return
                    }
                })
                break;
            }
        case '/sign-in':{
            const path = resolve(__dirname,'./pages/sign-in.html')
            readFile(path, (error, file)=>{
                if(error){
                    response.writeHead(500, {'Content-Type': 'application/json'})
                    response.write(JSON.stringify({message:"Errror"}))
                    response.end()
                    return                   
                }else{
                    response.writeHead(200)
                    response.write(file)
                    response.end()
                    return
                }
            })
            break;

        }

        case '/authenticate':
            {
                let data = ''
                request.on('data',(chunck)=>{
                    data += chunck
                })
                request.on('end',()=>{
                    const params = parse(data)
                    response.writeHead(301,{
                        Location: '/home'
                    })
                    response.end()
                })
                return
                break;
            }

        default:
            {
                response.writeHead(404, {'Content-Type': 'application/json'})
                response.write(JSON.stringify({status: 'not found'}))
                response.end()
                return
                
            }
    }
})

const PORT = process.env.PORT
    ? parseInt(process.env.PORT)
    : 5000
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1'

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}`)
})
