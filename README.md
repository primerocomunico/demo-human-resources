<h1>DEMO PERSONNEL MANAGEMENT</h1>

<img src="image.jpg">

<h2>Software de gestión de personal</h2>

La propuesta de este proyecto se basa en el uso de una web API que permite realizar distintos tipos de peticiones para obtener (GET), publicar (POST), editar (PUT) y eliminar (DELETE) contenido.

Los datos que aparecen en el index.html son datos manipulados por todas las personas que acceden a esta web API, por lo tanto dicha información puede variar y modificarse sin previo aviso.

Las tecnologías utilizadas son:
<ul>
<li> html 5</li>
<li> CSS 3</li>
<li> JavaScript</li>
<li> JQuery</li>
<li> Bootstrap</li>
</ul>

Para visualizar el listado completo de los usuarios que conforman la web API, se realiza una <b>petición GET</b>, para que posteriormente se crea una card por cada usuario.

Al solicitar la creación de un nuevo usuario, hacemos primeramente una <b>petición POST</b> a la web API y posteriormente creamos la card del nuevo usuario. La card más reciente siempre aparecerá en la parte superior de la lista.

Al realizar una llamada con el botón "edit", hacemos primeramente una <b>petición PUT</b> y que a través de una ejecución del modal vía Bootstrap, tenemos oportunidad de editar el usuario y así sustituir la card anterior por una nueva con la información actualizada.

Se puede hacer una <b>petición DELETE</b> donde podemos elminar al usuario que se ha solicitado, a la par se elimina la card de DOM y se genera un Alert de Boostrap para indicar la acción. Esta acción tiene un doble check para evitar posibles errores en la eliminación del usuario.
<!--  -->
