var apiTopics = {
	url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};
var plantillaTopics = '<tr class="all-topics" data-id="http://examen-laboratoria-sprint-5.herokuapp.com/topics/__id__/responses">' + 
		'<td class="topic">__topic__</td>' +
		'<td class="author">__autor__</td>' +
		'<td>__respuestas__</td>' + 
		'</tr>'
var $topicos = $("#created-topic");

var cargarPagina = function () {
	cargarTopics();
	$('.modal').modal();
	$("#add-topic").submit(agregarTopic);
$("#search-form").submit(filtrarTemas);
};

var cargarTopics = function (){
	$.getJSON(apiTopics.url, function (topics){
		topics.forEach(crearTopics);
	});
};

var crearTopics = function (topic){
	var id = topic.id;
	var respuestas = topic.responses_count;
	var autor = topic.author_name;	
	var topic = topic.content;
	var nuevaPlantillaTopics = plantillaTopics.replace("__id__", id).replace("__topic__",topic).replace("__autor__", autor).replace("__respuestas__", respuestas);

	$topicos.prepend(nuevaPlantillaTopics);

};

var agregarTopic = function (e) {
	e.preventDefault(); 
	//console.log("todo va bn")
	var nuevoAutor =$("#author-name").val();
	var nuevoTema = $("#new-topic").val();
	$.post(apiTopics.url, {
		"author_name": nuevoAutor,
		"content": nuevoTema,
	}, function (topic){
		crearTopics(topic);
		swal("Se ha agregado tu tarea con exito.", "dale click al boton", "success");
	});
};

var filtrarTemas = function (e) {
	e.preventDefault();
	var criterioBusqueda = $("#search").val().toLowerCase();
	var temas =[];
	var dondeBuscar = document.querySelectorAll(".topic")
	for(var i=0; i<dondeBuscar.length; i++){
		temas.push(dondeBuscar[i].innerText);
	}
	console.log(temas)
	var temaFiltrado=temas.filter(function(tema){
		return tema.toLowerCase().indexOf(criterioBusqueda)>=0;
	});
	crearTopicFiltrado(temaFiltrado);
};
var crearTopicFiltrado = function(temaFiltrado){
	
	var nuevaPlantillaTopics = plantillaTopics.replace("__topic__",temaFiltrado)

	$topicos.prepend(nuevaPlantillaTopics);

};
var obtenerInfoTema = function (){
	var url = $(this).data("id");
	var autor =$(this).find(".author")[0].innerText;
	var tema = $(this).find(".topic")[0].innerText;
	
	$.getJSON(url, function(responseTopic){
		var totalRespuestas = responseTopic.length;
		var autorRespuesta = responseTopic.author_name;
		var creacion = responseTopic.created_at;
		var respuesta = responseTopic.content;
		mostrarInfoTema(url, autor, tema);
console.log(respuesta);
	})
};

var mostrarInfoTema = function (url,autor, tema){

}
$(document).on("click",".all-topics", obtenerInfoTema)
$(document).ready(cargarPagina);