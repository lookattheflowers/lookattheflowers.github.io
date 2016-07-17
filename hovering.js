( function( $ )
{

	var starfieldCanvasId,
		framerate,
		numberOfStarsModifier,
		sizeSpeed,
		canvas,
		context,
		c_width,
		c_height,
		numberOfStars,
		stars,
		inter;

	function update_size()
	{
		if( $('#content.home-in-between section').length > 0 )
		{
			$('#content.home-in-between section').css( 'min-height', ( $( window ).height()-96 ) + 'px' );
			if( $( 'body.admin-bar' ).length > 0 )
			{
				$('#content.home-in-between section').css( 'min-height', ( $( window ).height()-128 ) + 'px' );				
			}
		}
		
		if( $( '#p4k-particules' ).length > 0 )
		{
			$( '#p4k-particules' ).attr( 'width', $( window ).width()*2 );
			$( '#p4k-particules' ).attr( 'height', $( window ).height()*2 );
			$( '#p4k-particules' ).css( 'width', $( window ).width() );
			$( '#p4k-particules' ).css( 'height', $( window ).height() );
		}
	}

	function initParticules()
	{
		update_size();

		starfieldCanvasId     = "p4k-particules";
		framerate             = 60;
		numberOfStarsModifier = 0.02;
		sizeSpeed = 0.25;
		canvas        = document.getElementById(starfieldCanvasId);
		context       = canvas.getContext("2d");
		context.scale(2,2);
		c_width         = (canvas.width*2);
		c_height        = (canvas.height*2);
		numberOfStars = c_width * c_height / 4000 * numberOfStarsModifier;
		if( numberOfStars > 80 ){
			numberOfStars = 80;
		}
		stars         = [];
		
		for(var x = 0; x < numberOfStars; x++) {
			stars[x] = {
				x: range( 0, c_width ),
				y: range( 0, c_height ),
				lng: 0,
				lng_max: range( 10, 40 ),
				decay: 0
			};
		}
		inter = window.setInterval(tick, Math.floor(1000 / framerate));
	}

	function tick()
	{

		context.clearRect(0, 0, c_width, c_height);

		for(var x = 0; x < numberOfStars; x++)
		{
			stars[x].lng += sizeSpeed;
			stars[x].decay += (sizeSpeed*1.5);

			if( stars[x].lng > stars[x].lng_max )
			{
				stars[x] = {
					x: range( 0, c_width ),
					y: range( 0, c_height ),
					lng: 0,
					lng_max: range( 10, 40 ),
					decay: 0
				};
			}

			context.strokeStyle = "rgba(0, 128, 200, 1)";
			context.lineWidth = 2;
			context.beginPath();
			context.moveTo( (stars[x].x + stars[x].decay ), stars[x].y);
			context.lineTo( ( stars[x].x + stars[x].lng + stars[x].decay ), stars[x].y);
			context.stroke();
		}
		console.log( stars.length );
	}

	function range(start, end)
	{
		var tmp = Math.random() * (end - start) + start;
		tmp = Math.round( tmp / 2 ) * 2;
		return tmp;
	}

	$( document ).ready( function() {

		initParticules();
		update_size();

		if( $('#p4k-2016-rollover-images' ).length > 0 ) {

			$(document).on('mousemove', function(e){

			    $('#p4k-2016-rollover-images').css({
			       left:  e.pageX,
			       top:   e.pageY
			    });

			});
			
			$( '.p4k-2016-follow-mouse-activator>span' ).mouseover(function( e )
			{
				console.log( $( e.target ).parent().attr( 'data-id' ) );
				$( '.p4k-2016-follow-mouse-activator-item-' + $( e.target ).parent().attr( 'data-id' ) ).css( 'z-index', 100 );
				$( '.p4k-2016-follow-mouse-activator-item-' + $( e.target ).parent().attr( 'data-id' ) ).css( '-webkit-font-smoothing', 'subpixel-antialiased' );
				$( '#p4k-2016-rollover-images li' ).addClass( 'hidden' );
				$( '#p4k-2016-rollover-images li#p4k-follow-mouse-item-'+$( e.target ).parent().attr( 'data-id' ) ).removeClass( 'hidden' );
				$( '#p4k-2016-rollover-images' ).removeClass( 'hidden' );
			});
			
			$( '.p4k-2016-follow-mouse-activator>span' ).mouseout(function( e )
			{
				$( '#p4k-2016-rollover-images' ).addClass( 'hidden' );
				$( '.p4k-2016-follow-mouse-activator' ).css( 'z-index', '' );
				$( '.p4k-2016-follow-mouse-activator' ).css( '-webkit-font-smoothing', '' );
			});
		}

	} );
	
	$( window ).resize( function() {

		clearInterval(inter);
		initParticules();
		update_size();

	} )
	
} )( jQuery );