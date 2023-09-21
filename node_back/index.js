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
import { isSet } from "util/types";


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
    console.log(crypto.createHash('sha256', req.body["pwd"]).update(req.body["pwd"]).digest('hex'))
    if (req.body["pwd"] != undefined && req.body["username"] != undefined) {
        const query = await prisma.profesor.findFirst({
            /*   select:{
                   DNI_Profesor
               },*/
            where: {
                AND: {
                    Mail: req.body["username"],
                    Contrasena: crypto.createHash('sha256', req.body["pwd"]).update(req.body["pwd"]).digest('hex'),
                }
            },
        });
        console.log(query)
        if (query != null) {
            res.cookie("id", query.DNI_Profesor, { maxAge: 900000, httpOnly: true });
            res.json({ "loggedin": true, "name": query.DNI_Profesor, "type": "Profesor" });
                       
        }
        else {
            const al = await prisma.alumno.findFirst({
                where: {
                    Mail: req.body["username"],
                    contrasena: crypto.createHash('sha256', req.body["pwd"]).update(req.body["pwd"]).digest('hex'),
                },
            })
            console.log(al)
            if (al != null) {
                res.cookie("id", al.Dni_Alumno, { maxAge: 900000, httpOnly: true });
                res.json({ "loggedin": true, "name": al.Dni_Alumno, "type": "Alumno" });
                
            }
            else {
                res.json({ "loggedin": false })
            }
        }







    }
    else {
        res.send({ "logeedin": false })
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
        res.cookie("Details_Name", randomNumber);
    }


    /*
*/
});
app.get("/logout", function (req,res){
    if(isSet(req.cookies("id"))) {
        res.clearCookie("id")
    }

})
app.post("/grades", async function (req, res) {
    if (session.userId && session.userint != "Profesor") {
        idalumno = session.dni;
    }
    else {
        //idalumno =
    }
})

app.post("/profesor/years/courses", async function (req, res) {
    //console.log(req)
   //console.log(req.cookies("id"))
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
app.post("/test/courses/:year",async function (req,res){
    FetchCoursesperyear()
})
app.post("/Grades", async function (req, res) {
    res.json(Fetchgradesal(req.body))
})
app.post("/student/courses", async function (req, res) {
    //console.log(req)
    const courses = await FetchCourses(req.body)
    res.json(courses[0].cursos)

})
app.post("/profesor/:year/")
app.post("/alumno/faltas", async function (req, res) {
    res.json(fetchSkips(req.body))
})
app.post("/profesor/courses/notas", async function (req, res) {
    res.json(Fetchgradesal(req.body))
})

async function Fetchgradesal(req) {
    //dni = req
    dni = 123541;
        const getData = await prisma.notas.findMany({
            where: {
                Dni_Alumno: dni
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
async function FetchCourses(req) {
    //dni = req;
    const dni = 12233445;
    const ontainingCourses = await prisma.profesor.findMany({
        where: {
            DNI_Profesor: dni,
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
async function  FetchCoursesperyear(ID,year){
    const dni = 12233445;
    const ontainingCourses = await prisma.profesor.findMany({
        where: {
            DNI_Profesor: dni,

        },
        select: {
            cursos: {
                where: {
                    Fecha_Comienzo.year == year;
                }
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
    var years = {};
    var course_year;
    for (var i = 0; i < courses.length; i++) {
        course_year = courses[i].Fecha_Comienzo.getFullYear();

        if (years[course_year] == null) {
            years[course_year] = [];
            years[course_year].push(new Course(courses[i].Materia.Nombre,courses[i].Division.Division_Escolar ,courses[i].Division.Ano_Escolar , courses[i].Fecha_Comienzo.getFullYear())
            )
            defined_courses[i] = new Course(courses[i].Materia.Nombre,courses[i].Division.Division_Escolar ,courses[i].Division.Ano_Escolar , courses[i].Fecha_Comienzo.getFullYear())

        }
        else {
            years[course_year].push(new Course(courses[i].Materia.Nombre,courses[i].Division.Division_Escolar, courses[i].Division.Ano_Escolar , courses[i].Fecha_Comienzo.getFullYear()))
        }
        //    anos_escolares.courses[i].Fecha_Comienzo.getFullYear() = []; 

        //  anos_escolares.courses[i].Fecha_Comienzo.getFullYear().push(new Course(courses[i].Materia.Nombre,courses[i].Division.Ano_Escolar,courses[i].Division.Division_Escolar,courses[i].Fecha_Comienzo.getFullYear()))

    }
    console.log(years)
    //console.log(defined_courses);
    return years;

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

/*
async function addstudent(req) {
    const sutdent = await prisma.alumno.create({
        data: [
            { Dni_Alumno: '462454212', Nombre: 'Lucas', Apellido: 'Abdhala', Mail: 'porraasee@gmail.com', contrasena: "Conweeatra1521" }
        ]
    })
    console.log(sutdent);
}
async function test_add_notes (req) {
    const added = await prisma.Clase.create({
        data: {
            Clase_ID: "",
            Division_ID: "",
            Materia_ID: "",
            Profesor_ID: ""




        } 
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
*/

