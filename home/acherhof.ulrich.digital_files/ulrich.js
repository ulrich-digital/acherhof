jQuery(document).ready(function ($) {

	console.log("ready");

	/* set readonly for specific textareas */
	$('#acf-field_615711e85b9dc').attr('readonly','readonly').css('outline', 'none');

	$('.repeater-bewertung .beschreibung textarea').each(function(){
		$(this).attr('readonly','readonly').css('outline', 'none');
	});

	// toggle checkbox function
	$.fn.toggle_checkbox = function ( param ) {
		$checkboxes = $(this).filter(function() {
			return $(this).css('display') !== 'none';
		});

		// "Auswahl abschliessen" as default checked, wenn noch nichts ausgewählt
		if ( !$checkboxes.find('input[type="checkbox"]').is(':checked') ) {
			$checkboxes.find('input[value$=close').prop('checked', true);
		} // endif

		// toggle behavior
		$checkboxes.find('input[type="checkbox"]').on('click', function() {
			$checkboxes.find('input[type="checkbox"]').prop( "checked", false );
			$(this).prop( "checked", true );
		});

	};

	// generate rating message labels
	$.fn.rating_message = function ( param ) {
		$(this).change(function() {
			value = parseInt( $(this).val() );
			switch ( value ) {
				case 0:
					$message = 'noch nicht bewertet';
					$class = 'punkte-nolegend';
					break;
				case 1:
					$message = 'nicht erfüllt';
					$class = 'punkte-legend';
					break;
				case 2:
					$message = 'teilweise nicht erfüllt';
					$class = 'punkte-legend';
					break;
				case 3:
					$message = 'knapp erreicht';
					$class = 'punkte-legend';
					break;
				case 4:
					$message = 'erreicht';
					$class = 'punkte-legend';
					break;
				case 5:
					$message = 'übertroffen';
					$class = 'punkte-legend';
					break;
			}
			// console.log($message);
			$(this).closest('.acf-field-range').find('.acf-label label').html('<span class="' + $class + '">' + $message + '</span>');
		});
	};

	$.fn.rating_check_submit = function ( param ) {
		$('.acf-form').submit(function(e) {

			// Achtung geklonte elemente nicht iterieren
			$('#bewertung_sub .acf-row:not(.acf-clone) input[type="number"]').each( function(index, value) {
				var rangeVal = $(this).val();
				// console.log(rangeVal);
				$(this).removeClass("error");
				if ( rangeVal == 0 ) {
					$(this).addClass("error");
					$(this).closest('.acf-field-range').find('.acf-label label').html('<span class="punkte-nolegend">noch nicht bewertet</span>');
					// console.log("Bitte alles ausfüllen...")
				} // endif
			});

			// Feld nicht ausgefüllt?
			// console.log( jQuery('.repeater-bewertung .acf-row:not(.acf-clone)').find('.error').length );
			if ( $('#bewertung_sub .acf-row:not(.acf-clone)').find('.error').length > 0 ) {
				if ( $('.error_message').length < 1 ) {
					$('.acf-form-submit').before('<div class="error_message">Bitte alle Kompetenzen bewerten.</div>');
				} // endif
				e.preventDefault();
				return false;
			} // endif

		}); // submit
	};

}); // ready beenden
