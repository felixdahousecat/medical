var template_home = '<h1>Patient List</h1>' +
'<div id="theList">' +
'</div><div class="clearfix">' +
'</div>'+
'<div class="add_patient">Add new patient</div>'+
'<div class="addpatient overlay hidden">'+
'<div class="imgup">' +
' <div class="patientimg">' +
		'<img id="patimg" src="/images/blankperson.jpg" height="70px" width="70px">' +
	   '<input id="fileupload" type="file" name="files[]" data-url="/src/upload/server/php/" multiple>' +
    '</div>'+

'<div id="progress">' +
    '<div class="bar" style="width: 0%;"></div>'+
'</div>' +
 '</div>' +

'<h2>Contact</h2>' +
'<input type="hidden" name="image" id="patimgholder">' + 
'<input type="text" name="fullname" placeholder="Full Name"><br>' + 
'<input type="text" name="email" placeholder="Email address"><br>' + 
'<input type="text" name="telephone" placeholder="Telephone number"><br>' + 

'<h2>Details</h2>' +
'<input type="text" name="dob" placeholder="Date of Birth"><br>' + 
'<input type="text" name="hosno" placeholder="Hospital Number"><br>' + 
'<input type="text" name="hosname" placeholder="Hospital Name"><br>' + 
'<input type="text" name="consultant" placeholder="Consultants Name"><br>' + 
'<input type="text" name="procid" placeholder="Procedure"><br>' + 
' <input id="savepatient" type="submit" value="Save Details">' +
'<div>';

var template_patient = '<div id="phead"></div>' +
'<div id="phase"><div id="phasecontent"></div><div class="add_section">Add section</div></div>' +
'<div id="patdat"></div>'+
'<div class="addsection overlay hidden">'+
'Choose the section you wish to add:' +
'<div class="section-item" rel="mdt">MDT</div>'+
'<div class="section-item" rel="workup">Work Up</div>'+
'<div class="section-item" rel="preassessment">Pre-Assessment</div>'+
'<div class="section-item" rel="consent">Consent</div>'+
'<div class="section-item" rel="equipmenttheatreplan">Equipment/Theatre Plan</div>'+
'</div>' +
'<div class="edit overlay hidden">'+
'<button id="close-overlay">Close</button><button id="save-overlay">Save</button>'+
'<textarea rows="15" cols="70" id="editor-field">'+
 
'</textarea>'+
'</div>';