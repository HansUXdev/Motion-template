(function() {
new UIMorphingButton( document.querySelector( '.morph-button' ) );

// for demo purposes only
[].slice.call( document.querySelectorAll( 'form button' ) ).forEach( function( bttn ) { 
  bttn.addEventListener( 'click', function( ev ) { ev.preventDefault(); } );
} );
})();