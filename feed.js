$(document).ready(function() {
	var roomParam = location.search.split('room=')[1]; 
	if(roomParam) {
		$("#room-input").val(roomParam); 
	}

	updateSkills(); 
	updateAnnouncements(); 

	$("#summon-mentor").on("click", function() {
		$.ajax({
			url:"http://api.lexhack.org:3000/request",
			type: "POST",
			dataType: "json",
			data: {
				room: $("#room-input").val(),
				skill: $("#skill-select").val()
			},
			success: function(json) {
				console.log("success!"); 
				console.log(json); 
				if(!json["status"]) {
					$("#mentors-requested").append($("<li></li>")
						.append($("<span></span>")
							.text(json.name + " - " + $("#skill-select").val() + " "))
						.append($("<a></a>")
							.attr("href", "#")
							.attr("class", "clear-link")
							.attr("id", json._id)
							.attr("onclick", "clearMentor('"+json._id+"');")
							.text("clear"))); 
				}
		    },
		    error: function(xhr, status, error) {
		    	console.log("ERROR"); 
		    	console.log(status); 
		    },
		    complete: function(xhr, status) {

		    }
		}); 
	});

	setInterval(updateAnnouncements, 30000); 
}); 

var clearMentor = function(id) {
	console.log("ok fam"); 
	$.ajax({
		url:"http://api.lexhack.org:3000/clear-mentor",
		type: "POST",
		dataType: "json",
		data: {
			id: id,
		},
		success: function(json) {
			console.log("success!"); 
			console.log($('a[id='+id+']')); 
			$('a[id='+id+']').parent().remove();
	    },
	    error: function(xhr, status, error) {
	    	console.log("ERROR"); 
	    	console.log(status); 
	    },
	    complete: function(xhr, status) {

	    }
	}); 
}

var updateAnnouncements = function() {
	$.ajax({
		url: "http://api.lexhack.org:3000/announcements",
		type:"GET",
		dataType: "json",
		success: function(json) {
			$("#announcements-list").text(""); 
			$.each(json, function(index, value) {
				var d = new Date(value.date); 
				$("#announcements-list")
					.append($("<h4></h4")
						.html(replaceURLWithHTMLLinks(value.body)))
					.append($("<p></p>")
						.text(d.toLocaleTimeString()));
			})
		},
		error: function(xhr, status, error) {
			console.log("ERROR");
			console.log(status); 
		},
		complete: function(xhr, status) {

		}
	})
};

var replaceURLWithHTMLLinks = function(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    return text.replace(exp,"<a href='$1'>$1</a>"); 
}

var updateSkills = function() {
	$.ajax({
		url: "http://api.lexhack.org:3000/available",
		type: "GET",
	    dataType : "json",
	    success: function(json) {
			$.each(json.languages, function(index, value) {   
			     $('#skill-select')
			         .append($("<option></option>")
			         .attr("value",value)
			         .text(value)); 
			});
	    },
	    error: function(xhr, status, error) {
	    	console.log("ERROR"); 
	    	console.log(status); 
	    },
	    complete: function(xhr, status) {

	    }
	}); 
}
