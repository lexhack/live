$(document).ready(function() {
	var roomParam = location.search.split('room=')[1]; 
	if(roomParam) {
		$("#room-input").val(roomParam); 
	}

	updateSkills(); 

	$("#summon-mentor").on("click", function() {
		$.ajax({
			url:"http://localhost:3000/request",
			type: "POST",
			dataType: "json",
			data: {
				room: $("#room-input").val(),
				skill: $("#skill-select").val()
			},
			success: function(json) {
				console.log("success!"); 
		    },
		    error: function(xhr, status, error) {
		    	console.log("ERROR"); 
		    	console.log(status); 
		    },
		    complete: function(xhr, status) {

		    }
		}); 
	});
}); 

var updateSkills = function() {
	$.ajax({
		url: "http://localhost:3000/available",
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