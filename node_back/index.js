//Imports Elements
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from 'body-parser';
const prisma = new PrismaClient();
import crypto from "crypto";
import express, { json, query } from "express";


//declaring express
const app = express();


//route
const port = 3070;


//uses
app.use(
    cors({
        origin: "*",
    })
);
app.use(cookieParser());


app.use(bodyParser.json());
app.use(
    session({
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: false,
        
    })
);



//setting port
app.listen(port, () => {
    console.log("server is running at port number " + port);
});

app.post("/test", async function (req, res) {

    //check session details
    console.log(req.body);

    if (req.body["pwd"] != undefined && req.body["user"] != undefined) {
        const query = await prisma.profesor.findFirst({
            select:{
                DNI_Profesor
            },
            where: {
                AND: {
                    Mail: req.body["user"],
                    Contrasena: crypto.createHash('sha256', req.body["pwd"]).update(req.body["pwd"]).digest('hex'),
                }
            },
        });
        if (query !=null) {
            res.json({"loggedin":true,"name":query["DNI_Profesor"],"type":"Profesor"});
            
        }
        else{
            const al = await prisma.profesor.findFirst({
                where: {
                    Mail: req.body["user"],
                    Contrasena: crypto.createHash('sha256', req.body["pwd"]).update(req.body["pwd"]).digest('hex'),
                },
            })
            if (al != null){
                res.json({"loggedin":true,"name":query["DNI_Profesor"],"type":"Profesor"});
                res.cookie("Details_Name", randomNumber, { maxAge: 900000, httpOnly: true });
            }
            else{
                res.json({"loggedin":false})
            }
        }
        
       
        




    }
    else {
        res.send({"logeedin":false})
    }
});


app.get("/login", async function (req, res) {
    if (req.body["pwd"] != undefined && req.body["user"] != undefined) {
        const query = await prisma.profesor.findFirst({
            where: {
                Mail: req.body["user"],
                Contrasena: crypto.createHash('sha256', req.body["pwd"]).update(req.body["pwd"]).digest('hex'),
            },
        });
        query == null ?? res.json(query);
        const al = await prisma.profesor.findFirst({
            where: {
                Mail: req.body["user"],
                Contrasena: crypto.createHash('sha256', req.body["pwd"]).update(req.body["pwd"]).digest('hex'),
            },
        })
        al == null ?? res.json(al);
        res.cookie("Details_Name", randomNumber, { maxAge: 900000, httpOnly: true });
    }


    /*
*/
});
app.post("/grades", async function (req, res) {
    if(session.userId && session.userint != "Profesor"){
        idalumno = session.dni;
    }
    else {
        //idalumno =
    }
})


async function Fetchgradesal(req) {
    if (session.userId) {
        const getData = await prisma.notas.findMany({
    where: {
                Dni_Alumno: 4531
            },
            select: {
                notas: true,
                ad


            },
        })


        res.json(getData);
    }






}
async function FetchCourses(req) {
    const ontainingCourses = await prisma.profesor.findManywhere({
        where: {
        DNI_Profesor: "SessionIDNI",
    },
    select: {
        cursos: {
            Materia:{
                Nombre
            }
            
        }
    }
    })


    return getData;
}


async function fetchSkips(req) {
    const getData = await prisma.alumno.findUnique({
        where: {
            Dni_Alumno: req["dni"],
        },
        select: {
            faltas: true,
        },
    })


    return getData;
}


async function addstudent(req) {
    const sutdent = await prisma.alumno.create({
        data: [
            { Dni_Alumno: '462454212', Nombre: 'Lucas', Apellido: 'Abdhala', Mail: 'porraasee@gmail.com', contrasena: "Conweeatra1521" }
        ]
    })
    console.log(sutdent);
}


async function addclass(req) {
    const classs = await prisma.Clase.create({
        data: {
            Clase_ID: "",
            Division_ID: "",
            Materia_ID: "",
            Profesor_ID: ""




        }




    })
}
async function search() {
    const getPosts = await prisma.profesor.findMany({
        where: {
            name: {
                contains: 'cookies',
            },
        },
        include: {
            cursos: true, // Return all fields
        },
    })
}


async function addclass1(req) {
    const classs = await prisma.administracion.create({
        data: {
            DNI_Admin: 1,
            Nombre: "",
            Apellido: "",
            Mail: "",
            Contrasena: "",


        }




    })
}


async function addclass2(req) {
    const classs = await prisma.alumno.create({
        data: {


            Dni_Alumno: 1,
            Nombre: "",
            Apellido: "",
            Mail: "",
            contrasena: "",
        }




    })
}


