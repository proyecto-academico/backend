//const {Prisma_Client} = require('@prisma/client')
//const prisma = new Prisma_Client
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//import Prisma from ('@prisma/client')
//const { PrismaClient } = Prisma
//const Prisma1 = new {PrismaClient}
import  express from 'express'
const app = express()
//const hostname = '10.120.2.114';
const port = 3000;
//app.use(express.urlencoded)
app.get('/welcome', function (req, res) {
    res.send();
});;
async function main(){

    const post = await prisma.alumno.createMany({
    data: [
        {Dni_Alumno: '462454212', Nombre: 'Lucas', Apellido:'Abdhala',Mail:'porraasee@gmail.com',contrasena:"Conweeatra1521"},
        {Dni_Alumno: '46254454212', Nombre: 'Lucas', Apellido:'Abdhala',Mail:'porras@gmail.com',contrasena:"Coeantra1521"},
        {Dni_Alumno: '46246554212', Nombre: 'Lucas', Apellido:'Abdhala',Mail:'porra@gmail.com',contrasena:"Condsatra1521"},
        {Dni_Alumno: '121234', Nombre: 'Lucas', Apellido:'Abdhala',Mail:'porraassa@gmail.com',contrasena:"Coasdntra1521"}
    ]

    })
    console.log(post)
    app.post('/',function (req,res){
      //  await.prisma.post.
    });

}
main()
    .catch ((e)=> {
        throw(e)
    } )
    .finally(async ()=> {
        await prisma.$disconnect()

    })
    app.get('/', function (req, res) {
        
        res.json()
        res.send('Got a POST request');
      });
      app.listen( port ,()=>{
        console.log('server is running at port number 3000')
    });
    
