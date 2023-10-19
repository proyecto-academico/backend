//Imports Elements
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from 'body-parser';
const prisma = new PrismaClient();
import crypto from "crypto";
import express, { json, query } from "express";
import { Console } from "console";


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

    //check session detailsCryptoJS.MD5
    console.log(req.body);
    console.log(crypto.createHash('sha256', req.body["pwd"]).update(req.body["pwd"]).digest('hex'))
    if (req.body["pwd"] != undefined && req.body["username"] != undefined) {
        const query = await prisma.persona.findFirst({
            /*   select:{
                   DNI
               },*/
            where: {
                AND: {
                    Mail: req.body["username"],
                    Contrasena: CryptoJS.MD5(req.body["pwd"])
                    //Contrasena: crypto.createHash('sha256', req.body["pwd"]).update(req.body["pwd"]).digest('hex'),
                }
            },
        });
        console.log(query)
        if (query != null) {
            switch(query.Nivel){
                case 1: {
                    res.cookie("DNI",  query.DNI, { maxAge: 900000, httpOnly: true });
                    res.json({ "loggedin": true, "name": query.DNI, "type": "Profesor" });
                }
                case 0:{
                    res.json({ "loggedin": true, "name": query.DNI, "type": "Alumno" });
                }
            }
        }
        else {
            res.send({ "loggedin": false })    
        }
    }
    else {
        res.send({ "loggedin": false }) 
    }
});

//
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
    var dni = 123322334;
   /* if (session.userId && session.userint != "Profesor") {
        idalumno = session.dni;
    }
    else {
        //idalumno =
    }*/
    res.json(Fetchgradesal())
})

app.post("/profesor/years/courses", async function (req, res) {
    //console.log(req)
    const courses = await FetchCourses(req.body)
    console.log(courses[0].cursos)
    const res_courses = settingJsonCourses(courses[0].cursos)
    const years_worked = obtainingyears(courses[0].cursos)
    
    res.json(res_courses)
    //res.json(courses[0].cursos)

})
app.post("/profesor/years", async function (req, res) {
    const courses = await FetchCourses(req.body)
    const years_worked = obtainingyears(courses[0].cursos)
    console.log(years_worked)
    res.json(years_worked)
})

app.post("/Grades", async function (req, res) {
    res.json(Fetchgradesal(req.body))
})
app.post("/student/courses", async function (req, res) {
    //console.log(req)
    const courses = await FetchCourses(req.body)
    res.json(courses[0].cursos)

})
app.post("/alumno/faltas", async function (req, res) {
    res.json(fetchSkips(req.body))
})
app.post("/profesor/courses/notas", async function (req, res) {
    res.json(Fetchgradesal(req.body))
})

async function Fetchgradesal(req) {
        var Dni_Alumno = 123322334;
        const getData = await prisma.notas.findMany({
            where: {
                Dni_Alumno: Dni_Alumno
            },
            select: {
                notas: true,



            },
        })


        return (getData);







}
class Course {
    constructor(Materia, Division, Ano_Escolar, ano_actual) {
        this.Materia = Materia;
        this.Ano_Escolar = Ano_Escolar;
        this.Division = Division;
        this.ano_actual = ano_actual;
    }
}
//async function courseStudent 
async function FetchCourses(req) {
    const ontainingCourses = await prisma.profesor.findMany({
        where: {
            DNI_Profesor: 12233445,
        },
        select: {
            cursos: {
                select: {
                    Materia: {
                        select: {
                            Nombre: true

                        }

                    },

                    Division: {
                        select: {
                            Ano_Escolar: true,
                            Division_Escolar: true

                        }
                    },
                    Fecha_Comienzo: true,
                    Fecha_Final: true
                }

            }

        }
    })

    //console.log(JSON.stringify(ontainingCourses))
    //return JSON.parse(ontainingCourses);
    return ontainingCourses
}
function settingJsonCourses(courses) {
    var defined_courses = [];
    var course_year;
    for (var i = 0; i < courses.length; i++) {
        course_year = courses[i].Fecha_Comienzo.getFullYear();
        defined_courses[i] = new Course(courses[i].Materia.Nombre, courses[i].Division.Division_Escolar, courses[i].Division.Ano_Escolar, courses[i].Fecha_Comienzo.getFullYear())
    }
    //console.log(defined_courses);
    return defined_courses;


}
function obtainingyears(courses){
    var years =[];
    var i;
    for(i=0;i<courses.length;i++){
        var course_year = courses[i].Fecha_Comienzo.getFullYear();
        
        if (years.indexOf(course_year) == -1){
            years.push(course_year);
        }
    }
     return years
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
