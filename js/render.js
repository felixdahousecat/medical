var apiserver = "http://192.168.0.5:9000/web/";
var imagedir = "/src/upload/server/php/files/";


function render_patients() {
	localapi = apiserver + "patient";
	console.log(localapi);
	// get the patient list
	$.get( localapi, function( data ) {
		var obj = jQuery.parseJSON(data);
		console.log(obj);
		var template = '<div class="patientlist">' +
		'<div class="img"><img src="/src/upload/server/php/files/{{image}}" width="70px" hieght="70px"></div>' +
		'<div class="icon"><img src="/images/notes.jpg"><img src="/images/alerts.jpg"><img src="/images/alerts.jpg"></div>' +
		'<div class="details"><span class="details-name">{{fullname}}</span><br>{{dob}}<br>{{hosno}}</div>' +
		'<div class="plan">' +
			'<div class="planitem inprogress"><span class="planitem-title">Proc plan</span><br><span class="planitem-date">dd-mm-yyyy</spam></div>' +
			'<div class="planitem complete"><span class="planitem-title">MDT</span><br><span class="planitem-date">dd-mm-yyyy</spam></div>' +
			'<div class="planitem inactive"><span class="planitem-title">Equipment</span><br><span class="planitem-date">dd-mm-yyyy</spam></div>' +
		'</div>' +
		'<div class="location" rel="{{pid}}">{{hosname}}-{{name}}<br>{{startdate}}</div>' +
		'</div>';
		var finaltemp = "";
		$( obj.patients ).each(function() {
			finaltemp = finaltemp + mergeTemplate(this, template); 
		});
		masterRender("theList", finaltemp);
		$( ".location" ).click(function() {
			var pid = $(this).attr("rel");
			localStorage.pid=pid;
			window.location.hash = "pview";
		});
  });
}

function render_phead() {
		var pid = localStorage.pid;
		localapi = apiserver + "patient/" + pid;
		
		$.get( localapi, function( data ) {
		var obj = jQuery.parseJSON(data);
		console.log(obj);
		var template = '<div class="patientlist">' +
		'<div class="planitem">BACK</div>' +
		'<div class="img"><img src="/src/upload/server/php/files/{{image}}" width="70px" hieght="70px"></div>' +
		'<div class="details"><span class="details-name">{{fullname}}</span><br>{{dob}}<br>{{hosno}}</div>' +
		'<div class="plan">' +
			
			'<div class="planitem">{{hosname}}</div>' +
			'<div class="planitem">{{startdate}}</div>' +
			'<div class="planitem">{{consultant}}</div>' +
		'</div>' +
		'<div class="alertholder"><img src="/images/notes.jpg"><img src="/images/alerts.jpg"><img src="/images/alerts.jpg"></div>' +
		'</div>';
		var finaltemp = "";
		$( obj.patients ).each(function() {
			finaltemp = finaltemp + mergeTemplate(this, template); 
		});
		masterRender("phead", finaltemp);
		});	
}


function render_pnav() {
		var pid = localStorage.pid;
		localapi = apiserver + "sections/" + pid;
		
		$.get( localapi, function( data ) {
		console.log(data);
		var obj = jQuery.parseJSON(data);
		 var template = '<h3 class="secname">{{name}}</h3>' +
		 '<div class="subsecs">{{subsecbits}}</div>';
		var finaltemp = "";
		var subsec = {};
		subsec.subsecbits = "";
		i=0;
		$.each( obj.sections, function( key, value ) {
				//console.log(value.name);
				finaltemp = finaltemp + mergeTemplate(value, template);
				subsec.subsecbits ="";
				$.each( value.subsections, function( skey, svalue ) {
					subsec.subsecbits = subsec.subsecbits + '<div class="subsecsitem" rel="' + svalue.id + '">' + svalue.name + '</div>';
				});
				console.log(subsec);
				finaltemp = mergeTemplate(subsec, finaltemp);
			i++;
			//console.log(value.name);
		});
		masterRender("phasecontent", finaltemp);
			$(".secname").click(function() {
				$(this).next().toggle();
			});
			$(".subsecsitem").click(function() {
				renderMainpanel($(this).attr('rel'));
			});
			
		});	
		

		
		
}




function renderMainpanel(id) {
	localapi = apiserver + "data/" + id;
	$.get( localapi, function( data ) {
		console.log("console data", data);
		var obj = jQuery.parseJSON(data);
		
		var finalcontent = "";
		var template = '<div class="content-heading"><h3 class="editor-header">{{heading}}</h3><div class="button-array"><span class="edit-button" rel="{{id}}"><img src="/images/edit-icon.png"></span></div></div>' +
				'<div class="content-body clearfix" rel="{{tid}}">{{cont}}</div>';
		
		$.each( obj.content, function( key, value ) {
		//console.log("heading loop", value);
			finalcontent = finalcontent + mergeTemplate(value, template);
			contentobj = {};
			contentobj.cont = '<div class="contentarea">';
			contentobj.tid = '';
			$.each( value.data, function( skey, svalue ) {
				
				switch(svalue.type)
				{
				case "text":
				contentobj.cont = contentobj.cont + svalue.data;
				contentobj.tid = contentobj.tid + value.id;
				break;
				case "check":
				var obj = jQuery.parseJSON(svalue.data);
				//console.log(obj.title);
				if (obj.status=='on') {
					contentobj.cont = contentobj.cont + '<div class="checklab">' + obj.title + '</div><div class="roundedOne"><input type="checkbox" value="' + obj.status + '" id="' + obj.title + '" name="' + obj.title + '" checked/><label for="' + obj.title + '"></label></div>';
				} else {
					contentobj.cont = contentobj.cont + '<div class="checklab">' + obj.title + '</div><div class="roundedOne"><input type="checkbox" value="' + obj.status + '" id="' + obj.title + '" name="' + obj.title + '" /><label for="' + obj.title + '"></label></div>';
				
				}
				
				
				
				
				break;
				case "date":
				contentobj.cont = contentobj.cont + '<input type="text" name="dob" placeholder="Date" value="' + svalue.data + '">';
				
				break;
				}
			});
			contentobj.cont = contentobj.cont + '</div>';
			
			console.log(contentobj.cont);
			finalcontent = mergeTemplate(contentobj, finalcontent);
		});
		masterRender("patdat", finalcontent);
		$(".edit-button").promise().done(function( ) {
			$( ".edit-button" ).click(function() {
					var id = $(this).attr('rel');
					
					$('.edit').toggle();
					
					
					var content = $('.content-body[rel="' + id + '"]').text();
					$("#editor-field").val(content);
					$( "#save-overlay" ).click(function() {
						alert("Not yet implemented");
					});
					$( "#close-overlay" ).click(function() {
						$('.edit').toggle();
					});
			});
			
			
		});
		
		
		
	});	

}





function masterRender(div, data) {
	//console.log(div + data);
	$("#" + div).html(data);

}


function mergeTemplate (data, template) {
	for (var key in data) {
		console.log(key + "-" + data[key]);
		template = template.replace("{{"+ key + "}}", data[key]);
	}
	return template;

}