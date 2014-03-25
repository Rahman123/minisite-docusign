//js document
$(document).ready(function(e) {
	//click page not interactive to inactive and hide tooltip
	/*$(document).click(function(event){
		$target = $(event.target);
		if(!$target.is(".interActiveItem, .interActiveItem *")){
			$("#interActiveList .interActiveItem").removeClass("active");
		}	
	});*/
		
	//mouse over to trigger active interactive and tooltip
	$(".interActiveItem").hover(
		function(){
			var that = $(this);
			if(that.hasClass("disabled")) return;
			$("#interActiveList .interActiveItem").removeClass("active");
			that.addClass("active");
			//$("#interActiveList .tooltips").fadeOut("fast");
			that.find(".tooltips").fadeIn();
		},
		function(){
			var that = $(this);
			that.removeClass("active");
			$("#interActiveList .tooltips").hide();
		}
	);
});
