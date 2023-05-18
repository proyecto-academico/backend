//Imports Elements
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from 'body-parser';
const prisma = new PrismaClient();
import express, { json, query } from "express";

//declaring express
const app = express();

//route
const port = 3050;
//const hostname = '10.120.2.114';
app.use(app.url)
//uses
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());

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
app.get("/welcome", function (req, res) {
  res.json();
});

app.post("/test", async function (req, res) {
  
  //check session details
    console.log(req.body);
    console.log("\n\n\n\n");
    ///console.log(res);

    //const query = await prisma.profesor.findUniqueOrThrow({
    //where: {
    //  DNI_Profesor: req.body.user,
    //  contrasena: req.body.pwd,
    //},
  //});

  //})
  
  //res.cookie("Details_Name", randomNumber, { maxAge: 900000, httpOnly: true });
  //res.json(Data);
});

app.get("/login", async function (req, res) {
  //res.send('Got a POST request');
  if (session.userId) {
    const getData = await prisma.alumno.findUnique({
      where: {
        Dni_Alumno: 462454212,
      },
    });
  }
  res.json(getData);

  //main()
  //    .catch((e) => {
  //        throw (e)
  //    })
  //    .finally(async () => {
  //       await prisma.$disconnect()

  // })

  //res.json();
});


async function main() {
    const getData = await prisma.alumno.findUnique({
        where: {
            Dni_Alumno: 462454212,
        },
    })
    console.log(getData);
    return getData;

    //if (sentreq["action"] == "A") {
    //        return Fetchgrades(sentreq);
    //
    //   }
    // else if (sentreq["action"] == "B") {
    //   return FetchCourses(sentreq)
    //}
    //const getData = await prisma.alumno.findUnique({
    //    where: {
    //       Dni_Alumno: datase["username"],
    //      contrasena: datase["pwd"]
    //
    //      },
    //    select: {
    //      notas: true,
    // },
    //})
    // console.log(getData);


    //const post = await prisma.alumno.createMany({
    //   data: [
    // { Dni_Alumno: '462454212', Nombre: 'Lucas', Apellido: 'Abdhala', Mail: 'porraasee@gmail.com', contrasena: "Conweeatra1521" },
    // { Dni_Alumno: '46254454212', Nombre: 'Lucas', Apellido: 'Abdhala', Mail: 'porras@gmail.com', contrasena: "Coeantra1521" },
    // { Dni_Alumno: '46246554212', Nombre: 'Lucas', Apellido: 'Abdhala', Mail: 'porra@gmail.com', contrasena: "Condsatra1521" },
    //   { Dni_Alumno: '121234', Nombre: 'Lucas', Apellido: 'Abdhala', Mail: 'porraassa@gmail.com', contrasena: "Coasdntra1521" }
    // ]

    //})
    //const sutdent = await prisma.alumno.create({
    //  data: 
    //    { Dni_Alumno: 4624542132, Nombre: 'Lucas', Apellido: 'Abdhala', Mail: 'porraasee@gmail.com', contrasena: "Conweeatra1521" }

    //})
    //console.log(sutdent);
    //    console.log(post)

}

async function Fetchgrades(req) {
    const getData = await prisma.alumno.findUnique({
        where: {
            Dni_Alumno: req["dni"],
        },
        select: {
            notas: true,
        },
    })

    return getData;
}
async function FetchCourses(req) {
    const getData = await prisma.alumno.findUnique({
        where: {
            Dni_Alumno: req["dni"],
        },
        select: {
            divisiones: true,
        },
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

