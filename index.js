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
//import {Crypto} from "crypto-js";
import MD5 from "crypto-js/md5.js"
import { env } from "process";
//import { HmacMD5 } from "crypto-js";
import pkg from 'crypto-js';
const { HmacMD5 } = pkg;
import Base64 from 'crypto-js/enc-base64.js';

//declaring express
const app = express();


//route
const port = 3080;


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
    const hashDigest = MD5(req.body["pwd"]);
    const hmacDigest = Base64.stringify(HmacMD5(hashDigest, "informatica"));
    console.log(hmacDigest)
    console.log(typeof hmacDigest)
    if (req.body["pwd"] != undefined && req.body["user"] != undefined) {
        const query = await prisma.persona.findFirst({
            /*   select:{
                   DNI
               },*/
            where: {
                AND: {
                    Mail: req.body["user"],
                    Contrasena: hmacDigest
                    //Contrasena: crypto.createHash('sha256', req.body["pwd"]).update(req.body["pwd"]).digest('hex'),
                }
            },
        });
        console.log(query)
        if (query != null) {
            switch (query.Nivel) {
                case 2: {
                    res.cookie("DNI", query.DNI, { maxAge: 900000, httpOnly: true });
                    res.json({ "loggedin": true, "name": query.DNI, "type": "Profesor" });
                }
                case 3: {
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
        const query = await prisma.persona.findFirst({
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
app.post("/Grades", async function (req, res) {
    var dni = 123322334;
    res.json(Fetchgradesal(req.body))
})
app.post("/dbdata", async function (req, res) {
    const query = await prisma.persona.findMany({
        select: {
            Contrasena: true,
            DNI: true,
            Mail: true
        },
        where: {
            Nivel: 3
        }
    })

    res.json(query)
})
app.post("/chpsw", async function (req, res) {
    const hashDigest = MD5(req.body["pwd"]);
    const hmacDigest = Base64.stringify(HmacMD5(hashDigest, "informatica"));
    console.log(hmacDigest)
    console.log(typeof hmacDigest)
    const query = await prisma.persona.updateMany({
        where: {
            Nivel: 3,
        },
        data: {
            Contrasena: hmacDigest
        }



    })

})

app.post("/profesor/years/courses", async function (req, res) {
    const courses = await FetchCourses(req.body)
    console.log(courses[0].cursos)
    if(courses == undefined){
        res.json({Courses:"Empty"})
    }
    const res_courses = settingJsonCourses(courses[0].cursos)
    const years_worked = obtainingyears(courses[0].cursos)
    res.json(res_courses)

})
app.post("/profesor/years", async function (req, res) {
    const courses = await FetchCourses(req.body)
    const years_worked = obtainingyears(courses[0].cursos)
    console.log(years_worked)
    res.json(years_worked)
})

app.post("/student/courses", async function (req, res) {
    //c
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
    constructor(ID, Materia, Division, Ano_Escolar, ano_actual) {
        this.ID = ID;
        this.Materia = Materia;
        this.Ano_Escolar = Ano_Escolar;
        this.Division = Division;
        this.ano_actual = ano_actual;
    }
}
//async function courseStudent 
async function FetchCourses(req) {
    const ontainingCourses = await prisma.persona.findMany({
        where: {
            DNI: 301464,
        },
        select: {
            clases: {
                select: {
                    materia: {
                        select: {
                            Nombre: true

                        }

                    },
                    Divisio: {
                        select: {
                            Anio_Escolar: true,
                            Division_Escolar: true
                        }
                    },
                    Division_ID:true,
                    Clase_ID: true,
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
        defined_courses[i] = new Course(courses[i].Clase_ID, courses[i].Materia.Nombre, courses[i].Division.Division_Escolar, courses[i].Division.Ano_Escolar, courses[i].Fecha_Comienzo.getFullYear())
    }
    //console.log(defined_courses);
    return defined_courses;


}
function obtainingyears(courses) {
    var years = [];
    var i;
    for (i = 0; i < courses.length; i++) {
        var course_year = courses[i].Fecha_Comienzo.getFullYear();

        if (years.indexOf(course_year) == -1) {
            years.push(course_year);
        }
    }
    return years
}

async function fetchSkips(req) {
    const getData = await prisma.persona.findUnique({
        where: {
            DNI: req["dni"],
        },
        select: {
            faltas: true,
        },
    })


    return getData;
}


app.post("/test/courses/:year", async function (req, res) {
    FetchCoursesperyear()
})
app.post("/alumno/faltas", async function (req, res) {
    res.json(fetchSkips(req.body))
})
app.post("/profesor/courses/notas", async function (req, res) {
    res.json(Fetchgradesal(req.body))
})
/*
async function Fetchgradesal(req) {
    //dni = req
    var dni = 123322334;
    const getData = await prisma.notas.findMany({
        where: {
            Dni_Alumno: 123322334
        },
        select: {
            notas: true,



        },
    })


    return (getData);







}
async function fetchcourseData(req) {
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
                    Fecha_Final: true,
                    Clase_ID: true
                }

            }

        }
    })

    //console.log(JSON.stringify(ontainingCourses))
    //return JSON.parse(ontainingCourses);
    return ontainingCourses
}
async function FetchCoursesperyear(ID, year) {
    const dni = 12233445;
    const ontainingCourses = await prisma.profesor.findMany({
        where: {
            DNI_Profesor: dni,

        },
        select: {
            cursos: {
                where: {
                    Fecha_Comienzo: year,
                },
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
function obtainingyears(courses) {
    var years = [];
    var i;
    for (i = 0; i < courses.length; i++) {
        var course_year = courses[i].Fecha_Comienzo.getFullYear();

        if (years.indexOf(course_year) == -1) {
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
}*/