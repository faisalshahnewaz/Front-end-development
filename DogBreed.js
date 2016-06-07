(function() {

	var isFirstTime = true;
	var count;

	//timer function
	function timer () {
		count = setInterval(function() {
		$("#imageDiv :first-child").fadeOut(700)
		.next("img").fadeIn(700)
		.end().appendTo("#imageDiv");},
		6000);
	}
	
	//initial call
	getSelectElements();

	//select option click
	$("#select").on("change", function(){
		var id = $("#select").find(":selected").attr("value");
		getDogBreedInformation(id);
	});


	function getSelectElements() {

		var dataElemts = jQuery.ajax(
			"http://csw08724.appspot.com/breeds.ajax",
			{
				dataType: "json",
				type: "GET",
				error: function(jqXHR, textStatus, errorThrown){
					alert(errorThrown);
				},
				success: function(data, textStatus, jqXHR) {
					data.forEach(
						function(val, index, array) {
							$("<option>").val(val.id).text(val.name).appendTo("#select");
						}
					);

					initialId = data[0].id;
					if(isFirstTime) {
						isFirstTime = false;
						getDogBreedInformation(initialId);
					}
				}
			}	
		);
	}

	function getDogBreedInformation(id) {

		var dataElemts = jQuery.ajax(
			"http://csw08724.appspot.com/breed.ajax?id="+id,
			{
				dataType: "json",
				type: "GET",
				error: function(jqXHR, textStatus, errorThrown){
					alert(errorThrown);
				},
				success: function(data, textStatus, jqXHR) {

					//get data
					var name = data.name;
					var description = data.description;
					var origins = ""+data.origins;
					var rightForYou = ""+data.rightForYou;
					var imageUrl = "http://csw08724.appspot.com/"+data.imageUrl;
					var extraImageUrls = ""+data.extraImageUrls;
					var id = ""+data.id;

					$("#dogName").html(name);
					$("#description").html(description);
					$("#origins").html(origins);
					$("#rightForYou").html(rightForYou);
					
					//remove and add image
					$("div#imageDiv>img").remove();
					$("#imageDiv").append($('<img>',{id:'',src: imageUrl}));

					//add extra image and image slider
					for(var i=0; i<data["extraImageUrls"].length;i++) {
						$("#imageDiv").append($('<img>',{id:'',src: "http://csw08724.appspot.com/"+data.extraImageUrls[i]}));
					}
					clearInterval(count);
					$("#imageDiv img:gt(0)").hide();
					timer();
				}
			}	
		);
	}	
})();








