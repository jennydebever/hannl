$( 'a.dropdown__submenu__button' ).on("click", function(e) {
    $( '.active' ).removeClass( 'active' );
    $(this).addClass( 'active' );
});
