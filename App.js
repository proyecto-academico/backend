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
//const port = 3000;
app.use(express.urlencoded)
async function main(){

    const post = await prisma.post.create({
    data: []

    })
  
}
main()
    .catch ((e)=> {
        throw(e)
    } )
    .finally(async ()=> {
        await prisma.$disconnect()

    })
    app.get('/', function (req, res) {
        res.send('Got a POST request');
      });