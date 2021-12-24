# Sofka U Trivia Game

Este proyecto fue desarrollado utilizando React JS y la API fue desarrollada con el framework codeigniter 3 [Aplicacion desplegada en Netlify](https://trusting-heyrovsky-a3e6a6.netlify.app/).

## Informacion

La aplicacion es desplegada en Netlify para facilitar su revision, porque si se prueba localmente hay que configurar las rutas y montar la base de datos en el servidor para que funcione correctamente, las rutas se configuran en los componentes en React y en los archivos de configuracion en Codeigniter, la api se encuentra en el archivo comprimido rest, la base de datos es el archivo foodh100_quiz.sql.

Las preguntas se crean con sus categorias, cuando inicia el juego se seleccionan aleatoriamente las preguntas que estan en las categorias, es decir que si en una categoria existen varias preguntas, se seleccionara una aleatoriamente para ser renderizada, ademas las respuestas aparecen en orden aleatorio para que se agregue un poco mas de dificultad a la experiencia.

Se puede gestionar las categorias y las preguntas, para decidir si borrar una pregunta o eliminar por completo una categoria y las preguntas asociadas a esta, para demostracion se entrega el proyecto con 1 pregunta por cada categoria pero se pueden agregar lo que deseen, el puntaje se guarda cuando pierde o gana o abandona, cuando le presiona al boton menu principal.

Las rondas aumentan de acuerdo con el nivel de dificultad (nivel de categoria).
