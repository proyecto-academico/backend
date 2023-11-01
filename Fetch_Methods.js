async function Fetchgradesal(req) {
    if (session.userId) {
        const getData = await prisma.notas.findMany({
            where: {
                Dni_Alumno: 4531
            },
            select: {
                notas: true,



            },
        })


        return (getData);
    }






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
function settingJsonCourses(courses) {
    var defined_courses = [];
    var years = {};
    var course_year;
    for (var i = 0; i < courses.length; i++) {
        course_year = courses[i].Fecha_Comienzo.getFullYear();

        if (years[course_year] == null) {
            years[course_year] = [];
            years[course_year].push(new Course(courses[i].Materia.Nombre, courses[i].Division.Ano_Escolar, courses[i].Division.Division_Escolar, courses[i].Fecha_Comienzo.getFullYear())
            )
            defined_courses[i] = new Course(courses[i].Materia.Nombre, courses[i].Division.Ano_Escolar, courses[i].Division.Division_Escolar, courses[i].Fecha_Comienzo.getFullYear())

        }
        else {
            years[course_year].push(new Course(courses[i].Materia.Nombre, courses[i].Division.Ano_Escolar, courses[i].Division.Division_Escolar, courses[i].Fecha_Comienzo.getFullYear()))
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