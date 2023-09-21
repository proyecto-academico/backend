
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