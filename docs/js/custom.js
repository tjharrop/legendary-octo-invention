$('body').on('change', 'input', function(){
	var $this = $(this);
	// toggle optional sections
	if ($this.is(':checkbox')){
		var $toggleTarget = $('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '"]');
		console.log('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '"]');
		if ($toggleTarget.length){
			$toggleTarget.toggle($this.is(':checked') && $this.val() == $toggleTarget.attr('data-toggle-value'));
		}
	} else if ($this.is(':radio')){
		var $toggleTarget = $('.optional-section-'+$this.attr('name'));
		console.log('.optional-section-'+$this.attr('name') + '[data-toggle-value="'+$this.val() + '"]');
		$toggleTarget.each(function(){
			$(this).toggle($this.val() == $(this).attr('data-toggle-value'));
		});
	}
});

(function ( $ ) {
	$.fn.storeForm = function( options ) {
		var settings = $.extend({
		}, options );

		function on_change(event) {
			var input = $(event.target);
			var key = "storedData";
			var data = JSON.parse(localStorage[key]);

			if(input.attr('type') == 'radio') {
				data[input.attr('name')] = input.attr("value");
			}
			else if(input.attr('type') == 'checkbox') {
				if(input.is(':checked')){
					data[input.attr('name')] = input.attr("value");
				} else {
					data[input.attr('name')] = null;
				}
			}
			else if(input.attr('type') == 'file') {
				var value = input.val();
				//alert(value);
				var arr = value.split('\\').pop();
				data[input.attr('name')] = arr;
			}else {
				data[input.attr('name')] = input.val();
			}

			localStorage[key] = JSON.stringify(data);
		}

		return this.each(function() {
			var element = $(this);

			if(typeof(Storage)!=="undefined"){
				var key = "storedData";

				var data = false;
				if(localStorage[key]) {
					data = JSON.parse(localStorage[key]);
				}

				if(!data) {
					localStorage[key] = JSON.stringify({});
					data = JSON.parse(localStorage[key]);
				}
				element.find('input, select, textarea').change(on_change);

				element.find('input, select').each(function(){
					if($(this).attr('type') != 'submit') {
						var input = $(this);
						var inputid = $(this).attr('id');
						var value = data[input.attr('name')];
						if(input.attr('type') == 'radio' || input.attr('type') == 'checkbox') {
							if(value==input.attr('value')) {
								$('#'+inputid).attr('checked', input.is(':checked')).attr('class',  'radio-checked');
								$('#'+inputid).attr('checked', true);
								console.log('check #' + inputid);
							} else {
								input.removeAttr('checked');
								console.log('uncheck #' + inputid);
							}
						} else if(input.attr('type') == 'file') {
							//you cant set a file field value
						} else {
							input.val(value);
						}
					}
				});

				element.find('.playback-cell').each(function(){
					var input = $(this);
					var value = data[input.attr('data-playback')];
					input.html(value);
				});

			}
			else {
				alert('local storage is not available');
			}
		});
	};


	$.fn.getForm = function( options ) {
		var settings = $.extend({
		}, options );

		return this.each(function() {
			var element = $(this);

			if(typeof(Storage)!=="undefined"){
				var key = "storedData";

				var data = false;
				if(localStorage[key]) {
					data = JSON.parse(localStorage[key]);
				}

				if(!data) {
					localStorage[key] = JSON.stringify({});
					data = JSON.parse(localStorage[key]);
				}

					var input = $(this);
					var value = data[input.attr('data-playback')];
					input.html(value);

			}
			else {
				alert('local storage is not available');
			}
		});
	};
}( jQuery ))

$( document ).ready(function() {
	//write to local storage
	$('form').storeForm();
	//play back from local storage
	$('*[data-playback]').getForm();
	$('.clear-data').click(function(){
	  localStorage.clear();
	});

	if(typeof(Storage)!=="undefined"){
		var key = "storedData";
		var data = false;
		if(localStorage[key]) {
			data = JSON.parse(localStorage[key]);
		}
		if(!data) {
			localStorage[key] = JSON.stringify({});
			data = JSON.parse(localStorage[key]);
		}
		//access to data from here
		if(($("#need-vacation").length != 0) && (data['check-looking-for-vacation'] == "yes")) {
	  	$("#need-vacation").show();
		}

		if(($("#need-basc").length != 0) && (data['check-looking-for-oosh'] == "yes")) {
	  	$("#need-basc").show();
		}

		if(($("#had-vacation").length != 0) && (data['radio-had-vacation'] == "yes")) {
	  	$("#had-vacation").show();
		}

		if(($("#has-basc").length != 0) && (data['radio-has-oosh'] == "yes")) {
	  	$("#has-basc").show();
		}

	}
	else {
		alert('local storage is not available');
	}

});
