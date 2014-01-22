var imagedir = "/src/upload/server/php/files/";


$( document ).ready(function() {
	initpage();
	
	//bind click events to the buttons
		
	
});

function includeTemplate(template) {
	$("#wrapper").html(template);
	activateUpload();
	//console.log(template);

}
function activateUpload() {
	console.log($('#fileupload'));
    'use strict';
    // Change this to the location of your server-side upload handler:
    $(function () {
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                console.log(file.name);
				$('#patimgholder').val(file.name);
				$('#patimg').attr("src", imagedir + "thumbnail/" + file.name);
            });
        },
		progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .bar').css(
            'width',
            progress + '%'
        );
    }
    });
	
});
};

function initpage() {
		//intitalise the pages
	switch(window.location.hash)
	{
	case "#home":
	  includeTemplate(template_home);
	  render_patients();
	  $( "#patimg" ).click(function() {
		$('#fileupload').trigger('click');
	 });
	  //console.log(window.location.hash);
	  break;
	case "#pview":
	console.log("patient data");
	includeTemplate(template_patient);
	render_phead();
	render_pnav();
		//  execute code block 2
	$( ".add_section" ).click(function() {
		console.log('add a section');
		$(".addsection").toggle();
	});
	$( ".section-item" ).click(function() {
		
		addSection($(this).attr('rel'));
		
	});

	break;
	default:
	  console.log("the hash" + window.location.hash);
	}

	$( ".add_patient" ).click(function() {
		$(".addpatient").toggle();
	});
	
	$( "#savepatient" ).click(function() {
		var formdata= {};
		$("input").each(function() {
			if ($(this).val() != 'Save Details') {
				formdata[ $(this).attr('name') ] = $(this).val();
			}
		});
	savePatient(formdata);
	});
	$(window).on('hashchange', function() {
		initpage();
	});



}

