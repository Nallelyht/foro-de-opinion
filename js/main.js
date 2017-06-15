var apiTopics = {
	url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics'
};
var plantillaTopics = '<tr dara-id="__id__">' + 
		'<td>__topic__</td>' +
		'<td>__autor__</td>' +
		'<td>__respuestas__</td>' + 
		'</tr>'
var $topicos = $("#created-topic");

var cargarPagina = function () {
	cargarTopics();
	$('.modal').modal();
	$("#add-topic").submit(agregarTopic);
};

var cargarTopics = function (){
	$.getJSON(apiTopics.url, function (topics){
		console.log(topics);
		topics.forEach(crearTopics);
	});
};

var crearTopics = function (topic){
	
	var autor = topic.author_name;
	var respuestas = topic.responses_count;
	var id = topic.id;
	var topic = topic.content;

	var nuevaPlantillaTopics = plantillaTopics.replace("__id__", id).replace("__topic__",topic).replace("__autor__", autor).replace("__respuestas__", respuestas);

	$topicos.append(nuevaPlantillaTopics);

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
	});
};
$(document).ready(cargarPagina);