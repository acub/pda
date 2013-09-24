$(function() {
	var select_count = 0;
	$(".icon").click(function(){
		select_count++;
		if( select_count>3 ){
			document.location = "main.html";
			return;
		}
		$("#panel_input").append("<div class='icon p_" + this.id + "'></div>");
	});
});