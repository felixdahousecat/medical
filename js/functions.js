//imagte upload function


function addSection(type) {
	console.log(type);
	var formdata= {};
	formdata['type'] = type;
	formdata['pid'] = localStorage.pid;
$.post( "/ajax/add-sectiont.php", formdata)
			.done(function( data ) {
			console.log( "Data Loaded", data );
			
			var obj = jQuery.parseJSON(data);
			if (obj.status == 'success') {
				animateError("Section Added");
				render_pnav();
				$('.addpatient').toggle();
			} else {
				animateError("User already exists. PLease try again");
			}
			
			
			
			
});	


}



function savePatient(formdata) {
	$.post( "/ajax/save-patient.php", formdata)
			.done(function( data ) {
			alert( "Data Loaded: " + data );
			var obj = jQuery.parseJSON(data);
			if (obj.status == 'success') {
				animateError("User added successfully");
				render_patients();
				$('.addpatient').toggle();
			} else {
				animateError("User already exists. PLease try again");
			
			
			}
			
			
	});
}


function animateError(message) {
	$('#error').html(message);
	$( "#error" ).animate({
		top: 0
		
  }, 500, function() {
    // Animation complete.
  });
	
	
}


function resetError(message) {
	$('#error').html(message);
	$( "#error" ).animate({
		top: -45
		
  }, 100, function() {
    // Animation complete.
  });
	
	
}